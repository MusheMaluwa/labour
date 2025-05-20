// AuthPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthPage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AuthPage = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    role: "employee",
    bio: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData
      );
      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));

      switch (user.role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "employer":
          navigate("/employer-dashboard");
          break;
        case "employee":
          navigate("/employee-dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError("Invalid credentials or server error.");
      console.error(err);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", signupData);
      setIsRightPanelActive(false); // Go to login form after successful sign-up
    } catch (err) {
      setError("Sign-up failed. Email may already exist.");
      console.error(err);
    }
  };

  return (
    <div
      className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      id="container"
    >
      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignupSubmit}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="https://facebook.com" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://google.com" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="https://linkedin.com" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Name"
            value={signupData.username}
            onChange={handleSignupChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleSignupChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleSignupChange}
            required
          />
          <select
            name="role"
            value={signupData.role}
            onChange={handleSignupChange}
          >
            <option value="employee">Employee</option>
            <option value="employer">Employer</option>
          </select>
          <input
            type="text"
            name="bio"
            placeholder="What do you do?"
            value={signupData.bio}
            onChange={handleSignupChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleLoginSubmit}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="https://facebook.com" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://google.com" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="https://linkedin.com" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <a href="/">Forgot your password?</a>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Overlay Panels */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us, please login with your personal info
            </p>
            <button className="ghost" onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
