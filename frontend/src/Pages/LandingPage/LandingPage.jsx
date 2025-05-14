import React from "react";
import Navbar from "./Componenets/Navbar";
import HeroSection from "./Componenets/HeroSection";
import FeaturesSection from "./Componenets/FeaturesSection";
import HowItWorks from "./Componenets/HowItWorks";
import About from "./Componenets/About";
import Footer from "./Componenets/Footer";

const LandingPage = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const handleResize = () => {
    if (window.innerWidth <= 800) {
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
    return <>Mobile and tablet view coming soon!</>;
  }
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <About />
      <Footer />
    </>
  );
};

export default LandingPage;
