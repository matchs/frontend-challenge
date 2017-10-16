import React from 'react';

require('./style.scss');

const getStateClass = (state) => state ? '__active' : '';

const Switch = ({
    state,
    onClick,
    img,
}) => <div onClick={() => onClick(state)} className={`switch ${getStateClass(state)}`}>
    <img src={img} />
</div>;

export default Switch;