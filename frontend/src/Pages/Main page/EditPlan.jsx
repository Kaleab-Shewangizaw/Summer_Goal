import React, { useEffect } from "react";
import { TiPin } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const EditPlan = () => {
  const [plan, setPlan] = React.useState({});
  const [pin, setPin] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [target, setTarget] = React.useState(0);
  const navigate = useNavigate();

  const onPinClick = () => {
    setPin(!pin);
  };
  const href = window.location.href.split("/");
  const planId = href[href.length - 2];

  useEffect(() => {
    const getPlan = async () => {
      try {
        const res = await fetch(
          `https://summergoal-production.up.railway.app/api/plan/${planId}/get-plan`,
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
        setPin(data.plan.pinned);
        setTitle(data.plan.title);
        setDesc(data.plan.description);
        setTarget(data.plan.target);
      } catch (error) {
        alert("Something went wrong, try again!");
        console.error(error);
      }
    };

    getPlan();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://summergoal-production.up.railway.app/api/plan/${planId}/update-plan`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title,
            description: desc,
            pinned: pin,
            target,
          }),
        }
      );
      const data = await res.json();
      if (!data.success) {
        alert("Something went wrong, try again!");
        return;
      }

      navigate(`/home/my-plans/${planId}`);
    } catch (error) {
      alert("Something went wrong, try again!");
      console.error(error);
    }
  };
  return (
    <div className="plan-page new-plan">
      <img
        src="https://picsum.photos/1200/250"
        alt="Banner"
        style={{ width: "100%", height: "100px", objectFit: "cover" }}
      />
      <div className="plan-page-content ">
        <TiPin
          className={pin ? "pin pinned " : "pin"}
          style={{ cursor: "pointer" }}
          onClick={onPinClick}
        />
        <h2>Edit Plan</h2>
        <form onSubmit={handleSave}>
          <p>
            <span>Plan Title</span>
          </p>
          <input
            type="text"
            name=""
            id="plan-title"
            required
            placeholder="Enter your plan here..."
            // limit to 15 character
            maxLength={30}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <p>
            <span>Description</span>
          </p>
          <textarea
            name=""
            id="plan-desc"
            placeholder="Describe your plan here..."
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
          <p>
            <span>Progress</span>
          </p>
          <input
            type="number"
            name=""
            id="plan-num"
            placeholder="10"
            required
            min={1}
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
            }}
          />
          <button type="submit" className="mark-done-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPlan;
