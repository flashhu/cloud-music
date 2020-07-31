import axios from 'axios'

export const baseUrl = 'http://www.flashhu.site:8090/';

const axiosInstance = axios.create({
    baseURL: baseUrl
});

// 全局拦截器
axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.log(err, '网络错误');
    }
)

export {
    axiosInstance
}