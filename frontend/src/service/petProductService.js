import apiClient from "./apiClient";
const petProductService = {
    getAllPetProduct: async ()=>{
        const response = await apiClient.get("/petProducts");
        if (response.is_success) {
            return response;
        } else {
            throw new Error("Get All Pet Product Failed!");
        }
    },
    getPetProductById: async (id)=>{
        const response = await apiClient.get(`/petProducts/${id}`);
        if (response.is_success) {
            return response;
        } else {
            throw new Error("Get Pet Product Failed!");
        }
    },
    addPetProduct: async (data) =>{
        const response = await apiClient.post("/petProducts/add", data);
        if (response.is_success) {
            return response;
        } else {
            throw new Error("Add New Pet Product Failed!");
        }
    },
    addProductImage: async(file, petProductId) =>{
        const formData = new FormData();
            formData.append("file", file);
            formData.append("petProductId",petProductId)
            const response = await apiClient.put("/petProducts/addImage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            if (response.is_success) {
                return response;
            } else {
                throw new Error("Add Pet Product Image Failed!");
            }
      },
      updatePetProductInfo: async (data) =>{
          const response = await apiClient.put("/petProducts/update", data);
          if (response.is_success) {
              return response;
          } else {
              throw new Error("Update Pet Product Information Failed!");
          }
        },
}
export default petProductService;