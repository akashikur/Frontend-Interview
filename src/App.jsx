import { Route, Routes } from "react-router";
import "./App.scss";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Quiz from "./Pages/Quiz/Quiz";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Nav from "./components/Navigater/Nav";
import CreateEx from "./Pages/create-exercise/CreateEx";

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <Nav />
      <Routes>
        {token ? (
          <Route path="/" element={<Profile />}></Route>
        ) : (
          <Route path="/" element={<Register />}></Route>
        )}
        {/* <Route path="/" element={<Register />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
        <Route path="/adminLogin" element={<AdminLogin />}></Route>
        <Route path="/create-exercise" element={<CreateEx />}></Route>
      </Routes>
    </>
  );
}

export default App;
