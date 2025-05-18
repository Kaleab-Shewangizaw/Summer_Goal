import React from "react";
import { TiPin } from "react-icons/ti";

const NewSkill = () => {
  const [pin, setIsPinned] = React.useState(false);

  const onPinClick = () => {
    setIsPinned(!pin);
  };

  return (
    <div className="plan-page new-plan new-skill">
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
        <h2>New Skill</h2>
        <form action="">
          <p>
            <span>Name</span>
          </p>
          <input
            type="text"
            name=""
            id="plan-title"
            placeholder="Enter your skill here..."
            // limit to 15 character
            maxLength={30}
          />
          <p>
            <span>Description</span>
          </p>
          <textarea
            name=""
            id="plan-desc"
            placeholder="Describe your skill here..."
          ></textarea>

          <button type="submit" className="mark-done-btn">
            Add skill
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewSkill;
