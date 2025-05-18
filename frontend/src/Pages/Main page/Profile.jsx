import React from "react";
import "./ProfileStyle.css";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
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
          {/* profile picture placeholder dowen here */}
          <img
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            alt="Profile"
            className="profile-pic"
          />
        </div>
        <div className="profile-content">
          <p>
            <span>Name:</span>
            some name
          </p>
          <p>
            <span>Bio:</span> Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, voluptatibus.
          </p>
          <p>
            <span>Email:</span>
            <a href="mailto:" />
            user@gmail.com
          </p>
          <p>
            <span>Progress:</span>
            50% [5/10 skills] [5/10 plans]
          </p>
          <p>
            <span>Achievements:</span>
            coming soon...
          </p>
        </div>
        <button
          className="profile-edit-btn"
          onClick={() => {
            navigate("/home/profile/123/Edit-Profile");
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;
