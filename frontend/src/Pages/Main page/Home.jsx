import React, { useContext, useEffect, useState } from "react";

import "./HomeStyle.css";
import {
  FaHome,
  FaClipboardCheck,
  FaMedal,
  FaCheckCircle,
  FaTrophy,
} from "react-icons/fa";
import { IoIosRocket, IoMdCloudDone } from "react-icons/io";
import { BsGraphUp, BsTrophy } from "react-icons/bs";
import PlanCard from "./PlanCard";
import { CiNoWaitingSign } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import SkillCard from "./SkillCard";
import { UserContext } from "../../utils/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, userInfo, setUserInfo } = useContext(UserContext);
  const { id } = user;
  const [plans, setPlans] = useState([]);
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    document.title = "Home";
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `https://summergoal-production.up.railway.app/api/auth/profile/${id}`
        );
        const data = await res.json();
        if (!data.success) {
          await fetch(
            "https://summergoal-production.up.railway.app/api/auth/logout",
            {
              method: "POST",
              credentials: "include",
            }
          );
          navigate("/", { replace: true });
          return;
        }

        setUserInfo(data.userInfo);
        if (!user || !user.id) {
          navigate("/", { replace: true });
          return;
        }
      } catch (err) {
        console.log(err);
      }
    };
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
        navigate("/");
        return;
      }

      setPlans(data.plans);
    };
    getPlans();
    const fetchSkills = async () => {
      const res = await fetch(
        `https://summergoal-production.up.railway.app/api/skill/${id}/skills`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!data.success) {
        navigate("/");
        return;
      }
      setSkills(data.skills);
    };

    fetchSkills();

    if (id) fetchUserData();
  }, [id]);

  function getDaysLeft() {
    const today = new Date();
    const year =
      today.getMonth() > 8 || (today.getMonth() === 8 && today.getDate() > 11)
        ? today.getFullYear() + 1
        : today.getFullYear();

    const newYearDate = new Date(year, 8, 11);
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
  if (!user || !user.id) {
    navigate("/");
    return null;
  }
  if (!userInfo) return null;

  const numberOfPlans = plans.length;
  const completedPlans = plans.filter(
    (plan) => Number(plan.progress) >= Number(plan.target)
  ).length;
  const pinnedPlans = plans.filter((plan) => plan.pinned === true);
  const inProgressPlans = plans.filter(
    (plan) => Number(plan.progress) < Number(plan.target) && plan.progress > 0
  ).length;
  const notStartedPlans = plans.filter((plan) => plan.progress === 0).length;

  const completeSkills = skills.filter(
    (skill) => skill.isAccomplished === true
  );
  const pinnedSkills = skills.filter((skill) => skill.pinned === true);
  const completedSkills =
    completeSkills.length > 5 ? completeSkills.slice(0, 5) : completeSkills;

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
          <p>
            <span>{userInfo.username}'s</span> summer planner{" "}
          </p>
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
            Plans
          </h2>

          <p>
            <span>
              <FaCheckCircle /> Completed
            </span>
            {completedPlans}/{numberOfPlans}
            <span className="percent">
              {numberOfPlans > 0
                ? Math.round((completedPlans / numberOfPlans) * 100)
                : 0}
              %
            </span>
          </p>

          <p>
            <span>
              <BsGraphUp /> In Progress
            </span>
            {inProgressPlans}/{numberOfPlans}{" "}
            <span className="percent">
              {Math.round((inProgressPlans / numberOfPlans) * 100) || 0}%
            </span>
          </p>
          <p>
            <span>
              <CiNoWaitingSign /> Not Started
            </span>
            {notStartedPlans}/{numberOfPlans}{" "}
            <span className="percent">
              {Math.round((notStartedPlans / numberOfPlans) * 100) || 0}%
            </span>
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
            {completedSkills.length > 0 && completedSkills.length > 0 ? (
              completedSkills.map((skill) => {
                return (
                  <span
                    key={skill._id}
                    style={{
                      display: "flex",
                      width: "100%",
                      marginBottom: "10px",
                    }}
                  >
                    <FaTrophy
                      style={{
                        color: "hsl(69, 100.00%, 50.00%)",
                        fontSize: "1.5rem",
                      }}
                    />
                    {"     "}
                    {skill.title}
                  </span>
                );
              })
            ) : (
              <span>No skills yet</span>
            )}
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
            <span style={{ color: "hsl(0, 0%, 40%)" }}>coming soon...</span>
          </p>
        </div>
      </div>

      <div className="section2">
        <h2>Next Plan</h2>
        <div className="planView">
          {pinnedPlans.length > 0 ? (
            pinnedPlans.map((plan) => <PlanCard key={plan._id} plan={plan} />)
          ) : (
            <span>No plans pinned yet</span>
          )}
          <button
            onClick={() => {
              navigate("/home/my-plans");
            }}
            style={{}}
            className="see-all-btn"
          >
            See All Plans
          </button>
        </div>
      </div>

      <div className="section2">
        <h2>Next Skill</h2>
        <div className="planView">
          {pinnedSkills.length > 0 ? (
            pinnedSkills.map((skill) => (
              <SkillCard key={skill._id} skill={skill} />
            ))
          ) : (
            <span>No skills pinned yet</span>
          )}
          <button
            onClick={() => {
              navigate("/home/my-skills");
            }}
            style={{}}
            className="see-all-btn"
          >
            See All Skills
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
