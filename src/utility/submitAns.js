import axios from "axios";

export async function submitAns(exerciseObj) {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/exercises/submit`,
      exerciseObj,
      {
        headers: { quiz: localStorage.getItem("token") },
      }
    );
    return true;
  } catch (error) {
    throw error.response.data.message;
  }
}
