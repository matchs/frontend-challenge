import React from 'react';

require('./style.scss');

const KEY_ENTER = 13;

const handleSearch = (handler = () => {}) => {
    return (e) => {
        const val = e.target.value;
        if(e.keyCode === KEY_ENTER) {
            handler(val);
        }
    }
}

const SearchBar = ({ disabled, onSearchInput }) => <div className="search-bar-container">
    <input type="text" className="search-bar" disabled={disabled} onKeyUp={handleSearch(onSearchInput)}/>
</div>;

export default SearchBar;