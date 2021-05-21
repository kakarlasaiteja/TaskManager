/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

import "./interceptors/interceptors";

export default (({ url, data, options}) => {
    return axios.put(url, data, options)
})