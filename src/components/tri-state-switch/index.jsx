import React from 'react';

require('./style.scss');


const getByState = (state, positive, negative, neutral) => {
    if(state == 0) {
        return neutral;
    } 

    return state < 0 ? negative : positive;
}

const TriStateSwitch = ({
    state,
    positive,
    negative,
    neutral,
    onClick
}) => <div 
        onClick={() => onClick(state)} 
        className={`tri-state-switch ${getByState(state, '', '', '__neutral')}`}
    >{getByState(state, <img src={positive} />, <img src={negative} />, <img src={neutral} />)}</div>;

export default TriStateSwitch;