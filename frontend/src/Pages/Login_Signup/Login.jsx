import React from "react";
import "./SignupStyle.css";
import { useNavigate } from "react-router-dom";
import LoginImg from "../LandingPage/images/loginI.jpg";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="signup">
      <div className="left-c">
        <div className="logo_icon">
          <h3>SP</h3>
        </div>
        <div className="signup-form">
          <h2>Welcome Back!</h2>
          <p>
            Pick up right where you left off — your rainy season goals are
            waiting.
          </p>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Log in</button>
          </form>
          <p>or continue with:</p>
          <div className="social-login">
            <div className="google">
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google"
              />
            </div>
          </div>
        </div>
        <div className="signup-footer">
          <p>
            New Here?{" "}
            <p
              onClick={() => {
                navigate("/signup");
              }}
              className="login-link"
            >
              Create an account
            </p>
          </p>
        </div>
      </div>
      <div className="right-c">
        <img src={LoginImg} alt="" />
      </div>
    </div>
  );
};

export default Login;
