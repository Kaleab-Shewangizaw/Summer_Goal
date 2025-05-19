import React from "react";
import { TiPin } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const SkillCard = (props) => {
  const { skill } = props;
  const navigate = useNavigate();
  const [pin, setPin] = React.useState(false);
  const onPinClick = () => {
    setPin(!pin);
  };

  return (
    <div className="plan-card skill-card">
      <div className="plan-card-header">
        <TiPin
          className={skill.pinned ? "pin pinned " : "pin"}
          style
          onClick={onPinClick}
        />
        <h2>{skill.title}</h2>
        <p>{skill.accomplished ? "Accomplished" : "Not Accomplished"}</p>{" "}
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
