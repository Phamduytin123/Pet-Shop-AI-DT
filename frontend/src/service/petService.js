import apiClient from "./apiClient";
const petService = {
    getAllPet: async () =>{
        return await apiClient.get(`/pets`)
    },
    getAllBreedsPet: async () => {
        return await apiClient.get(`/pets/breeds`)
    }
}
export default petService