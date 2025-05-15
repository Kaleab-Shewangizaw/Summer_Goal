import React from "react";
import { TiPin } from "react-icons/ti";

const SkillCard = () => {
  const [pin, setPin] = React.useState(false);
  const onPinClick = () => {
    setPin(!pin);
  };
  return (
    <div className="plan-card skill-card">
      <div className="plan-card-header">
        <TiPin
          className={pin ? "pin pinned " : "pin"}
          style
          onClick={onPinClick}
        />
        <h2>Skill Title</h2>
        <p>Accomplished</p>
      </div>
      <div className="plan-card-body">
        <p>This is a sample skill description.</p>
      </div>
      <div className="plan-card-footer skill-card-footer">
        <p>
          <span>Started at:</span> 2025-4-01
        </p>
        <button className="btn">View Details</button>
      </div>
    </div>
  );
};

export default SkillCard;
