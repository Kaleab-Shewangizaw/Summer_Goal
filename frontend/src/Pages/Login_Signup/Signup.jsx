import React, { useEffect } from "react";
import "./SignupStyle.css";
import { useNavigate } from "react-router-dom";
import SignUpImg from "../LandingPage/images/signup.png";

const Signup = () => {
  document.title = "Signup";
  const [isShowen, setIsShowen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const showPassword = () => {
    setIsShowen(!isShowen);
  };
  const navigate = useNavigate();

  const [navigateTo, setNavigateTo] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ress = await fetch(
      "https://summergoal-production.up.railway.app/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
        }),
      }
    );

    const data = await ress.json();

    if (!data.success) {
      setError("wrong credentials");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    setNavigateTo(true);
  };

  useEffect(() => {
    if (navigateTo) {
      navigate("/login");
    }
  }, [navigateTo]);

  return (
    <div className="signup">
      <div className="left-c">
        <div className="logo_icon" onClick={() => navigate("/")}>
          <h3>SP</h3>
        </div>
        <div className="signup-form">
          <h2>Welcome!</h2>
          <p>Ready to Plan Your Rainy Season? Let’s Make This Season Count!</p>
          <form>
            <input
              type="text"
              placeholder="Username"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

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
            {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
            <button onClick={handleSubmit}>Create an account</button>
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
