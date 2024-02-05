import axios, { AxiosInstance } from 'axios';
import { BASE_URL_BACKEND_LOCAL, BASE_URL_BACKEND_SERVER } from '../utils/constants';

const isDev = process.env.NODE_ENV
const baseURL = isDev ? BASE_URL_BACKEND_LOCAL : BASE_URL_BACKEND_SERVER;
alert(process.env.NODE_ENV)
export const api_backend: AxiosInstance = axios.create({
    baseURL: baseURL,
});
