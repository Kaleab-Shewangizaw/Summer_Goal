import { Route, Routes } from "react-router-dom";

import "./App.css";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Pages/Login_Signup/Login";
import Signup from "./Pages/Login_Signup/Signup";
import MainLayout from "./Pages/Main page/MainLayout";
import Home from "./Pages/Main page/Home";

function App() {
  return (
    <Routes>
      <Route path="/start" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="profile" element={<h1>Profile</h1>} />
        <Route path="settings" element={<h1>Settings</h1>} />
        <Route path="my-plans" element={<h1>My Plans</h1>} />
        <Route path="my-skills" element={<h1>My Skills</h1>} />
        <Route path="blog" element={<h1>Blog</h1>} />
      </Route>
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;

// import React from "react";
// import Navbar from "./componenets/Navbar";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <>
//       <Navbar />
//       <main style={{maxWidth: "90vw", display: "flex", justifyContent: "center", border: "1px solid gray", margin:'auto'}}>
//         <Outlet />
//       </main>
//     </>
//   );
// };

// export default Layout;
