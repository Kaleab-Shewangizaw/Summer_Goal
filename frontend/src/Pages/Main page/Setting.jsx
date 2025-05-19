import React, { useContext, useEffect } from "react";
import "./SettingStyle.css"; // Assuming you have a CSS file for styling
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/AuthContext";

const Setting = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [navigateTo, setNavigateTo] = React.useState(false);
  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setNavigateTo(true);
  };

  useEffect(() => {
    if (navigateTo) {
      return navigate("/start");
    }
  });
  return (
    <div className="plan-page new-plan setting">
      <img
        src="https://picsum.photos/1200/250"
        alt="Banner"
        style={{ width: "100%", height: "100px", objectFit: "cover" }}
      />
      <div className="plan-page-content setting-content">
        <h2>Settings</h2>

        <div>
          <p>
            <span>Profile</span>
            <button
              onClick={() => {
                navigate("/home/profile/123/edit-profile");
              }}
            >
              Edit Profile
            </button>
          </p>

          <button onClick={handleLogout}>Log out</button>

          <button
            style={{
              backgroundColor: "#d13f1f",
              width: "fit-content",
              fontWeight: "400",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Delete Account
          </button>
        </div>
        <div className="contact-btns">
          <p>For support, suggestions, and feedback, please reach out to us.</p>
          <p>
            <span>Contact Us</span>
          </p>
          <button>
            <FaTelegram />
          </button>
          <button>
            <FaX />
          </button>
          <button>
            <FaGithub />
          </button>
          <button>
            <FaLinkedin />
          </button>
          <button>
            <FaInstagram />
          </button>
          <p>
            <span>feedback</span>
          </p>
          <textarea
            name=""
            id="feedback"
            cols="30"
            rows="10"
            placeholder="Describe your feedback here..."
          ></textarea>
          <button>Send</button>
        </div>
        <div>
          <p>
            <span>About</span>
            This is a personal project created by Kaleab [Kal_X]. It is designed
            to help you track your progress and achieve your goals during the
            rainy season. If you have any questions or suggestions, feel free to
            reach out! [ Liked it? please give it a STAR on github 😉 ]
            <a href="https://github.com">Link</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Setting;
