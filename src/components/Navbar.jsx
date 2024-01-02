// Navbar.jsx
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const navbar = useRef();

  const userLink = () => {
    if (currentUser && currentUser.rare_user.is_contractor === true) {
      // Contractor Navbar
      return (
        <>
          <Link to="/my-buildos" className="navbar-item hover:text-white">
            My Buildos
          </Link>
        </>
      );
    } else if (currentUser) {
      // Customer Navbar
      return (
        <>
          <Link to="/:workorderId" className="navbar-item hover:text-white">
            My Buildos
          </Link>
          <Link to="/available-contractors" className="navbar-item hover:text-bold-white">
          Available Contractors
          </Link>
          <Link to="/reviews" className="navbar-item hover:text-white">
          Contractor Reviews
         </Link>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <nav
      className="flex items-center justify-between bg-gradient-to-b from-orange-500 p-2 opacity-97 rounded-lg"
      role="navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <h1 className="title text-4xl  hover:text-white font-bold">Buildos</h1>
        </Link>
      </div>

      <div className="navbar-start flex-grow flex justify-evenly">
        {userLink()}
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {currentUser ? (
              <button
                className="button is-outlined hover:text-white"
                onClick={() => {
                  localStorage.removeItem("current_user");
                  localStorage.removeItem("contractor");
                  localStorage.removeItem("reader_token");
                  setCurrentUser(null);
                  navigate("/login");
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="button is-outlined">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};