import axios from "axios";

//API to get all users to get the leaderboard
export async function getAllUsers() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/user/get-all-user`,
      {
        headers: { quiz: localStorage.getItem("token") },
      }
    );
    return response.data.data;
  } catch (error) {
    alert(error.response.data.message);
    return null;
  }
}
