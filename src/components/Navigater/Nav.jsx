import "./nav.scss";
import { Link } from "react-router-dom";
const Nav = () => {
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  function handleLogoutAdmin() {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  }
  return (
    <div className="navbar">
      <div className="logo">
        <h1>Language Quiz</h1>
      </div>
      <div className="links">
        {!adminToken ? (
          token ? (
            <>
              <Link to="/quiz">quiz</Link>
              <Link to="/Profile">Profile</Link>
              <Link href="#" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/">register</Link>
              <Link to="/login">login</Link>
              <Link to="/adminLogin">Admin</Link>
            </>
          )
        ) : (
          <>
            <Link to="/create-exercise">create Exercise</Link>
            <Link href="#" onClick={handleLogoutAdmin}>
              Logout
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
