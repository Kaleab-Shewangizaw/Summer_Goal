import React, { useEffect } from "react";
import { TiPin } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const EditSkill = () => {
  const [pin, setPin] = React.useState(false);
  const [skill, setSkill] = React.useState({});
  const [newTitle, setNewTitle] = React.useState(skill.title);
  const [newDescription, setNewDescription] = React.useState(skill.description);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Edit Skill";
    const fetchSkillData = async () => {
      const url = window.location.pathname.split("/");
      const id = url[url.length - 2];
      const res = await fetch("http://localhost:5000/api/skill/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || "Something went wrong, try again!");
        return;
      }
      setSkill(data.skill);
      setNewTitle(data.skill.title);
      setNewDescription(data.skill.description);
      setPin(data.skill.pinned);
    };
    fetchSkillData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const url = window.location.pathname.split("/");
    const id = url[url.length - 2];
    const res = await fetch(
      "http://localhost:5000/api/skill/" + id + "/updateSkill",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          pinned: pin,
        }),
      }
    );
    const data = await res.json();
    if (data.success) {
      alert("Skill updated successfully");
      navigate(`/home/my-skills/${id}`);
    } else {
      alert(data.message || "Failed to update skill.");
    }
  };

  const onPinClick = () => {
    setPin(!pin);
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
        <h2>Edit Skill</h2>
        <form action="" onSubmit={handleSave}>
          <p>
            <span>Skill Name</span>
          </p>
          <input
            type="text"
            name=""
            id="plan-title"
            placeholder="Enter your skill here..."
            maxLength={30}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <p>
            <span>Description</span>
          </p>
          <textarea
            name=""
            id="plan-desc"
            placeholder="Describe your skill here..."
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          ></textarea>

          <button type="submit" className="mark-done-btn">
            save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSkill;
