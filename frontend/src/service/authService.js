import { saveTokensToStorage } from "../utils/storageUtils";
import apiClient from "./apiClient";
const authService = {
    login: async credentials => {   
        const response = await apiClient.post('/auth/login', credentials)
        if (response.is_success) {
            console.log(response.data.token);
            
            saveTokensToStorage(response.data.token) // Save the token to local storage
            return response
        }
    },
    register: async credentials => {
        const response = await apiClient.post("/auth/register", credentials)
        if (response.is_success) {
            return response
        }
        else {
            throw new Error("Register failed!")
        }
    },
    confirmOtp: async otpRequest => {
        const response = await apiClient.post("/auth/confirm-register", otpRequest)
        if (response.is_success) {
            return response
        }
        else {
            throw new Error("Register failed!")
        }
    },
    getAccountInfo: async () => apiClient.get('/auth/me')

}
 export default authService