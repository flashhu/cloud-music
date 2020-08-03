import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { forceCheck } from 'react-lazyload'
import Horizon from '../../baseUI/horizon-item'
import { categoryAreas, categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer, ListContainer, List, ListItem } from './style'
import Scroll from '../../baseUI/scroll'
import Loading from '../../baseUI/loading' 
import { actionCreators } from './store'

function Singers(props) {
    let [pageCount, setPageCount] = useState(0);
    let [type, setType] = useState("-1");
    let [area, setArea] = useState("-1");
    let [alpha, setAlpha] = useState("-1");

    const { singerList, enterLoading, pullUpLoading, pullDownLoading } = props;
    const { getHotSingerDispatch, getSingerListDispatch, pullDownDispatch, pullUpDispatch } = props;

    useEffect(() => {
        if (!singerList.size) {
            getHotSingerDispatch(pageCount);
        }
        // eslint-disable-next-line
    }, []);
 
    let handleSearch = (area, type, alpha) => {
        getSingerListDispatch(area, type, alpha, 0);
        setPageCount(0);
    }

    // 上滑 加载更多
    const handlePullUp = () => {
        pullUpDispatch(area, type, alpha, pageCount + 1);
        setPageCount(pageCount + 1);
    }

    // 下滑 重新加载
    const handlePullDown = () => {
        pullDownDispatch();
        setPageCount(0);
        setAlpha("-1");
        setArea("-1");
        setType("-1");
    }

    const singerListJS = singerList ? singerList.toJS() : [];

    // 渲染函数，返回歌手列表
    const renderSingerList = () => {
        return (
            <List>
                {
                    singerListJS.map((item, index) => {
                        return (
                            <ListItem key={item.accountId + "" + index}>
                                <div className="img_wrapper">
                                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    };

    return (
        <div>
            <NavContainer>
                <Horizon list={categoryAreas} title={"语种:"} handleClick={val => { setArea(val); handleSearch(val, type, alpha)}} oldVal={area}/>
                <Horizon list={categoryTypes} title={"分类:"} handleClick={val => { setType(val); handleSearch(area, val, alpha) }} oldVal={type}/>
                <Horizon list={alphaTypes} title={"筛选:"} handleClick={val => { setAlpha(val); handleSearch(area, type, val)}} oldVal={alpha}/>
            </NavContainer>
            <ListContainer>
                <Scroll 
                    pullUp={handlePullUp}
                    pullDown={handlePullDown}
                    pullUpLoading={pullUpLoading}
                    pullDownLoading={pullDownLoading}
                    onScroll={forceCheck}
                >
                    {renderSingerList()}
                </Scroll>
            </ListContainer>
            { enterLoading && <Loading /> }
        </div>
    )
}

const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading'])
});

const mapDispatchToProps = (dispatch) => {
    return {
        getHotSingerDispatch(pageCount) {
            dispatch(actionCreators.getHotSingerList(pageCount));
        },
        getSingerListDispatch(area, type, alpha, pageCount) {
            dispatch(actionCreators.getSingerList(area, type, alpha, pageCount));
        },
        pullDownDispatch() {
            dispatch(actionCreators.changePullDownLoading(true));
            dispatch(actionCreators.getHotSingerList(0));
            dispatch(actionCreators.changePullDownLoading(false));
        },
        pullUpDispatch(area, type, alpha, pageCount) {
            dispatch(actionCreators.changePullUpLoading(true));
            if (area === "-1" && type === "-1" && alpha === "-1") {
                dispatch(actionCreators.getHotSingerList(pageCount));
            } else {
                dispatch(actionCreators.getSingerList(area, type, alpha, pageCount));
            }
            dispatch(actionCreators.changePullUpLoading(false));
        }
    }
}; 

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));