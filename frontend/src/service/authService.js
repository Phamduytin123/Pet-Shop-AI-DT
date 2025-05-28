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
    getAccountInfo: async () => apiClient.get('/auth/me'),
    updateInfo: async (data) => {
        const response = await apiClient.put("/auth/updateInfo", data);
        if (response.is_success) {
            return response;
        } else {
            throw new Error("Update Account Information Failed!");
        }
    },
    updateAvatar: async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await apiClient.put("/auth/updateAvatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (response.is_success) {
            return response;
        } else {
            throw new Error("Update Avatar Failed!");
        }
    },

    updatePassword: async (data) => {
        const response = await apiClient.put("/auth/updatePassword", data);
        if (response.is_success) {
            return response;
        } else {
            throw new Error("Update Password Failed!");
        }
    },
    getAllAccount: async ()=>{
        const response = await apiClient.get("/auth/alls");
        if (response.is_success) {
            return response;
        } else {
            throw new Error("Get All Account Failed!");
        }
    },
    updateRole: async (data) => {
        const response = await apiClient.put("/auth/updateRole", data);
        if (response.is_success) {
            return response;
        } else {
            throw new Error("Update Role Failed!");
        }
    },
    updateActivate: async (data) => {
        const response = await apiClient.put("/auth/updateActive", data);
        if (response.is_success) {
            return response;
        } else {
            throw new Error("Update Activate Failed!");
        }
    },

}
 export default authService