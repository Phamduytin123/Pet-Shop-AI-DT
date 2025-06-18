import apiClient from "./apiClient";
const petDetailService = {
    getById : async (id) => {
        try {
            return await apiClient.get(`/pet-detail/${id}`)
        } catch (error) {
            console.error('Error fetching petDetail by id:', error);
        }
    },
    addPetDetailInfo : async(data) =>{
        const response = await apiClient.post("/pet-detail/add", data);
        if (response.is_success) {
            return response;
        } else {
            throw new Error("Add New Pet Detail Failed!");
        }
    },
    addPetDetailImage: async(file, petDetailId) =>{
        const formData = new FormData();
            formData.append("file", file);
            formData.append("petDetailId",petDetailId)
            const response = await apiClient.put("/pet-detail/addImage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            if (response.is_success) {
                return response;
            } else {
                throw new Error("Add Pet Detail Image Failed!");
            }
      },
      updatePetDetailInfo: async (data) =>{
        const response = await apiClient.put("/pet-detail/update", data);
        if (response.is_success) {
            return response;
        } else {
            throw new Error("Update PetDetail Information Failed!");
        }
      },
      deletePetDetailById: async (petDetailId) =>{
        const response = await apiClient.delete("/pet-detail/delete",{
            params: { petDetailId }
        })
        if (response.is_success) {
            return response;
        } else {
            throw new Error("Delete PetDetail Failed!");
        }
      }
}
export default petDetailService;