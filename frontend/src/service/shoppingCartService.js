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
  },
  updateCart: async (updateCartRequest) => {
    try {
      const response = await apiClient.put("/shopping-carts/update", updateCartRequest);
      return response.data?.data; 
    } catch (error) {
      console.error("Error update cart:", error);
      throw error;
    }
  },
  deleteCartById: async (cartId) => {

      const response = await apiClient.delete("/shopping-carts/delete",{
        params: { cartId }
    });
      console.log("asaad",response);
      
      if (response.is_success) {
        return response;
    } else {
        throw new Error("Delete Failed!");
    }
  },
};

export default shoppingCartService;
