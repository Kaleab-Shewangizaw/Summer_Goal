import React, { useContext, useEffect } from "react";
import "./ProfileStyle.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/AuthContext";
const Profile = () => {
  const navigate = useNavigate();
  const { user, setUserInfo, userInfo } = useContext(UserContext);

  document.title = "Profile";
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/auth/profile/${user.id}`
        );
        const data = await res.json();
        if (data.userInfo) {
          setUserInfo(data.userInfo);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="plan-page new-plan profile">
      <img
        src="https://picsum.photos/1200/250"
        alt="Banner"
        style={{ width: "100%", height: "100px", objectFit: "cover" }}
      />
      <div className="plan-page-content profile-content">
        <h2>Profile</h2>
        <div className="profile-pic-container">
          <img
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            alt="Profile"
            className="profile-pic"
          />
        </div>
        <div className="profile-content">
          <p>
            <span>Name:</span>
            {userInfo.username}
          </p>
          <p>
            <span>Bio:</span>
            {userInfo.bio ? userInfo.bio : "..."}
          </p>
          <p>
            <span>Email:</span>
            <a href="mailto:" />
            {userInfo.email}
          </p>
          <p>
            <p>
              <span>Feedbacks:</span>
              {userInfo.comments?.length}
            </p>
            <p
              style={{
                display: "flex",
                gap: "1rem",

                flexDirection: "row",
              }}
            >
              <span>Skills:</span>
              {userInfo.skills?.length}
              <span>Plans:</span>
              {userInfo.plans?.length}
            </p>
            <span>Achievements:</span>
            coming soon...
          </p>
          <p>
            <span>Posts:</span>
            coming soon...
          </p>
          <p>
            <span>Followers, Following, replies, Liked Posts</span>
            coming soon...
          </p>
          <p>Everything else is under development...</p>
        </div>
        <button
          className="profile-edit-btn"
          onClick={() => {
            navigate("/home/profile/" + user.id + "/Edit-Profile");
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;
