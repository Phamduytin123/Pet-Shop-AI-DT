import apiClient from "./apiClient";
const orderService = {
    createOrder:  async (createRequest) =>{
        try {
            const response = await apiClient.post("/orders/create", createRequest);
            console.log("service order: ", response);
            
            return response.data; 
          } catch (error) {
            console.error("Error create order:", error);
            throw error;
          }
    },
    getOrder: async () => {
        try {
          const response = await apiClient.get("/orders");
          return response; 
        } catch (error) {
          console.error("Error fetching orders:", error);
          throw error;
        }
      },
      getOrderDetailByOrderId: async (orderId) => {
        try {
          const response = await apiClient.get(`/orders/${orderId}`);
          return response; 
        } catch (error) {
          console.error("Error fetching orders detail:", error);
          throw error;
        }
      },
}
export default orderService