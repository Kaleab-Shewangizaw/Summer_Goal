import React from "react";
import "./SignupStyle.css";
import { useNavigate } from "react-router-dom";
import SignUpImg from "../LandingPage/images/signup.png";

const Signup = () => {
  const [isShowen, setIsShowen] = React.useState(false);
  const showPassword = () => {
    setIsShowen(!isShowen);
  };
  const navigate = useNavigate();
  return (
    <div className="signup">
      <div className="left-c">
        <div className="logo_icon">
          <h3>SP</h3>
        </div>
        <div className="signup-form">
          <h2>Welcome!</h2>
          <p>Ready to Plan Your Rainy Season? Let’s Make This Season Count!</p>
          <form>
            <input type="text" placeholder="Username" required />
            <input type="email" placeholder="Email" required />
            <div className="show-password">
              <input
                type={isShowen ? "text" : "password"}
                placeholder="Password"
                required
              />
              <span onClick={showPassword}>{isShowen ? "Hide" : "Show"}</span>
            </div>
            <button type="submit">Create an account</button>
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
            Already have an account?{" "}
            <p
              onClick={() => {
                navigate("/login");
              }}
              className="login-link"
            >
              Login
            </p>
          </p>
        </div>
      </div>
      <div className="right-c">
        <img src={SignUpImg} alt="" />
      </div>
    </div>
  );
};

export default Signup;
