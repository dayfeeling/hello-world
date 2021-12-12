import request from '@/utils/request'

export function getToken() {
	return request({
		url: "/qiniu/upload/token",
		method: "get",
	});
}

export function fetchList(query) {
	return request({
		url: "/admin/article/list",
		method: "get",
		params: query,
	});
}

export function createArticle(data) {
	return request({
		url: "/admin/article/list",
		method: "post",
		data,
	});
}
