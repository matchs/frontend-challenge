const API_BASE_PATH = 'https://sbot-fe-test.herokuapp.com';
const API_MOVIES_RESOURCE = '/movies';


module.exports = {
    api: {
        REST: {
            paths:  {
                base: API_BASE_PATH + '/api/v1',
                movies: API_MOVIES_RESOURCE
            },
            timeout: 10000
        },
        socket: {
            paths: {
                movies: API_BASE_PATH,
            },
            channels: {
                movies: {
                    prefix: 'movies.'
                }
            }
        }
    },
};