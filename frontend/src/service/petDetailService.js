import apiClient from "./apiClient";
const petDetailService = {
    getById : async (id) => {
        try {
            return await apiClient.get(`/pet-detail/${id}`)
        } catch (error) {
            console.error('Error fetching petDetail by id:', error);
        }
    },
}
export default petDetailService;