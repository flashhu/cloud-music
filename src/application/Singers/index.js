import React, { useState } from 'react'
import Horizon from '../../baseUI/horizon-item'
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer } from './style'


function Singers(props) {
    let [category, setCategory] = useState('');
    let [alpha, setAlpha] = useState('');

    return (
        <NavContainer>
            <Horizon 
                list={categoryTypes} 
                title={"分类 (默认热门):"}
                handleClick={val => setCategory(val)}
                oldVal={category}
            />
            <Horizon 
                list={alphaTypes} 
                title={"首字母:"}
                handleClick={val => setAlpha(val)}
                oldVal={alpha}
            />
        </NavContainer>
    )
}

export default React.memo(Singers)