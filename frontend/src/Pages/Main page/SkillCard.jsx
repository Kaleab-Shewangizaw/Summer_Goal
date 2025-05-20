import React, { useEffect } from "react";
import { TiPin } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const SkillCard = (props) => {
  const { skill } = props;
  const [pin, setPin] = React.useState(skill.pinned);
  const [initialLoad, setInitialLoad] = React.useState(true);
  const navigate = useNavigate();
  const onPinClick = () => {
    setPin(!pin);
  };

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    const updatePinned = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/skill/${skill._id}/updateSkill`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ pinned: pin }),
          }
        );
        const data = await res.json();
        if (!data.success) {
          throw new Error(data.message || "Pin update failed");
        }
        setPin(data.pinned);
      } catch (err) {
        alert("Something went wrong, try again!");
        console.error(err);
        setPin(!pin);
      }
    };

    updatePinned();
  }, [pin]);

  return (
    <div className="plan-card skill-card">
      <div className="plan-card-header">
        <TiPin
          className={pin ? "pin pinned " : "pin"}
          style
          onClick={onPinClick}
        />
        <h2>{skill.title}</h2>
        <p>{skill.isAccomplished ? "Accomplished" : "Not Accomplished"}</p>{" "}
      </div>
      <div className="plan-card-body">
        <p>{skill.description}</p>
      </div>
      <div className="plan-card-footer skill-card-footer">
        <p>
          <span>Started at:</span> {skill.createdAt.slice(0, 10)}
        </p>
        <button
          className="btn"
          onClick={() => {
            navigate("/home/my-skills/" + skill._id);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default SkillCard;
