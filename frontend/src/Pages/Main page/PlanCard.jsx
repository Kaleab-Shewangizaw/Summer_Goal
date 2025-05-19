import React, { useEffect } from "react";
import "./PlanCardStyle.css";
import { TiPin } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const PlanCard = (props) => {
  const { title, description, progress, target, createdAt, pinned, _id } =
    props.plan;
  const [pin, setPin] = React.useState(pinned);
  const [initialLoad, setInitialLoad] = React.useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    const updatePinned = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/plan/${_id}/update-plan`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ title, description, target, pinned: pin }),
          }
        );
        const data = await res.json();
        if (!data.success) {
          throw new Error(data.message || "Pin update failed");
        }
      } catch (err) {
        alert("Something went wrong, try again!");
        console.error(err);
        setPin(!pin);
      }
    };

    updatePinned();
  }, [pin]);

  const onPinClick = () => {
    setPin(!pin);
  };

  return (
    <div className="plan-card">
      <div className="plan-card-header">
        <TiPin
          className={pin ? "pin pinned " : "pin"}
          style={{ cursor: "pointer" }}
          onClick={onPinClick}
        />
        <h2>{title}</h2>
        <p>
          progress: {((Number(progress) / Number(target)) * 100).toFixed(1)}%
        </p>
      </div>
      <div className="plan-card-body">
        <p>
          {description.length > 70
            ? description.slice(0, 70) + "..."
            : description}
        </p>
      </div>
      <div className="plan-card-footer">
        <p>
          <span>Started at:</span> {createdAt.slice(0, 10)}
        </p>
        <button
          className="btn"
          onClick={() => {
            navigate("/home/my-plans/" + _id);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
