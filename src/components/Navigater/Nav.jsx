import "./nav.scss";
import { Link } from "react-router-dom";
const Nav = () => {
  const token = localStorage.getItem("token");
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  return (
    <div className="navbar">
      <div className="logo">
        <h1>Language Quiz</h1>
      </div>
      <div className="links">
        {token ? (
          <>
            <Link href="#" onClick={handleLogout}>
              Logout
            </Link>
            <Link to="/quiz">quiz</Link>
            <Link to="/Profile">Profile</Link>
          </>
        ) : (
          <>
            <Link to="/">register</Link>
            <Link to="/login">login</Link>
            <Link to="/adminLogin">Admin</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
