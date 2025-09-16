import axios from "axios";
const PORT = "http://localhost:8000";

export const sendChat = async (query, messages) => {
  try {
    const response = await axios.post(`${PORT}/chat`, {
      query: query,
      messages: messages
    });
    return response
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
  }
}

    

