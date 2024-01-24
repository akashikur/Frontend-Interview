import axios from "axios";

export const addLanguageApi = async (lang) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/user/updateLanguage`,
      lang,
      {
        headers: { quiz: localStorage.getItem("token") },
      }
    );
    return true;
  } catch (error) {
    throw error.response.data.message;
  }
};
