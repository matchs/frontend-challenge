export const SEARCH = 'app/main/search';
export const SEARCH_DATA = 'app/main/search/data';
export const SEARCH_SUCCESS = 'app/main/search/success';
export const SEARCH_FAILURE = 'app/main/search/failure';

export const CHANGE_VIEW_MODE = 'app/main/view-mode/change';
export const SORT_BY_DATE = 'app/main/sort/by-date';
export const SORT_BY_TITLE = 'app/main/sort/by-title';
export const SORT_BY_SCORE = 'app/main/sort/by-score';

function makeAction(type) {
    return (payload) => ({
        type,
        payload,
    });
}

export const searchAction = makeAction(SEARCH);
export const searchDataAction = makeAction(SEARCH_DATA);
export const searchSuccessAction = makeAction(SEARCH_SUCCESS);
export const searchFailureAction = makeAction(SEARCH_FAILURE);

export const changeViewModeAction = makeAction(CHANGE_VIEW_MODE);

export const sortByDateAction = makeAction(SORT_BY_DATE);
export const sortByScoreAction = makeAction(SORT_BY_SCORE);
export const sortByTitleAction = makeAction(SORT_BY_TITLE);