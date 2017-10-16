import axios from 'axios';

import {
    api
} from '../../../../../config/app';

const {
    base : baseURL,
    movies : moviesPath
} = api.REST.paths;

const request = axios.create({
    baseURL,
    timeout: api.REST.timeout,
});

export const getMoviesByQuery =  (query) => request
    .get(moviesPath, {
        params: {
            query,
        }
    })
    .then(res => res.data);