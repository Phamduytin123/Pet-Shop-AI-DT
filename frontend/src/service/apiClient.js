import axios from "axios";
import { API_BASE_URL } from "../constants/Env";
import { getTokensFromStorage } from "../utils/storageUtils";


const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    }
})

// Use interceptor to add token to request headers
apiClient.interceptors.request.use(
    async config => {
        if (config.url !== '/auth/login' && config.url !== '/auth/register') {
            const accessToken = getTokensFromStorage()
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
        }

        // Adjust headers if data is FormData
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data'
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// Handle response
apiClient.interceptors.response.use(
    response => response.data,
    async error => {
        const { response: errorResponse } = error

        if (!errorResponse) {
            return Promise.reject('Unknown error occurred.')
        }

        return Promise.reject(errorResponse.data.errors[0])
    }
)

export default apiClient