import React, { useState } from "react";
import { BsArrowUp, BsShare, BsShareFill } from "react-icons/bs";
import { FaEdit, FaShare, FaTrash } from "react-icons/fa";

import "./PlanPage.css";
const SkillPage = () => {
  const [isDone, setIsDone] = useState(false);
  return (
    <div className="skill-page plan-page">
      <img
        src="https://picsum.photos/1200/250"
        alt="Banner"
        style={{ width: "100%", height: "100px", objectFit: "cover" }}
      />
      <div className="plan-page-content">
        <div className="deleteEdit-btn">
          <FaEdit className="edit" />
          <FaShare className="share" />
          <FaTrash className="trash" />
        </div>
        <h2>Plan Title</h2>
        <h3>
          Progress:{" "}
          <span className={isDone ? "done pro" : "pro"}>
            {isDone ? "Accomplished" : "Pending..."}
          </span>
        </h3>
        <p>
          <span>Description</span>
          watching 10 movies in 10 days: movies: 1. The Shawshank Redemption 2.
          The Godfather 3. The Dark Knight 4. Pulp Fiction 5. The Lord of the
          Rings: The Return of the King 6. Fight Club 7. Forrest Gump 8.
          Inception 9. The Matrix 10. Goodfellas
        </p>

        <div className="plan-comments">
          <div className="comment">
            <p className="comment-content">Your comments will appear here.</p>
            <div>
              <p className="comment-date">date: may 16 2025</p>
              <FaTrash className="trash" />
            </div>
          </div>
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
