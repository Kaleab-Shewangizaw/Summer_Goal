import React from "react";
import Navbar from "./Componenets/Navbar";
import HeroSection from "./Componenets/HeroSection";
import FeaturesSection from "./Componenets/FeaturesSection";
import HowItWorks from "./Componenets/HowItWorks";
import About from "./Componenets/About";
import Footer from "./Componenets/Footer";
import { useNavigate } from "react-router-dom";
import MobileView from "./Componenets/MobileView";

const LandingPage = () => {
  document.title = "Skill Planner";
  const [isMobile, setIsMobile] = React.useState(false);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/Signup");
  };
  const handleResize = () => {
    if (window.innerWidth <= 1200) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return <MobileView />;
  }
  return (
    <>
      <Navbar handleLogin={handleLoginClick} />
      <HeroSection handleLogin={handleLoginClick} />
      <FeaturesSection />
      <HowItWorks />
      <About />
      <Footer handleLogin={handleLoginClick} />
    </>
  );
};

export default LandingPage;
