import axios from 'axios'
import QS from 'qs'
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = async (url, params) => {
	let res = await axios.get(`http://wx0519.club:2345${url}`, {
		params: params
	})
	let {code} = res.data
	if (code === 200) {
		return res.data
	} else {
		alert(res.data.message)
	}
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.post(url, QS.stringify(params))
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err.data)
			})
	})
}

/**
 * 电影详情
 * http://api.douban.com/v2/movie/subject/id
 */
export const getMovieDetail = async id => {
	let res = await axios.get(`/v2/movie/subject/${id}`)
	return res.data
}
