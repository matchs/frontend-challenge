import { createSelector } from 'reselect';
import { filter } from 'lodash';

import {
    BY_DATE,
    BY_SCORE,
    BY_TITLE
} from '../constants';

const stateSelector = (state) => state.main;
const routingSelector = (state) => state.routing;

const sortingSelector = createSelector(stateSelector, (state) => state.sorting);

export const selectLoadingState = createSelector(stateSelector, (state) => state.isLoading);
export const selectSearchResult = createSelector(stateSelector, (state) => state.data);
export const selectViewMode = createSelector(stateSelector, (state) => state.viewMode);
export const selectSortingByDate = createSelector(sortingSelector, (sorting) => sorting[BY_DATE]);
export const selectSortingByScore = createSelector(sortingSelector, (sorting) => sorting[BY_SCORE]);
export const selectSortingByTitle = createSelector(sortingSelector, (sorting) => sorting[BY_TITLE]);
export const selectErrorMessage = createSelector(stateSelector, (state) =>  state.errorMessage);
export const selectCurrentIdFromRoute = createSelector(routingSelector, (routing) => routing.location.pathname.split('/')[1])
export const selectMovie = createSelector([selectSearchResult, selectCurrentIdFromRoute], (data, searchingId) => filter(data, ({ id }) => id == searchingId)[0]);

