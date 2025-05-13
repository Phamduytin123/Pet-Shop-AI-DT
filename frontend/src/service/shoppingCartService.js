import apiClient from "./apiClient";

const shoppingCartService = {
  getShoppingCart: async () => {
    try {
      const response = await apiClient.get("/shopping-carts");
      return response; 
    } catch (error) {
      console.error("Error fetching shopping cart:", error);
      throw error;
    }
  },

  addToCart: async (addCartRequest) => {
    try {
      const response = await apiClient.post("/shopping-carts/add", addCartRequest);
      return response.data?.data; // Trả về cart vừa thêm
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }
};

export default shoppingCartService;
