import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Pages/Login_Signup/Login";
import Signup from "./Pages/Login_Signup/Signup";
import MainLayout from "./Pages/Main page/MainLayout";
import Home from "./Pages/Main page/Home";
import MyPlans from "./Pages/Main page/MyPlans";
import MySkills from "./Pages/Main page/MySkills";
import PlanPage from "./Pages/Main page/PlanPage";
import SkillPage from "./Pages/Main page/SkillPage";
import NewPlan from "./Pages/Main page/NewPlan";
import NewSkill from "./Pages/Main page/NewSkill";
import Profile from "./Pages/Main page/Profile";
import Setting from "./Pages/Main page/Setting";
import EditProfile from "./Pages/Main page/EditProfile";
import EditPlan from "./Pages/Main page/EditPlan";
import EditSkill from "./Pages/Main page/EditSkill";
import ProtectedRoute from "./utils/ProtectedRoute";
import { UserContext } from "./utils/AuthContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route
        path="/start"
        element={user ? <Navigate to="/home" /> : <LandingPage />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/:id/edit-profile" element={<EditProfile />} />
        <Route path="settings" element={<Setting />} />
        <Route path="my-plans" element={<MyPlans />} />
        <Route path="my-plans/new" element={<NewPlan />} />
        <Route path="my-plans/:id/edit-plan" element={<EditPlan />} />
        <Route path="my-plans/:id" element={<PlanPage />} />
        <Route path="my-skills" element={<MySkills />} />
        <Route path="my-skills/:id/edit-skill" element={<EditSkill />} />
        <Route path="my-skills/:id" element={<SkillPage />} />
        <Route path="my-skills/new" element={<NewSkill />} />
        <Route
          path="blog"
          element={
            <p>
              <span>Blog page coming soon...</span>
            </p>
          }
        />
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
