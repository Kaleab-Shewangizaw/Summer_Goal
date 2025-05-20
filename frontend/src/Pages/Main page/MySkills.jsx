import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SkillCard from "./SkillCard";
import { IoIosRocket } from "react-icons/io";
import { UserContext } from "../../utils/AuthContext";
import { FaClipboardCheck } from "react-icons/fa";

const MySkills = () => {
  const [skills, setSkills] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "My Skills";
    setLoading(true);
    const getSkills = async () => {
      const res = await fetch(
        `http://localhost:5000/api/skill/${user.id}/skills`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setSkills(data.skills);

      setLoading(false);
    };
    getSkills();
  }, []);

  if (loading) {
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
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
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
        {skills &&
          skills.map((skill) => {
            return <SkillCard key={skill._id} skill={skill} />;
          })}

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
