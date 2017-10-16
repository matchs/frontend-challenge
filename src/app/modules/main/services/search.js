import { eventChannel, END } from 'redux-saga';

import {
    getMoviesByQuery
} from '../data/moviesREST';

import {
    subscribeConnectionForToken,
    unsubscribeConnectionForToken
} from '../data/moviesSocket';

export const beginSearch = (query) => getMoviesByQuery(query);

export const CHANNEL_STATUS_ACTIVE = 'active';
export const CHANNEL_STATUS_TERMINATED = 'terminated';

export function getMoreMoviesEventChannel(token) {
    return eventChannel((emit) => {
        function handler(unparsedData) {
            const data = JSON.parse(unparsedData);
            switch(data.status) {
                case CHANNEL_STATUS_ACTIVE:
                    emit(data);
                    break;
                case CHANNEL_STATUS_TERMINATED:
                    emit(END);
                    break;
            }
        };
        
        subscribeConnectionForToken(token, handler);

        //unsubscribe
        return () => {
            unsubscribeConnectionForToken(token, handler);
        }
    })
        
}