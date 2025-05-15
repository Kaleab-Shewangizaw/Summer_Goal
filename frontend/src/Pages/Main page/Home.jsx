import React, { useEffect, useState } from "react";
import "./HomeStyle.css";
import {
  FaHome,
  FaClipboardCheck,
  FaMedal,
  FaCheckCircle,
} from "react-icons/fa";
import { IoIosRocket, IoMdCloudDone } from "react-icons/io";
import { BsGraphUp } from "react-icons/bs";
import PlanCard from "./PlanCard";
import { CiNoWaitingSign } from "react-icons/ci";

const Home = () => {
  function getDaysLeft() {
    const today = new Date();
    const year =
      today.getMonth() > 8 || (today.getMonth() === 8 && today.getDate() > 11)
        ? today.getFullYear() + 1
        : today.getFullYear();

    const newYearDate = new Date(year, 8, 11); // September 11
    const diff = newYearDate - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
  const [daysLeft, setDaysLeft] = useState(getDaysLeft());
  useEffect(() => {
    const interval = setInterval(() => {
      setDaysLeft(getDaysLeft());
    }, 86400000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <div className="home-banner">
        <img
          src="https://picsum.photos/1200/250"
          alt="Banner"
          style={{ width: "100%", height: "250px", objectFit: "cover" }}
        />
        <div className="home-banner-text">
          <h1>My summer Planner</h1>
          <p>Plan your summer activities and adventures!</p>
        </div>
      </div>
      <div className="date-view">
        <h2>
          <FaHome
            style={{ color: "hsl(292, 91.70%, 52.90%)", fontSize: "2rem" }}
          />
        </h2>
        <div>
          <p>
            {" "}
            <span>today</span>:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p>
            <span>Until New Year</span>: {daysLeft} Days,{" "}
            <span className="percent">
              {Math.round((daysLeft / 365) * 100)}%
            </span>
          </p>
        </div>
      </div>
      <div className="tracker">
        <div className="tracker-c">
          <h2>
            <FaClipboardCheck
              style={{ color: "hsl(120, 100%, 50%)", fontSize: "2rem" }}
            />{" "}
            Goals
          </h2>

          <p>
            <span>
              {" "}
              <FaCheckCircle /> Completed
            </span>
            3/5 <span className="percent">60%</span>
          </p>
          <p>
            <span>
              <BsGraphUp /> In Progress
            </span>
            2/5 <span className="percent">40%</span>
          </p>
          <p>
            <span>
              <CiNoWaitingSign /> Not Started
            </span>
            0/5 <span className="percent">0%</span>
          </p>
          <p>
            <span>
              <IoMdCloudDone /> Overdue
            </span>
            0/5 <span className="percent">0%</span>
          </p>
        </div>
        <div className="tracker-c">
          <h2>
            <IoIosRocket
              style={{ color: "hsl(202, 100.00%, 50.00%)", fontSize: "2rem" }}
            />{" "}
            Skills
          </h2>
          <p>
            <span> React, JavaScript, CSS</span>
          </p>
        </div>
        <div className="tracker-c">
          <h2>
            <FaMedal
              style={{ color: "hsl(45, 100%, 50%)", fontSize: "2rem" }}
            />{" "}
            Achievements
          </h2>
          <p>
            <span>coming soon</span>
          </p>
        </div>
      </div>

      <div className="section2">
        <h2>Next Plan</h2>
        <div className="planView">
          <PlanCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
