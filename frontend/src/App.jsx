import { Route, Routes } from "react-router-dom";

import "./App.css";
import LandingPage from "./Pages/LandingPage/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/start" element={<LandingPage />} />
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
