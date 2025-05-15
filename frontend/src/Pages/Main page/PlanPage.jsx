import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./PlanPage.css";
const PlanPage = () => {
  return (
    <div className="plan-page">
      <img
        src="https://picsum.photos/1200/250"
        alt="Banner"
        style={{ width: "100%", height: "100px", objectFit: "cover" }}
      />
      <div className="plan-page-content">
        <div className="deleteEdit-btn">
          <FaEdit className="edit" />
          <FaTrash className="trash" />
        </div>
        <h2>Plan Title</h2>
        <p>
          <span>Description</span> of the plan goes here.
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
        <textarea
          name="comment"
          id="comment"
          placeholder="add your comment"
        ></textarea>
        <button>add Comment</button>
        <button>Mark Done</button>
      </div>
    </div>
  );
};

export default PlanPage;
