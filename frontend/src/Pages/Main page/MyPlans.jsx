import React from "react";
import PlanCard from "./PlanCard";
import { FaClipboardCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyPlans = () => {
  const navigate = useNavigate();
  return (
    <div className="my-plans">
      <img
        src="https://picsum.photos/1200/250"
        alt="Banner"
        style={{ width: "100%", height: "100px", objectFit: "cover" }}
      />
      <h2>
        <FaClipboardCheck style={{ color: "#00ff00", fontSize: "2rem" }} />
      </h2>
      <div className="my-plans-container">
        <PlanCard />
        <PlanCard />
        <PlanCard />
        <PlanCard />
        <PlanCard />
        <PlanCard />
        <PlanCard />

        <div
          onClick={() => {
            navigate("/home/my-plans/new");
          }}
          className="add-plan"
        >
          <h2>+</h2>
          <div className="content">
            <h6>Add New Plan</h6>
            <p>Read 5 Books, Watch 10 Movies, 15 projects ...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlans;
