import React from "react";
import "./PlanCardStyle.css";
import { TiPin } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const PlanCard = () => {
  const [pin, setPin] = React.useState(false);
  const onPinClick = () => {
    setPin(!pin);
  };
  const navigate = useNavigate();
  return (
    <div className="plan-card">
      <div className="plan-card-header">
        <TiPin
          className={pin ? "pin pinned " : "pin"}
          style={{ cursor: "pointer" }}
          onClick={onPinClick}
        />
        <h2>Plan Title </h2>
        <p>progress: 50%</p>
      </div>
      <div className="plan-card-body">
        <p>This is a sample plan description.</p>
      </div>
      <div className="plan-card-footer">
        <p>
          <span>Started at:</span> 2025-4-01
        </p>
        <button
          className="btn"
          onClick={() => {
            navigate("/home/my-plans/12");
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
