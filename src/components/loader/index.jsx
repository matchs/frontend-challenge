import React from 'react';

require('./style.scss')

const Loader = () => <div className="loader-container">
    <div className="loader">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
    </div>
</div>;

export default Loader;