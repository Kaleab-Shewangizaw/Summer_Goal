import React, { useContext, useEffect, useState } from "react";
import "./SettingStyle.css"; // Assuming you have a CSS file for styling
import {
  FaDoorOpen,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaTrash,
} from "react-icons/fa";
import { FaX, FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/AuthContext";

const Setting = () => {
  document.title = "Settings";
  const { setUser, userInfo, setUserInfo } = useContext(UserContext);
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState(
    userInfo.comments ? userInfo.comments : []
  );
  const navigate = useNavigate();
  const [navigateTo, setNavigateTo] = React.useState(false);
  const [popup, setPopup] = useState(false);
  const [dpopup, setDpopup] = useState(false);
  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setUserInfo(null);
    setNavigateTo(true);
  };

  useEffect(() => {
    if (navigateTo) {
      return navigate("/start");
    }
  });
  const handleSend = async () => {
    const res = await fetch(
      "http://localhost:5000/api/auth/" + userInfo._id + "/sendFeedback",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: comment,
        }),
      }
    );
    const data = await res.json();
    if (!data.success) {
      alert("something went wrong");
    }
    setComment("");
    alert("feedback recived");
    setComments(data.comments);
  };

  const handleDeleteComment = async (commentId) => {
    const res = await fetch(
      "http://localhost:5000/api/auth/" +
        userInfo._id +
        "/" +
        commentId +
        "/deleteFeedback",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await res.json();
    if (data.success) {
      alert("Feedback deleted");
      setComments(data.comments);
    }
  };
  return (
    <div className="plan-page new-plan setting">
      <img
        src="https://picsum.photos/1200/250"
        alt="Banner"
        style={{ width: "100%", height: "100px", objectFit: "cover" }}
      />
      <div className="plan-page-content setting-content">
        <h2>Settings</h2>
        <div
          className="delete-popup"
          style={{
            display: popup ? "block" : "none",
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "100%",
            background: "rgb(39, 39, 39)",
            zIndex: 1000,
            color: "red",
            fontSize: "18px",
          }}
        >
          <h3
            style={{
              color: "rgb(255, 35, 35)",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            Are you sure you want to leave?
          </h3>
          <p style={{ textAlign: "center", fontSize: "16px" }}></p>

          <button
            onClick={handleLogout}
            style={{
              padding: "8px",
              margin: "10px",
              cursor: "pointer",
              backgroundColor: "rgb(255, 35, 35)",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
            }}
          >
            <FaDoorOpen
              style={{
                marginRight: "5px",
              }}
            />
            Log out
          </button>
          <button
            onClick={() => setPopup(false)}
            style={{
              padding: "8px",
              margin: "10px",
              cursor: "pointer",
              backgroundColor: "rgb(168, 168, 168)3)",
              color: "black",
              fontSize: "14px",
              width: "100px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
            }}
          >
            No
          </button>
        </div>
        <div
          className="delete-popup"
          style={{
            display: dpopup ? "block" : "none",
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "100%",
            background: "rgb(39, 39, 39)",
            zIndex: 1000,
            color: "red",
            fontSize: "18px",
          }}
        >
          <h3
            style={{
              color: "rgb(255, 35, 35)",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            Are you sure you want to delete your account?
          </h3>
          <p style={{ textAlign: "center", fontSize: "16px" }}>
            This action is permanent and cannot be undone. All your data,
            including progress and feedback, will be permanently removed."
          </p>

          <button
            onClick={handleLogout}
            style={{
              padding: "8px",
              margin: "10px",
              cursor: "pointer",
              backgroundColor: "rgb(255, 35, 35)",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Delete
          </button>
          <button
            onClick={() => setDpopup(false)}
            style={{
              padding: "8px",
              margin: "10px",
              cursor: "pointer",
              backgroundColor: "rgb(168, 168, 168)3)",
              color: "black",
              fontSize: "14px",
              width: "100px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
            }}
          >
            No
          </button>
        </div>

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

          <button
            onClick={() => {
              setPopup(true);
            }}
          >
            Log out
          </button>

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
            onClick={() => {
              setDpopup(true);
            }}
          >
            Delete Account
          </button>
        </div>
        <div className="contact-btns">
          <p>For support, suggestions, and feedback, please reach out to us.</p>
          <p>
            <span>Contact</span>
          </p>
          <button
            onClick={() => {
              window.open("https://t.me/kal_ab_s", "_blank");
            }}
          >
            <FaTelegram />
          </button>
          <button
            onClick={() => {
              window.open("https://x.com/KaleabShew27310", "_blank");
            }}
          >
            <FaXTwitter />
          </button>
          <button
            onClick={() => {
              window.open("https://github.com/Kaleab-Shewangizaw", "_blank");
            }}
          >
            <FaGithub />
          </button>
          <button
            onClick={() => {
              window.open("https://www.linkedin.com/in/kal-x/", "_blank");
            }}
          >
            <FaLinkedin />
          </button>
          <button
            onClick={() => {
              window.open("https://www.instagram.com/kal_ab.s/", "_blank");
            }}
          >
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
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
          <button onClick={handleSend}>Send</button>

          <div>
            {comments?.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  style={{
                    background: "#222",
                    color: "#fff",
                    padding: "5px",
                    marginTop: "5px",
                    borderRadius: "5px",
                    position: "relative",
                  }}
                >
                  <p>{comment.text}</p>
                  <p style={{ fontSize: "12px", color: "#aaa" }}>
                    Date: {new Date(comment.date).toLocaleString()}
                  </p>
                  <p style={{ fontSize: "12px", color: "#aaa" }}>
                    {" "}
                    {comment.author === userInfo._id ? "You" : "unknown"}
                  </p>
                  <FaTrash
                    style={{
                      position: "absolute",
                      top: "5%",
                      right: "2%",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleDeleteComment(comment._id);
                    }}
                  />
                </div>
              ))
            ) : (
              <p>No feedbacks yet</p>
            )}
          </div>
        </div>
        <div>
          <p>
            <span>About</span>
            This is a personal project created by Kaleab [Kal_X]. It is designed
            to help you track your progress and achieve your goals during the
            rainy season. If you have any questions or suggestions, feel free to
            reach out! [ Liked it? please give it a STAR on github 😉 ]
            <a
              href="https://github.com/Kaleab-Shewangizaw/Summer_Goal"
              target="_blank"
            >
              Link
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Setting;
