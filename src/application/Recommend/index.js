import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { forceCheck } from 'react-lazyload'
import { actionCreators } from './store'
import Slider from '../../components/slider'
import RecommendList from '../../components/recommendList'
import Scroll from '../../baseUI/scroll'
import Loading from '../../baseUI/loading'
import { Content } from './style'

function Recommend(props) {
    const { bannerList, recommendList, enterLoading } = props;
    const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

    useEffect(() => {
        if (!bannerList.size) {
            getBannerDataDispatch();
        }
        if (!recommendList.size) {
            getRecommendListDataDispatch();
        }
    }, []);

    const refreshData = () => {
        getBannerDataDispatch();
        getRecommendListDataDispatch();
    }

    const bannerListJS = bannerList ? bannerList.toJS() : [];
    const recommendListJS = recommendList ? recommendList.toJS() : [];

    return (
        <Content>
            <Scroll className="list" onScroll={forceCheck} pullDown={refreshData}>
                <div>
                    <Slider bannerList={bannerListJS} />
                    <RecommendList recommendList={recommendListJS} />
                </div>
            </Scroll>
            {enterLoading && <Loading />}
        </Content>
    )
}

// 和store连接时 store的数据如何映射到props
const mapStateToProps = (state) => {
    return {
        bannerList: state.getIn(['recommend', 'bannerList']),
        recommendList: state.getIn(['recommend', 'recommendList']),
        enterLoading: state.getIn(['recommend', 'enterLoading'])
    }
}

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
    return {
        getBannerDataDispatch() {
            dispatch(actionCreators.getBannerList());
        },
        getRecommendListDataDispatch() {
            dispatch(actionCreators.getRecommendList());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))
