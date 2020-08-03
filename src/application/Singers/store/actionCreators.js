import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { 
    getHotSingerListRequest,
    getSingerListRequest
} from '../../../api/request'

const changeSingerList = (data) => ({
    type: actionTypes.CHANGE_SINGER_LIST,
    data: fromJS(data)
});

const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
});

//滑动最底部loading
export const changePullUpLoading = (data) => ({
    type: actionTypes.CHANGE_PULLUP_LOADING,
    data
});

//顶部下拉刷新loading
export const changePullDownLoading = (data) => ({
    type: actionTypes.CHANGE_PULLDOWN_LOADING,
    data
});

//加载热门歌手
export const getHotSingerList = (pageCount) => {
    return (dispatch, getState) => {
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getHotSingerListRequest(pageCount).then(res => {
            console.log(res.artists);
            const data = pageCount ? [...singerList, ...res.artists] : res.artists;
            dispatch(changeSingerList(data));
            dispatch(changeEnterLoading(false));
        }).catch(() => {
            console.log('热门歌手数据获取失败');
        });
    }
};

// 按条件筛选歌手
export const getSingerList = (area, type, alpha, pageCount) => {
    return (dispatch, getState) => {
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getSingerListRequest(area, type, alpha, pageCount).then(res => {
            const data = pageCount ? [...singerList, ...res.artists]: res.artists;
            dispatch(changeSingerList(data));
            dispatch(changeEnterLoading(false));
        }).catch(() => {
            console.log('歌手数据获取失败');
        });
    }
};