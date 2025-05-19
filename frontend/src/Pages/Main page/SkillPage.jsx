import React, { useEffect, useState } from "react";
import { BsArrowUp, BsShare, BsShareFill } from "react-icons/bs";
import { FaEdit, FaShare, FaTrash } from "react-icons/fa";

import "./PlanPage.css";
import { useNavigate } from "react-router-dom";

const SkillPage = () => {
  const id = window.location.pathname.split("/").pop();
  const [isDone, setIsDone] = useState(false);
  const [skill, setSkill] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSkillData = async () => {
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
    };
    fetchSkillData();
  }, []);
  return (
    <div className="skill-page plan-page">
      <img
        src="https://picsum.photos/1200/250"
        alt="Banner"
        style={{ width: "100%", height: "100px", objectFit: "cover" }}
      />
      <div className="plan-page-content">
        <div className="deleteEdit-btn">
          <FaEdit
            onClick={() => {
              navigate("/home/my-skills/12/edit-skill");
            }}
            className="edit"
          />
          <FaShare className="share" />
          <FaTrash className="trash" />
        </div>
        <h2>{skill.title}</h2>
        <h3>
          Progress:{" "}
          <span className={skill.isAccomplished ? "done pro" : "pro"}>
            {skill.isAccomplished ? "Accomplished" : "Pending..."}
          </span>
        </h3>
        <p>
          <span>Description</span>
          {skill.description}
        </p>

        <div className="plan-comments">
          {skill.comment && skill.comment.length > 0 ? (
            skill.comment.map((comment, index) => (
              <div className="comment" key={index}>
                <p className="comment-content">{comment.text}</p>
                <div>
                  <p className="comment-date">{comment.Date}</p>
                  <FaTrash className="trash" />
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>no notes yet</p>
          )}
        </div>

        <div className="add-comment">
          <textarea
            name="comment"
            id="comment"
            placeholder="add your reflection here"
          ></textarea>
          <button>
            <BsArrowUp />
          </button>
        </div>

        <button
          onClick={() => {
            setIsDone(!isDone);
          }}
          className="mark-done-btn"
        >
          Mark Done
        </button>
      </div>
    </div>
  );
};

export default SkillPage;
