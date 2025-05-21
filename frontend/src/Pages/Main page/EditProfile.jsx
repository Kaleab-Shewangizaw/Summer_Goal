import React from "react";
import "./EditProfile.css";
import { UserContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { userInfo, setUserInfo } = React.useContext(UserContext);

  const [name, setName] = React.useState(userInfo.username);
  const [bio, setBio] = React.useState(userInfo.bio);
  const [email, setEmail] = React.useState(userInfo.email);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    const updateUser = async () => {
      const res = await fetch(
        "http://localhost:5000/api/auth/edit/" + userInfo._id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            bio,
            email,
          }),
        }
      );
      if (res.ok) {
        const updatedUser = await res.json();
        setUserInfo(updatedUser);
        alert("User updated successfully");
        navigate("/home/profile");
      } else {
        console.error("Failed to update user");
      }
    };
    updateUser();
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
          <form action="" style={{ width: "100%" }} onSubmit={handleSave}>
            <p>
              <span>Name</span>
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <p>
              <span>Bio</span>
            </p>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              cols="30"
              rows="10"
              placeholder="Describe yourself here..."
              maxLength={200}
            ></textarea>
            <p>
              <span>Email</span>
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
