import { axiosInstance } from './config'

// Recommend
export const getBannerRequest = () => {
    return axiosInstance.get('/banner');
} 

export const getRecommendListRequest = () => {
    return axiosInstance.get('/personalized');
}

// Singer
export const getHotSingerListRequest = (count) => {
    return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest = (area, type, alpha, count) => {
    return axiosInstance.get(`/artist/list?type=${type}&area=${area}&initial=${alpha.toLowerCase()}&offset=${count}`);
}