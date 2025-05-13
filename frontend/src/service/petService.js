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
}
export default petService