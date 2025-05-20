import React, { useEffect, useState } from "react";
import { BsArrowUp, BsShare, BsShareFill } from "react-icons/bs";
import { FaEdit, FaShare, FaTrash } from "react-icons/fa";

import "./PlanPage.css";
import { useNavigate } from "react-router-dom";

const SkillPage = () => {
  const id = window.location.pathname.split("/").pop();
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState({});
  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const fetchSkillData = async () => {
      const res = await fetch("http://localhost:5000/api/skill/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        alert(data.message || "Something went wrong, try again!");
        return;
      }
      setSkill(data.skill);
    };
    fetchSkillData();
  }, [id]);

  const handleMarkDone = async () => {
    const res = await fetch(
      "http://localhost:5000/api/skill/" + id + "/updateSkill",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          isAccomplished: !skill.isAccomplished,
          dateOfAccomplishement: new Date().toISOString(),
        }),
      }
    );
    const data = await res.json();
    if (data.success) {
      setSkill((prevSkill) => ({
        ...prevSkill,
        isAccomplished: !prevSkill.isAccomplished,
      }));

      alert("updated successfully", skill.isAccomplished);
    } else {
      alert(data.message || "Failed to update skill status.");
    }
  };

  const addComment = async () => {
    if (!commentText) {
      alert("Please add a comment");
      return;
    }
    const res = await fetch(
      "http://localhost:5000/api/skill/" + id + "/addComment",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          text: commentText,
        }),
      }
    );
    const data = await res.json();
    if (data.success) {
      const newComment = {
        text: commentText,
        Date: new Date().toISOString().slice(0, 10),
      };
      setSkill((prevSkill) => ({
        ...prevSkill,
        comment: [...prevSkill.comment, newComment],
      }));

      setCommentText("");
    } else {
      alert(data.message || "Failed to add comment.");
    }
  };

  const deleteComment = async (commentId) => {
    const res = await fetch(
      `http://localhost:5000/api/skill/${id}/${commentId}/deleteComment/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    if (data.success) {
      setSkill((prevSkill) => ({
        ...prevSkill,
        comment: prevSkill.comment.filter(
          (comment) => comment._id !== commentId
        ),
      }));
    } else {
      alert(data.message || "Failed to delete comment.");
    }
  };

  const deleteSkill = async () => {
    const res = await fetch(
      `http://localhost:5000/api/skill/${id}/deleteSkill`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    if (data.success) {
      alert("Skill deleted successfully");
      navigate("/home/my-skills");
    } else {
      alert(data.message || "Failed to delete skill.");
    }
  };

  if (loading) {
    return (
      <div className="skill-page plan-page">
        <img
          src="https://picsum.photos/1200/250"
          alt="Banner"
          style={{ width: "100%", height: "100px", objectFit: "cover" }}
        />
        <div className="plan-page-content">Loading ...</div>
      </div>
    );
  }

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
              navigate("/home/my-skills/" + id + "/edit-skill");
            }}
            className="edit"
          />
          <FaShare className="share" />
          <FaTrash className="trash" onClick={() => setPopup(true)} />
        </div>
        <h2>{skill.title}</h2>
        <div
          className="delete-popup"
          style={{
            display: popup ? "block" : "none",
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "600px",
            background: "rgb(39, 39, 39)",
            zIndex: 1000,
            color: "red",
            fontSize: "18px",
          }}
        >
          <h3
            style={{
              color: "rgb(255, 35, 35)",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            Are you sure you want to delete this skill?
          </h3>
          <p style={{ textAlign: "center", fontSize: "16px" }}>
            This action cannot be undone. All your progress and notes will be
            lost.
          </p>

          <button
            onClick={deleteSkill}
            style={{
              padding: "8px",
              margin: "10px",
              cursor: "pointer",
              backgroundColor: "rgb(255, 35, 35)",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
            }}
          >
            <FaTrash
              style={{
                marginRight: "5px",
              }}
            />
            Delete Skill
          </button>
          <button
            onClick={() => setPopup(false)}
            style={{
              padding: "8px",
              margin: "10px",
              cursor: "pointer",
              backgroundColor: "rgb(168, 168, 168)3)",
              color: "black",
              fontSize: "14px",
              width: "100px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
            }}
          >
            No
          </button>
        </div>
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
        {skill.isAccomplished && (
          <p>
            <span>Accomplished at:</span>
            {skill.isAccomplished
              ? skill.dateOfAccomplishement?.slice(0, 10)
              : " Not Accomplished"}
          </p>
        )}

        <div className="plan-comments">
          {skill.comment && skill.comment.length > 0 ? (
            skill.comment.map((comment, index) => (
              <div className="comment" key={index}>
                <p className="comment-content">{comment.text}</p>
                <div>
                  <p className="comment-date">{comment.Date.slice(0, 10)}</p>
                  <FaTrash
                    className="trash"
                    onClick={() => deleteComment(comment._id)}
                  />
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
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button onClick={addComment}>
            <BsArrowUp />
          </button>
        </div>

        <button onClick={handleMarkDone} className="mark-done-btn">
          {skill.isAccomplished
            ? "Mark as Not Accomplished"
            : "Mark as Accomplished"}
        </button>
      </div>
    </div>
  );
};

export default SkillPage;
