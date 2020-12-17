// npm
import axios, { AxiosRequestConfig } from 'axios';
import useSWR, { ConfigInterface } from 'swr';

// api
export const api = axios.create({
	baseURL: `https://api.themoviedb.org/3/`,
	params: {
		api_key: 'e80bee20f5d9777cf7c45833fe5d0864',
	},
});

// hook
export const useApi = <T = any>(key: string | (string | number)[] | null, configSWR?: ConfigInterface, configAxios?: AxiosRequestConfig) => {
	return useSWR<T>(key !== null ? (Array.isArray(key) ? [...key] : [key]) : null, (url) => api.get<T>(url, configAxios).then((r) => r.data), configSWR);
};
