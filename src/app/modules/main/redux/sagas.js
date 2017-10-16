import { take, takeEvery, put, call, all } from 'redux-saga/effects'

import {
    SEARCH,
    searchDataAction,
    searchSuccessAction,
    searchFailureAction,
} from './actions';

import {
    beginSearch,
    getMoreMoviesEventChannel,
} from '../services/search';

export function* searchSaga({ payload }) {
    const firstResult = yield call(beginSearch, payload);
    if(firstResult.id) {
        yield put(searchDataAction(firstResult));    
    } else {
        return yield put(searchFailureAction())
    }

    const moreMoviesChannel =  yield call(getMoreMoviesEventChannel, firstResult.listening_token);
    try {
        while(true) {
            const oneMoreMovie = yield take(moreMoviesChannel);
            yield put(searchDataAction(oneMoreMovie));
        }
    } finally {
        yield put(searchSuccessAction());
    }
}

export function* searchWatcher() {
    yield takeEvery(SEARCH, searchSaga);
}

export default function* mainSagas() {
    yield all([
      searchWatcher()
    ]);
}