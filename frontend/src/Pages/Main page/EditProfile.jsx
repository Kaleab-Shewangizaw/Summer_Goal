import React from "react";
import "./EditProfile.css";

const EditProfile = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="plan-page new-plan setting">
      <img
        src="https://picsum.photos/1200/250"
        alt="Banner"
        style={{ width: "100%", height: "100px", objectFit: "cover" }}
      />
      <div className="plan-page-content setting-content edit-profile">
        <h2>Edit Profile</h2>

        <div>
          <p>
            <span>Name</span>
          </p>
          <input type="text" />
          <p>
            <span>Bio</span>
          </p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Describe yourself here..."
            maxLength={200}
          ></textarea>
          <p>
            <span>Email</span>
          </p>
          <input type="email" />
          <p>
            <span>Password</span>
          </p>
          <input type={showPassword ? "text" : "password"} />
          <button onClick={handleShowPassword}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button>Save</button>
      </div>
    </div>
  );
};

export default EditProfile;
