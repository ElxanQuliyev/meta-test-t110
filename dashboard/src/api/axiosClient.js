import axios from 'axios';
import queryString from 'query-string';

import {BASE_URL} from './baseConfig';


const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        ""
    },
    paramsSerializer:  queryString.stringify({ api_key: BASE_URL})
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    throw error;
});

export default axiosClient;