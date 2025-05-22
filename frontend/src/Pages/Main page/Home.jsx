import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaClipboardCheck,
  FaMedal,
  FaCheckCircle,
  FaTrophy,
} from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { BsGraphUp } from "react-icons/bs";
import { CiNoWaitingSign } from "react-icons/ci";

import "./HomeStyle.css";
import PlanCard from "./PlanCard";
import SkillCard from "./SkillCard";
import { UserContext } from "../../utils/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, userInfo, setUserInfo } = useContext(UserContext);

  const [plans, setPlans] = useState([]);
  const [skills, setSkills] = useState([]);
  const [daysLeft, setDaysLeft] = useState(0);

  // Calculate days left until September 11
  const getDaysLeft = () => {
    const today = new Date();
    const targetYear =
      today.getMonth() > 8 || (today.getMonth() === 8 && today.getDate() > 11)
        ? today.getFullYear() + 1
        : today.getFullYear();
    const targetDate = new Date(targetYear, 8, 11);
    const diff = targetDate - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Fetch user data, plans, and skills
  useEffect(() => {
    document.title = "Home";
    if (!user || !user.id) {
      navigate("/", { replace: true });
      return;
    }

    setDaysLeft(getDaysLeft());

    const interval = setInterval(() => {
      setDaysLeft(getDaysLeft());
    }, 86400000);

    const fetchData = async () => {
      try {
        const profileRes = await fetch(
          `https://summergoal-production.up.railway.app/api/auth/profile/${user.id}`
        );
        const profileData = await profileRes.json();

        if (!profileData.success) {
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

        setUserInfo(profileData.userInfo);

        const plansRes = await fetch(
          `https://summergoal-production.up.railway.app/api/plan/${user.id}/get-plans`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const plansData = await plansRes.json();
        if (plansData.success) setPlans(plansData.plans);

        const skillsRes = await fetch(
          `https://summergoal-production.up.railway.app/api/skill/${user.id}/skills`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const skillsData = await skillsRes.json();
        if (skillsData.success) setSkills(skillsData.skills);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => clearInterval(interval);
  }, [user, navigate, setUserInfo]);

  if (!user || !userInfo) return null;

  // Stats calculations
  const numberOfPlans = plans.length;
  const completedPlans = plans.filter(
    (plan) => Number(plan.progress) >= Number(plan.target)
  ).length;
  const inProgressPlans = plans.filter(
    (plan) =>
      Number(plan.progress) > 0 && Number(plan.progress) < Number(plan.target)
  ).length;
  const notStartedPlans = plans.filter((plan) => plan.progress === 0).length;
  const pinnedPlans = plans.filter((plan) => plan.pinned);

  const completedSkills = skills.filter((skill) => skill.isAccomplished);
  const pinnedSkills = skills.filter((skill) => skill.pinned);
  const shownCompletedSkills = completedSkills.slice(0, 5);

  return (
    <div className="home">
      {/* Banner */}
      <div className="home-banner">
        <img
          src="https://picsum.photos/1200/250"
          alt="Banner"
          style={{ width: "100%", height: "250px", objectFit: "cover" }}
        />
        <div className="home-banner-text">
          <h1>My Summer Planner</h1>
          <p>
            <span>{userInfo.username}'s</span> summer planner
          </p>
        </div>
      </div>

      {/* Date View */}
      <div className="date-view">
        <h2>
          <FaHome
            style={{ color: "hsl(292, 91.70%, 52.90%)", fontSize: "2rem" }}
          />
        </h2>
        <div>
          <p>
            <span>Today</span>:{" "}
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

      {/* Tracker */}
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
            </span>{" "}
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
            </span>{" "}
            {inProgressPlans}/{numberOfPlans}
            <span className="percent">
              {Math.round((inProgressPlans / numberOfPlans) * 100) || 0}%
            </span>
          </p>
          <p>
            <span>
              <CiNoWaitingSign /> Not Started
            </span>{" "}
            {notStartedPlans}/{numberOfPlans}
            <span className="percent">
              {Math.round((notStartedPlans / numberOfPlans) * 100) || 0}%
            </span>
          </p>
        </div>

        <div className="tracker-c">
          <h2>
            <IoIosRocket
              style={{ color: "hsl(202, 100%, 50%)", fontSize: "2rem" }}
            />{" "}
            Skills
          </h2>
          {shownCompletedSkills.length > 0 ? (
            shownCompletedSkills.map((skill) => (
              <span
                key={skill._id}
                style={{ display: "flex", width: "100%", marginBottom: "10px" }}
              >
                <FaTrophy
                  style={{ color: "hsl(69, 100%, 50%)", fontSize: "1.5rem" }}
                />
                {"  "}
                {skill.title}
              </span>
            ))
          ) : (
            <span>No skills yet</span>
          )}
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

      {/* Pinned Plans */}
      <div className="section2">
        <h2>Next Plan</h2>
        <div className="planView">
          {pinnedPlans.length > 0 ? (
            pinnedPlans.map((plan) => <PlanCard key={plan._id} plan={plan} />)
          ) : (
            <span>No plans pinned yet</span>
          )}
          <button
            onClick={() => navigate("/home/my-plans")}
            className="see-all-btn"
          >
            See All Plans
          </button>
        </div>
      </div>

      {/* Pinned Skills */}
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
            onClick={() => navigate("/home/my-skills")}
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
