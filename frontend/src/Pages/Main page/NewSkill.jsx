import React, { useContext, useState } from "react";
import { TiPin } from "react-icons/ti";
import { UserContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const NewSkill = () => {
  const [pin, setIsPinned] = React.useState(false);
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const onPinClick = () => {
    setIsPinned(!pin);
  };

  const createSkill = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://summergoal-production.up.railway.app/api/skill/create/${user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          description: desc,
          pinned: pin,
        }),
      }
    );
    const data = await res.json();
    if (!data.success) {
      alert(data.message || "something went wrong, try again!");
      return;
    }
    alert("Skill created successfully!");
    navigate("/home/my-skills");
  };

  return (
    <div className="plan-page new-plan new-skill">
      <img
        src="https://picsum.photos/1200/250"
        alt="Banner"
        style={{ width: "100%", height: "100px", objectFit: "cover" }}
      />
      <div className="plan-page-content ">
        <TiPin
          className={pin ? "pin pinned " : "pin"}
          style={{ cursor: "pointer" }}
          onClick={onPinClick}
        />
        <h2>New Skill</h2>
        <form action="" onSubmit={createSkill}>
          <p>
            <span>Name</span>
          </p>
          <input
            type="text"
            name=""
            id="plan-title"
            placeholder="Enter your skill here..."
            // limit to 15 character
            maxLength={30}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <p>
            <span>Description</span>
          </p>
          <textarea
            name=""
            id="plan-desc"
            placeholder="Describe your skill here..."
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>

          <button type="submit" className="mark-done-btn">
            Add skill
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewSkill;
