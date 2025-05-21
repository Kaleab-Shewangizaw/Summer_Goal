import React, { useContext } from "react";
import "./SignupStyle.css";
import { useNavigate } from "react-router-dom";
import LoginImg from "../LandingPage/images/loginI.jpg";

import { UserContext } from "../../utils/AuthContext";

const Login = () => {
  document.title = "Login";
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isShowen, setIsShowen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { setUser } = useContext(UserContext);
  const [navigateTo, setNavigateTo] = React.useState(false);
  const showPassword = () => {
    setIsShowen(!isShowen);
  };
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });

    const data = await response.json();
    if (!data.success) {
      setError(data.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }

    setUser(data.user);
    // go to the homepage
    window.location.href = "/home";
  };

  React.useEffect(() => {
    if (navigateTo) {
      navigate("/home");
    }
  }, [navigateTo]);
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
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="show-password">
              <input
                type={isShowen ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span onClick={showPassword}>{isShowen ? "Hide" : "Show"}</span>
            </div>
            {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
            <button onClick={handleLogin}>Log in</button>
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
