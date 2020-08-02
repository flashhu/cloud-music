import React, { useRef, useEffect } from 'react'
import PropsTypes from 'prop-types'
import Scroll from '../scroll'
import styled from 'styled-components'
import style from '../../assets/global-style'

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;

  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;

  &.selected {
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`

function Horizon(props) {
    const { list, oldVal, title } = props;
    const { handleClick } = props;
    const category = useRef(null);

    useEffect(() => {
        let categoryDOM = category.current;
        let tagElems = categoryDOM.querySelectorAll("span");
        let totalWidth = 0;
        Array.from(tagElems).forEach(ele => {
            totalWidth += ele.offsetWidth;
        });
        categoryDOM.style.width = `${totalWidth}px`;
    }, [])

    return (
        <Scroll direction="horizontal">
            <div ref={category}>
                <List>
                    <span>{title}</span>
                    {
                        list.map((item) => {
                            return (
                                <ListItem
                                    key={item.key}
                                    className={`${oldVal === item.key ? 'selected' : ''}`}
                                    onClick={() => handleClick(item.key)}>
                                    {item.name}
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        </Scroll>
    )
}

Horizon.propTypes = {
    list: PropsTypes.array, // 接受的列表数据
    oldVal: PropsTypes.string, // 当前的item值
    title: PropsTypes.string, // 列表左边的标题
    handleClick: PropsTypes.func // 点击 item 执行的方法
}

Horizon.defaultProps = {
    list: [],
    oldVal: '',
    title: '',
    handleClick: null
};

export default React.memo(Horizon)