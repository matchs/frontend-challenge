import { sortBy, reverse, findKey } from 'lodash';

import {
    SEARCH,
    SEARCH_DATA,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    CHANGE_VIEW_MODE,
    SORT_BY_DATE,
    SORT_BY_TITLE,
    SORT_BY_SCORE,
} from './actions';

import {
    VIEW_MODE_SMALL,
    VIEW_MODE_LARGE,
    SORTING_ASCENDING,
    SORTING_DESCENDING,
    SORTING_NEUTRAL,
    BY_DATE,
    BY_SCORE,
    BY_TITLE,
} from '../constants';


const getSortingMode = (sorting) => findKey(sorting, (direction) => direction !== SORTING_NEUTRAL);

const sortDirectionToNextMap = {
    [SORTING_NEUTRAL]: SORTING_ASCENDING,
    [SORTING_ASCENDING]: SORTING_DESCENDING,
    [SORTING_DESCENDING]: SORTING_NEUTRAL
};
const getNextSortingDirection = (current) => sortDirectionToNextMap[current] || SORTING_NEUTRAL;

const sortModeToKeyMap = {
    [BY_DATE]: 'full_release_date',
    [BY_SCORE]: 'vote_average',
    [BY_TITLE]: 'title'
};
const sortData = (direction, mode, data) => {
    if(!mode || !direction) {
        return data;
    }
    
    const sorted = sortBy(data, [sortModeToKeyMap[mode]]);
    return direction === SORTING_DESCENDING ? reverse(sorted) : sorted;
};

const initialState = {
    isLoading: false,
    viewMode: VIEW_MODE_LARGE,
    sorting: {
        [BY_DATE]: SORTING_NEUTRAL,
        [BY_SCORE]: SORTING_NEUTRAL,
        [BY_TITLE]: SORTING_NEUTRAL,
    },
    data: [],
    errorMessage: null,
}

const mainReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case SEARCH:
            return {
                ...state,
                isLoading: true,
                data: []
            };

        case SEARCH_DATA:
            const mode = getSortingMode(state.sorting);
            const direction = state.sorting[mode];
            const release_date = payload.release_date;
            const [year, month, day] = release_date.split('-');
            return {
                ...state,
                data: sortData(direction, mode, [
                    ...state.data,
                    {
                        ...payload,
                        full_release_date: release_date,
                        release_date: {
                            year,
                            month,
                            day
                        }
                    }
                ]),
            };

        case SEARCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };

        case SEARCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                data: [],
            };

        case CHANGE_VIEW_MODE:
            return {
                ...state,
                viewMode: state.viewMode == VIEW_MODE_SMALL ? VIEW_MODE_LARGE : VIEW_MODE_SMALL
            };

        case SORT_BY_DATE:
            const dateDirection = getNextSortingDirection(state.sorting[BY_DATE])
            return {
                ...state,
                sorting: {
                    ...state.sorting,
                    [BY_DATE]: dateDirection,
                    [BY_SCORE]: SORTING_NEUTRAL,
                    [BY_TITLE]: SORTING_NEUTRAL,
                },
                data: sortData(dateDirection, BY_DATE, state.data),
            };
            
        case SORT_BY_SCORE:
            const scoreDirection = getNextSortingDirection(state.sorting[BY_SCORE]);
            return {
                ...state,
                sorting: {
                    ...state.sorting,
                    [BY_DATE]: SORTING_NEUTRAL,
                    [BY_SCORE]: scoreDirection,
                    [BY_TITLE]: SORTING_NEUTRAL,
                },
                data: sortData(scoreDirection, BY_SCORE, state.data),
            };

        case SORT_BY_TITLE:
            const titleDirection = getNextSortingDirection(state.sorting[BY_TITLE]);
            return {
                ...state,
                sorting: {
                    ...state.sorting,
                    [BY_DATE]: SORTING_NEUTRAL,
                    [BY_SCORE]: SORTING_NEUTRAL,
                    [BY_TITLE]: titleDirection,
                },
                data: sortData(titleDirection, BY_TITLE, state.data),
            };

        default:
            return state;
    }
}

export default mainReducer;