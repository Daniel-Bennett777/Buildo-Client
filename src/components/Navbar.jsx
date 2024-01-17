// Navbar.jsx
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ".././Fonts/Fonts.css";

export const NavBar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const navbar = useRef();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  const openDropdown = () => {
    setDropdownOpen(true);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const userLink = () => {
    if (currentUser && currentUser.rare_user.is_contractor === true) {
      // Contractor Navbar
      return (
        <li className="mb-2" onClick={closeDropdown}>
          <Link to="/my-buildos" className="my-custom-font navbar-item hover:text-white hover:underline">
            My Buildos
          </Link>
        </li>
      );
    } else if (currentUser) {
      // Customer Navbar
      return (
        <>
          <li className="mb-2" onClick={closeDropdown}>
            <Link to="/:workorderId" className="my-custom-font navbar-item hover:text-white hover:underline">
              My Buildos
            </Link>
          </li>
          <li className="mb-2" onClick={closeDropdown}>
            <Link
              to="/available-contractors"
              className="my-custom-font navbar-item hover:text-white hover:underline"
            >
              Available Contractors
            </Link>
          </li>
          <li className="mb-2" onClick={closeDropdown}>
            <Link to="/reviews" className="my-custom-font navbar-item hover:text-white hover:underline">
              Contractor Reviews
            </Link>
          </li>
        </>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    let timeoutId;

    if (isDropdownOpen) {
      // Set a 10-second timeout to close the dropdown
      timeoutId = setTimeout(() => {
        closeDropdown();
      }, 5000);
    }

    // Cleanup function to clear the timeout if the component unmounts or dropdown is closed manually
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isDropdownOpen]);
  
  return (
    <nav
      className="flex items-center justify-between bg-gradient-to-b from-orange-500 to-orange-300 p-2 opacity-97 rounded-sm"
      role="navigation"
    >
      <div className="navbar-brand mx-16">
        <Link to="/" className="navbar-item">
          <i className="fa-solid fa-house fa-2x hover:transform hover:scale-110" onClick={closeDropdown}></i>
        </Link>
      </div>

      <div className="navbar-start flex-grow flex justify-evenly">
        <div className="group relative inline-block">
          <button
            onClick={toggleDropdown}
            className="text-black focus:outline-none"
          >
            <i className="fa-solid fa-bars fa-2x hover:transform hover:scale-110"></i>
          </button>

          {isDropdownOpen && (
            <div className="absolute bg-black text-white p-2 mt-1 rounded-lg transition-opacity duration-800 ease-in-out ">
              <ul className="list-disc pl-4">
                {userLink()}
                <li>
                  {currentUser && (
                    <button
                      className="my-custom-font button is-outlined text-white hover:underline"
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
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-end ">
        <div className="navbar-item mx-16">
          <Link to="/about" className="navbar-item">
            <i className="fa-solid fa-circle-info fa-2x hover:transform hover:scale-110" onClick={closeDropdown}></i>
          </Link>
        </div>
        {/* ... any other items in the navbar-end */}
      </div>
    </nav>
  );
};