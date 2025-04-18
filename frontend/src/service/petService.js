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
}
export default petService