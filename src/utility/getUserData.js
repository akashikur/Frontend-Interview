import axios from "axios";

export async function getUserData(language) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/user/get-user`,
      {
        headers: { quiz: localStorage.getItem("token") },
      }
    );

    const userData = response.data.data;
    const languagePreferences = response.data.data.languagePreferences;
    let score;
    if (language) {
      score = response.data.data.progress.proficiencyLevels[language].score;
    }

    return { userData, languagePreferences, score };
  } catch (error) {
    throw error.response.data.message;
  }
}
