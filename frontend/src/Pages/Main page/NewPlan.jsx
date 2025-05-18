import React, { useState } from "react";
import "./NewPlan.css";
import { TiPin } from "react-icons/ti";

const NewPlan = () => {
  const [pin, setIsPinned] = useState(false);

  const onPinClick = () => {
    setIsPinned(!pin);
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
        <h2>New Plan</h2>
        <form action="">
          <p>
            <span>Plan Title</span>
          </p>
          <input
            type="text"
            name=""
            id="plan-title"
            placeholder="Enter your plan here..."
            // limit to 15 character
            maxLength={30}
          />
          <p>
            <span>Description</span>
          </p>
          <textarea
            name=""
            id="plan-desc"
            placeholder="Describe your plan here..."
          ></textarea>
          <p>
            <span>Progress</span>
          </p>
          <input type="number" name="" id="plan-num" placeholder="10" />
          <button type="submit" className="mark-done-btn">
            Add Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPlan;
