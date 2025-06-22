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
      getListOrderAll: async ()=>{
        try {
          const response = await apiClient.get(`/orders/alls`);
          return response; 
        } catch (error) {
          console.error("Error fetching orders all:", error);
          throw error;
        }
      },
      updateOrderStatus: async (data)=>{
        try {
          const response = await apiClient.put(`/orders/updateStatus`, data);
          return response; 
        } catch (error) {
          console.error("Error fetching orders all:", error);
          throw error;
        }
      },
      updatePaymentStatus: async (data)=>{
        try {
          console.log("yoyo", data);
          const response = await apiClient.put(`/orders/updatePaymentStatus`, data);
          return response; 
        } catch (error) {
          console.error("Error fetching orders all:", error);
          throw error;
        }
      },
      cancelOrderById: async (orderId) => {
        console.log("wheer",orderId);
        
        const response = await apiClient.put(`/orders/cancel?orderId=${orderId}`)
        if (response.is_success) {
          return response;
        } else {
          throw new Error("Cancel Failed!");
        }
      },
      createPaymentByOrder: async (orderId) =>{
        try {
          const response = await apiClient.post(`/orders/createPayment?orderId=${orderId}`)
          console.log("service order: ", response);
          
          return response.data; 
        } catch (error) {
          console.error("Error create order:", error);
          throw error;
        }
      },
}
export default orderService