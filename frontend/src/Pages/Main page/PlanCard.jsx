import React from "react";

const PlanCard = () => {
  return (
    <div className="plan-card">
      <div className="plan-card-header">
        <h2>Plan Title</h2>
        <p>Start Date: 01/01/2023</p>
        <p>progress: 50%</p>
      </div>
      <div className="plan-card-body">
        <p>Description: This is a sample plan description.</p>
        <p>Status: In Progress</p>
      </div>
      <div className="plan-card-footer">
        <button className="btn">View Details</button>
      </div>
    </div>
  );
};

export default PlanCard;
