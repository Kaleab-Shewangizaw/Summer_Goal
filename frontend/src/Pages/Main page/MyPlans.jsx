import React, { useEffect } from "react";
import PlanCard from "./PlanCard";
import { FaClipboardCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/AuthContext";

const MyPlans = () => {
  const { user } = React.useContext(UserContext);
  const [error, setError] = React.useState(null);
  const [plans, setPlans] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (!user || !user.id) {
      window.location.href = "/";
      return;
    }
    document.title = "My Plans";
    setLoading(true);
    const getPlans = async () => {
      const res = await fetch(
        `https://summergoal-production.up.railway.app/api/plan/${user.id}/get-plans`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "something went wrong, try again!");
        return;
      }

      setPlans(data.plans);
      setLoading(false);
    };
    getPlans();
  }, []);
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="my-plans">
        <img
          src="https://picsum.photos/1200/250"
          alt="Banner"
          style={{ width: "100%", height: "100px", objectFit: "cover" }}
        />
        <h2>
          <FaClipboardCheck style={{ color: "#00ff00", fontSize: "2rem" }} />
        </h2>
        <div className="my-plans-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="my-plans">
      <img
        src="https://picsum.photos/1200/250"
        alt="Banner"
        style={{ width: "100%", height: "100px", objectFit: "cover" }}
      />
      <h2>
        <FaClipboardCheck style={{ color: "#00ff00", fontSize: "2rem" }} />
      </h2>
      <div className="my-plans-container">
        {error && <p className="error">{error}</p>}
        {plans.map((plan) => (
          <PlanCard key={plan._id} plan={plan} />
        ))}
        <div
          onClick={() => {
            navigate("/home/my-plans/new");
          }}
          className="add-plan"
        >
          <h2>+</h2>
          <div className="content">
            <h6>Add New Plan</h6>
            <p>Read 5 Books, Watch 10 Movies, 15 projects ...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlans;
