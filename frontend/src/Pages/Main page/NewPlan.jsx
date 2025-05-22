import "./NewPlan.css";
import { TiPin } from "react-icons/ti";
import { UserContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

const NewPlan = () => {
  const navigate = useNavigate();
  const [pin, setIsPinned] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [target, setTarget] = useState();
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const onPinClick = () => {
    setIsPinned(!pin);
  };

  const createPlan = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://summergoal-production.up.railway.app/api/plan/create/${user.id}`,
      {
        // Fixed missing comma
        method: "POST",
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
      setError(data.message || "something went wrong, try again!");
      return;
    }
    navigate("/home/my-plans");
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
        <form action="" onSubmit={createPlan}>
          <p>
            <span>Plan Title</span>
          </p>
          <input
            type="text"
            name=""
            id="plan-title"
            placeholder="Enter your plan here..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            maxLength={30}
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
            <span>Count</span>
          </p>
          <input
            type="number"
            name=""
            id="plan-num"
            placeholder="10"
            required
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
            }}
          />
          {error && <p>{error}</p>}
          <button type="submit" className="mark-done-btn">
            Add Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPlan;
