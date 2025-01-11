import React, { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    console.log("file is:",e.target.files[0]);
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    if (photo) formData.append("photo", photo);
    try { 
      const response = await axios.post(
        // "https://backendmern-5yke.onrender.com/user/register"
        "http://localhost:8243/user/register"
        ,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message || "Registration successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/login");
    } catch (error) 
    {
      console.error("There was an error!", error);
      toast.error(error.response?.data?.message || "Registration failed.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="col col-6 offset-3 mb-3 mt-5">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" ref={nameRef} />
        </div>
        <div className="col col-6 offset-3 mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            ref={emailRef}
          />
        </div>
        <div className="col col-6 offset-3 mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            ref={passwordRef}
          />
        </div>
        <div className="col col-6 offset-3 mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            ref={confirmPasswordRef}
          />
        </div>
        <div className="col col-6 offset-3 mb-3">
          <label htmlFor="photo" className="form-label">
            Photo
          </label>
          <input
            type="file"
            className="form-control"
            id="photo"
            name="photo"
            onChange={handlePhotoChange}
          />
        </div>
        <div className="col col-6 offset-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
