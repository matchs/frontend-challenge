import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { map } from 'lodash';

import CardList from '../../../../components/card/list';
import Card, {
    SIZE_LARGE,
    SIZE_SMALL,
} from '../../../../components/card';
import Loader from '../../../../components/loader';
import SearchBar from '../../../../components/search-bar';
import Switch from '../../../../components/switch';
import TriStateSwitch from '../../../../components/tri-state-switch';
    
import {
    selectLoadingState,
    selectSearchResult,
    selectViewMode,
    selectSortingByDate,
    selectSortingByTitle,
    selectSortingByScore,
    selectMovie,
} from '../redux/selectors';

import {
    changeViewModeAction,
    sortByDateAction,
    sortByScoreAction,
    sortByTitleAction,
    searchAction,
} from '../redux/actions';

import {
    VIEW_MODE_SMALL,
    VIEW_MODE_LARGE,
} from '../constants';

import azIcon from '../../../../public/assets/a-z.png';
import zaIcon from '../../../../public/assets/z-a.png';
import numberAscIcon from '../../../../public/assets/1-9.png';
import numberDescIcon from '../../../../public/assets/9-1.png';
import descIcon from '../../../../public/assets/desc.png';
import ascIcon from '../../../../public/assets/asc.png';
import large from '../../../../public/assets/large.png';
import small from '../../../../public/assets/small.png';

require('../../../../style/main.scss');
class MainContainer extends Component {
    render() {
        const {
            isLoading,
            searchResult,
            viewMode,
            sortingByDate,
            sortingByTitle,
            sortingByScore,
            doSearch,
            doChangeViewMode,
            doSortByTitle,
            doSortByScore,
            doSortByDate,
            doOpenDetails,
        } = this.props;

        const hasResults = searchResult && searchResult.length > 0;

        return (<div>
    <section className="section">
        <SearchBar disabled={isLoading} onSearchInput={doSearch} />
    </section>
    <section className="section">
        <section className="section">
            <div className="search-filter-container">
                <TriStateSwitch 
                    state={sortingByTitle} 
                    onClick={doSortByTitle} 
                    positive={azIcon}
                    negative={zaIcon}
                    neutral={azIcon} 
                />
                <TriStateSwitch 
                    state={sortingByDate}
                    onClick={doSortByDate}
                    positive={ascIcon}
                    negative={descIcon}
                    neutral={ascIcon} 
                />
                <TriStateSwitch 
                    state={sortingByScore} 
                    onClick={doSortByScore}
                    positive={numberAscIcon}
                    negative={numberDescIcon}
                    neutral={numberAscIcon}
                />
                <Switch state={viewMode === VIEW_MODE_SMALL} onClick={doChangeViewMode} img={small} />
                <Switch state={viewMode === VIEW_MODE_LARGE} onClick={doChangeViewMode} img={large} />
            </div>
        </section>
        {hasResults ? <section className="section">
            <div className="search-result-container">
                <CardList>
                    {map(searchResult, ({
                        id,
                        title,
                        vote_average,
                        overview,
                        full_poster_path,
                        full_backdrop_path,
                        release_date
                    }, k) => <Card
                        title={title}
                        description={overview}
                        score={vote_average}
                        subtitle={release_date['year']}
                        smallPoster={full_backdrop_path}
                        largePoster={full_poster_path}
                        size={viewMode === VIEW_MODE_SMALL ? SIZE_SMALL : SIZE_LARGE}
                        onClick={() => doOpenDetails(id)}
                        key={k}
                    />)}
                </CardList>
            </div>
        </section> : <div></div>}
        <section className="section">
            {isLoading && <Loader />}
        </section>
    </section>
    </div>);
    }
}

const mapStateToProps = (state) => ({
    isLoading: selectLoadingState(state),
    searchResult: selectSearchResult(state),
    viewMode: selectViewMode(state),
    sortingByDate: selectSortingByDate(state),
    sortingByTitle: selectSortingByTitle(state),
    sortingByScore: selectSortingByScore(state),
});

const mapDispatchToProps = (dispatch) => ({
    doChangeViewMode: () => dispatch(changeViewModeAction()),
    doSortByDate: () => dispatch(sortByDateAction()),
    doSortByScore: () => dispatch(sortByScoreAction()),
    doSortByTitle: () => dispatch(sortByTitleAction()),
    doSearch: (str) => dispatch(searchAction(str)),
    doOpenDetails: (id) => dispatch(push(`/${id}`))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
