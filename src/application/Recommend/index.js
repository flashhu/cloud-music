import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import Slider from '../../components/slider'
import RecommendList from '../../components/recommendList'
import Scroll from '../../baseUI/scroll'
import { Content } from './style'

function Recommend(props) {
    const { bannerList, recommendList } = props;
    const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

    useEffect(() => {
        getBannerDataDispatch();
        getRecommendListDataDispatch();
    }, []);

    const bannerListJS = bannerList ? bannerList.toJS() : [];
    const recommendListJS = recommendList ? recommendList.toJS() : [];

    return (
        <Content>
            <Scroll className="list">
                <div>
                    <Slider bannerList={bannerListJS} />
                    <RecommendList recommendList={recommendListJS} />
                </div>
            </Scroll>
        </Content>
    )
}

// 和store连接时 store的数据如何映射到props
const mapStateToProps = (state) => {
    return {
        bannerList: state.getIn(['recommend', 'bannerList']),
        recommendList: state.getIn(['recommend', 'recommendList']),
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
