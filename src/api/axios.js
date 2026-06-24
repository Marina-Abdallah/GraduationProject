import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:7292/api",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we have a response from the server
    if (error.response) {
      // Don't show toast for 401s if you prefer to redirect to login silently,
      // but usually showing "Session expired" is nice.
      const status = error.response.status;
      const data = error.response.data;

      let errorMessage = "An error occurred";
      
      if (typeof data === "string") {
        errorMessage = data;
      } else if (data && data.title) {
        errorMessage = data.title;
      } else if (data && data.message) {
        errorMessage = data.message;
      }

      if (status >= 500) {
        toast.error(`Server Error: ${errorMessage}`);
      } else if (status === 401 || status === 403) {
        toast.error(`Unauthorized: ${errorMessage}`);
      } else {
        toast.error(errorMessage);
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error("Network error: Could not connect to the server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      toast.error(`Error: ${error.message}`);
    }
    
    return Promise.reject(error);
  }
);

export default api;