
import Register from "./Components/Register";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Error from "./Components/Error";
import UserProfile from "./Components/UserProfile";
import { Routes, Route } from "react-router-dom";
import ContextProvider, { UserContext } from "./Stores/UserProfile";
import { ToastContainer } from "react-toastify";
import Album from "./Components/Album";
import { useContext } from "react";
function App() {
  const { isAuthenticated } = useContext(UserContext);
  return (
    <>
      <ToastContainer />
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserProfile />} />
        <Route
          path="/album"
          element={isAuthenticated ? <Album /> : <Login />}
        />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
