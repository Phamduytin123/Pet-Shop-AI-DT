import apiClient from "./apiClient";
const petService = {
    getAllPet: async () =>{
        return await apiClient.get(`/pets`)
    },
    getAllBreedsPet: async () => {
        return await apiClient.get(`/pets/breeds`)
    },
    searchPetByImage: async (formData) => {
    return await apiClient.post(`/pets/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getListPetDetailByBreed:  async (breed) => {
    try{
      
      return  await apiClient.get(`/pets/${breed}`);;
    }
    catch (error) {
            console.error('Error fetching petDetail list by breed:', error);
        }
  },
  getPetInfoByBreed: async (breed) => {
    try {
      return await apiClient.get(`/pets/pet-info`, {
        params: { breed }
      });
    } catch (error) {
      console.error("Error fetching pet info by breed:", error);
      throw error;
    }
  },
  addPetInfo: async (data) => {
    const response = await apiClient.post("/pets/add", data);
    if (response.is_success) {
      return response;
    } else {
      throw new Error("Add New Pet Failed!");
    }
  },
  addPetImage: async(file, petId) =>{
    const formData = new FormData();
        formData.append("file", file);
        formData.append("petId",petId)
        const response = await apiClient.put("/pets/addImage", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (response.is_success) {
            return response;
        } else {
            throw new Error("Add Pet Image Failed!");
        }
  },
  updatePetInfo: async (data) =>{
    const response = await apiClient.put("/pets/update", data);
    if (response.is_success) {
        return response;
    } else {
        throw new Error("Update Pet Information Failed!");
    }
  },
}
export default petService