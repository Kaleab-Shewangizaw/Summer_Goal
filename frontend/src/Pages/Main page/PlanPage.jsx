import React, { useEffect, useState } from "react";
import { FaEdit, FaShare, FaTrash } from "react-icons/fa";
import { BsArrowUp, BsReverseListColumnsReverse } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ContributionGrid from "./ContributionGrid";

import "./PlanPage.css";

const PlanPage = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [popup, setPopup] = useState(false);

  const [showContributions, setShowContributions] = useState(false);

  const id = window.location.href.split("/").pop();

  useEffect(() => {
    const getPlan = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/plan/${id}/get-plan`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!data.success) {
          alert("Something went wrong, try again!");
          return;
        }
        setPlan(data.plan);
        setComments(data.plan.comments);
      } catch (error) {
        alert("Something went wrong, try again!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPlan();
  }, [id]);

  const handleMarkDone = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/plan/${id}/mark-done`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!data.success) {
        alert("Something went wrong, try again!");
        return;
      }

      setPlan(data.plan);
    } catch (error) {
      alert("Something went wrong, try again!");
      console.error(error);
    }
  };

  const revertPlan = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/plan/${id}/revert-plan`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!data.success) {
        alert("Something went wrong, try again!");
        return;
      }
      setPlan(data.plan);
    } catch (error) {
      alert("Something went wrong, try again!");
      console.error(error);
    }
  };
  const deletePlan = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/plan/${id}/delete-plan`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!data.success) {
        alert("Something went wrong, try again!");
        return;
      }
      alert("Plan deleted successfully!");
      navigate("/home/my-plans");
    } catch (error) {
      alert("Something went wrong, try again!");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="plan-page">
        <img
          src="https://picsum.photos/1200/250"
          alt="Banner"
          style={{ width: "100%", height: "100px", objectFit: "cover" }}
        />
        <div className="plan-page-content">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  const addComment = async () => {
    if (!commentText) {
      alert("Please enter a comment.");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:5000/api/plan/${id}/add-comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ text: commentText }),
        }
      );
      const data = await res.json();
      if (!data.success) {
        alert("Something went wrong, refresh and try again!");
        return;
      }
      setComments((prevComments) => [
        ...prevComments,
        { text: commentText, createdAt: new Date().toISOString() },
      ]);
      navigate(`/home/my-plans/${id}`);
      setCommentText("");
    } catch (error) {
      alert("Something went wrong, refresh and try again!");
      console.error(error);
    }
  };
  const deleteComment = async (commentId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/plan/${id}/${commentId}/delete-comment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!data.success) {
        alert("Something went wrong, refresh and try again!");
        return;
      }
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      alert("Something went wrong, try again!");
      console.error(error);
    }
  };
  const percent = plan.target
    ? ((plan.progress / plan.target) * 100).toFixed(0)
    : 0;

  return (
    <div className="plan-page">
      <img
        src="https://picsum.photos/1200/250"
        alt="Banner"
        style={{ width: "100%", height: "100px", objectFit: "cover" }}
      />
      <div className="plan-page-content">
        <div className="deleteEdit-btn">
          <FaEdit
            className="edit"
            onClick={() => navigate(`/home/my-plans/${id}/edit-plan`)}
          />
          <FaShare
            className="share"
            onClick={() => alert("Share functionality not implemented yet.")}
          />
          <FaTrash className="trash" onClick={() => setPopup(true)} />
        </div>

        <h2>{plan.title}</h2>
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
            Are you sure you want to delete this plan?
          </h3>
          <p style={{ textAlign: "center", fontSize: "16px" }}>
            This action cannot be undone. All your progress and comments will be
            lost.
          </p>

          <button
            onClick={deletePlan}
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
            Delete Plan
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
          <span
            style={{
              color:
                percent > 100
                  ? "purple"
                  : percent > 80
                  ? "green"
                  : percent > 50
                  ? "#92d050"
                  : percent > 10
                  ? "#ffc000"
                  : "#ff0000",
            }}
          >
            {percent}%
          </span>{" "}
          [{plan.progress || 0}/{plan.target}]
        </h3>

        <button
          onClick={() => {
            setShowContributions(!showContributions);
          }}
          style={{
            padding: "8px",
            margin: "10px",
            cursor: "pointer",
            backgroundColor: "#0f161e",
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            width: "200px",
            height: "40px",
          }}
        >
          {showContributions ? "Hide Overview" : "Show overview"}
        </button>

        {showContributions && <ContributionGrid data={plan.dailyLog} />}

        <p>
          <span>Description: </span>
          {plan.description}
        </p>

        <div className="plan-comments">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div className="comment" key={comment._id}>
                <p className="comment-content">{comment.text}</p>
                <div>
                  <p className="comment-date">
                    {comment.createdAt.split("T")[0]}
                  </p>
                  <FaTrash
                    onClick={() => {
                      deleteComment(comment._id);
                    }}
                    className="trash"
                  />
                </div>
              </div>
            ))
          ) : (
            <p style={{ margin: "10px", textAlign: "center" }}>No Notes yet.</p>
          )}
        </div>

        <div className="add-comment">
          <textarea
            name="comment"
            id="comment"
            placeholder="Add your reflection here"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button onClick={addComment}>
            <BsArrowUp />
          </button>
        </div>

        <button className="mark-done-btn" onClick={handleMarkDone}>
          Mark Done
        </button>
        <button
          style={{
            position: "absolute",
            top: "2%",
            left: "2%",
            padding: "8px",
            backgroundColor: "#0f161e",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={revertPlan}
        >
          <BsReverseListColumnsReverse /> Revert Plan
        </button>
      </div>
    </div>
  );
};

export default PlanPage;
