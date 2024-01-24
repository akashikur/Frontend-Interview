import axios from "axios";

export const resetApi = async (language) => {
  try {
    const obj = {
      language,
    };
    await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/user/clear-user`,
      obj,
      {
        headers: { quiz: localStorage.getItem("token") },
      }
    );

    return true;
  } catch (error) {
    throw error.response.data.message;
  }
};
