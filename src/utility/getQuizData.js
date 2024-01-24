import axios from "axios";

export async function getQuizData(language) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/exercises/get-exercises/${language}`,
      {
        headers: { quiz: localStorage.getItem("token") },
      }
    );

    // Return the quiz data
    return response.data.data[0];
  } catch (error) {
    throw error.response.data.message;
  }
}
