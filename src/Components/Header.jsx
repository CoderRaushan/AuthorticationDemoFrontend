import React, { useContext } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Stores/UserProfile";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Header.css";
const ApiUrl = import.meta.env.ApiUrl;
const Header = () => {
  const navigate = useNavigate();
  const searchRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const search = searchRef.current.value;
    navigate(`/${search}`);
  };
  const { userData, setUserData, isAuthenticated, setIsAuthenticated } =
    useContext(UserContext);
  const Logout = () => {
    axios
      .post(
        // "https://backendmern-5yke.onrender.com/user/logout"
        "http://localhost:8243/user/logout"
        ,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        const message = response.data.message;
        console.log(response.data);
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
        });
        setIsAuthenticated(false);
        setUserData({
          _id: "",
          name: "",
          email: "",
        });
        navigate("/login");
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
        });
        console.error(error);
      });
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-md">
        <div className="container-fluid color">
          <Link className="navbar-brand" to="/">
            Raushan Private Limited
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon" id="color"></span>
          </button>

          <div
            className="offcanvas offcanvas-start"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Raushan Private Limited
              </h5>
              <button
              
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"

              ></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav flex-grow-1">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user">
                  {userData.photo ? (
                    <img 
                        src={userData.photo} 
                        alt="User Profile" 
                        style={{ width: '30px', height: '30px', borderRadius: '50%' }} 
                    />
                ) : (
                    <p>N/A</p>
                )}
                    {/* {userData.name || "Profile"} */}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/AddExpense">
                    Add Items
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/ShowExpense">
                   Show Items
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/album">
                    Album
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link disabled" aria-disabled="true">
                    aT8v*YkLp2mZ6@qT
                  </Link>
                </li>
                <form className="d-flex" role="search" onSubmit={handleSubmit}>
                  <input
                    ref={searchRef}
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  &nbsp;
                  <button className="btn btn-warning" type="submit">
                    Search
                  </button>
                </form>
              </ul>

              <div className="navbar-nav">
                {!isAuthenticated ? (
                  <>
                    <Link className="nav-link" to="/register">
                      <b>SignUp</b>
                    </Link>
                    <Link className="nav-link" to="/login">
                      <b>LogIn</b>
                    </Link>
                  </>
                ) : (
                  <button className="nav-link btn btn-link" onClick={Logout}>
                    <b>Log Out</b>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
