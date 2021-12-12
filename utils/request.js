import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 5000, // request timeout
});

service.interceptors.request.use(
	config => {
		if (store.getters.token) {
			config.headers["Authorization"] = getToken();
		}
		return config;
	},
	error => {
		console.log(error); // for debug
		return Promise.reject(error);
	}
);
service.interceptors.response.use(
	response => {
		const res = response.data;
		// if the custom code is not 20000, it is judged as an error.
		if (res.code !== 20000) {
			Message({
				message: res.message || "Error",
				type: "error",
				duration: 5 * 1000,
			});
			if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
				// to re-login
				MessageBox.confirm("请先登录", {
					confirmButtonText: "Re-Login",
					cancelButtonText: "Cancel",
					type: "warning",
				}).then(() => {
					store.dispatch("user/resetToken").then(() => {
						location.reload();
					});
				});
			}
			return Promise.reject(new Error(res.message || "Error"));
		} else {
			return res;
		}
	},
	error => {
		console.log("err" + error); // for debug
		Message({
			message: error.message,
			type: "error",
			duration: 5 * 1000,
		});
		return Promise.reject(error);
	}
);

export default service;
