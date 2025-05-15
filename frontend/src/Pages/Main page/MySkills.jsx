import React from "react";
import { useNavigate } from "react-router-dom";
import SkillCard from "./SkillCard";
import { IoIosRocket } from "react-icons/io";

const MySkills = () => {
  const navigate = useNavigate();
  return (
    <div className="my-plans my-skills">
      <img
        src="https://picsum.photos/1200/250"
        alt="Banner"
        style={{ width: "100%", height: "100px", objectFit: "cover" }}
      />
      <h2>
        <IoIosRocket
          style={{ color: "hsl(202, 100.00%, 50.00%)", fontSize: "2rem" }}
        />
      </h2>
      <div className="my-plans-container my-skill-container">
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />

        <div
          onClick={() => {
            navigate("/home/my-skills/new");
          }}
          className="add-plan"
        >
          <h2>+</h2>
          <div className="content">
            <h6>Add New Skill</h6>
            <p>solve Rubik's cube, Chess, Web-dev ...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySkills;
