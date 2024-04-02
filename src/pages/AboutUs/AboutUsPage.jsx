import React from "react";
import AboutUsBlock from "./AboutUsBlock";
import OurAwardsSection from "./OurAwardsSection";
import OpeningHoursSection from "./OpeningHoursSection";
import OurStorySection from "./OurStorySection";
import "../../styles/AboutUs/AboutUsPage.css";

const AboutUsPage = () => {
  return (
    <>
      <AboutUsBlock />
      <OurStorySection />
      <OurAwardsSection />
      <OpeningHoursSection />
    </>
  );
};

export default AboutUsPage;
