import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../clientassets/images/logo.png";
import Logout from "../../pages/all/Logout";
import { useAuth } from "../context/AuthContext"; // Import the isLoggedIn function

const Header = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  // Function to check if the current route matches the link
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const topHeader = document.querySelector(".top-header");
      const navigation = document.querySelector(".navigation");
      const headerOffset = document.querySelector("header").offsetTop;

      if (window.scrollY > 10) {
        topHeader.classList.add("hide");
        navigation.classList.add("nav-bg");

        const headerHeight = topHeader ? topHeader.clientHeight : 0;
        navigation.style.marginTop = `-${headerHeight}px`;
      } else {
        topHeader.classList.remove("hide");
        navigation.classList.remove("nav-bg");
        navigation.style.marginTop = "0px";
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty array ensures this effect only runs once when the component mounts

  return (
    <>
      <header className="fixed-top header">
        {/* <!-- top header --> */}
        <div className="top-header py-2 bg-white">
          <div className="container">
            <div className="row no-gutters">
              <div className="col-lg-4 text-center text-lg-left">
                <a className="text-color mr-3" href="tel:+443003030266">
                  <strong>CALL</strong> +255 774402817
                </a>
                <ul className="list-inline d-inline">
                  <li className="list-inline-item mx-0">
                    <a className="d-inline-block p-2 text-color" href="">
                      <i className="ti-facebook"></i>
                    </a>
                  </li>
                  <li className="list-inline-item mx-0">
                    <a className="d-inline-block p-2 text-color" href="">
                      <i className="ti-twitter-alt"></i>
                    </a>
                  </li>
                  <li className="list-inline-item mx-0">
                    <a className="d-inline-block p-2 text-color" href="">
                      <i className="ti-github"></i>
                    </a>
                  </li>
                  <li className="list-inline-item mx-0">
                    <a className="d-inline-block p-2 text-color" href="">
                      <i className="ti-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-8 text-center text-lg-right">
                <ul className="list-inline">
                  {isLoggedIn() ? (
                    <>
                      <li className="list-inline-item">
                        <a className="text-uppercase text-color p-sm-2 py-2 px-0 d-inline-block">
                          WEBMAIL
                        </a>
                      </li>

                      <Logout />
                    </>
                  ) : (
                    <>
                      <li className="list-inline-item">
                        <a
                          className="text-uppercase text-color p-sm-2 py-2 px-0 d-inline-block"
                      
                          data-toggle="modal"
                          data-target="#loginModal"
                        >
                          Login
                        </a>
                      </li>
                      {" "}
                      <li className="list-inline-item">
                        <a
                          className="text-uppercase text-color p-sm-2 py-2 px-0 d-inline-block"
                    
                          data-toggle="modal"
                          data-target="#signupModal"
                        >
                          Register
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- navbar --> */}
        <div className="navigation w-100">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark p-0">
              <Link to="/" className="navbar-brand">
                <img src={logo} alt="logo" />
              </Link>
              <button
                className="navbar-toggler rounded-0"
                type="button"
                data-toggle="collapse"
                data-target="#navigation"
                aria-controls="navigation"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navigation">
                <ul className="navbar-nav ml-auto text-center">
                  <li className={`nav-item ${isActive("/") ? "active" : ""}`}>
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>

                  <li
                    className={`nav-item ${
                      isActive("/courses") ? "active" : ""
                    }`}
                  >
                    <Link to="/courses" className="nav-link">
                      COURSES
                    </Link>
                  </li>

                  {isLoggedIn() && (
                    <>
                      <li
                        className={`nav-item ${
                          isActive("/profile") ? "active" : ""
                        }`}
                      >
                        <Link to="/profile" className="nav-link">
                          PROFILE
                        </Link>
                      </li>
                      <li
                        className={`nav-item ${
                          isActive("/enrollment") ? "active" : ""
                        }`}
                      >
                        <Link to="/enrollment" className="nav-link">
                          ENROLLMENT HISTORY
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
