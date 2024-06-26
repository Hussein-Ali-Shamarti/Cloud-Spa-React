//Author: 7030
import React from "react";
import AboutUsBlock from "./AboutUsBlock";
import OurAwardsSection from "./OurAwardsSection";
import OurStorySection from "./OurStorySection";
import OpeningHours from "../../components/OpeningHours";
import Footer from "../../components/footer";

const AboutUsPage = () => {
  return (
    <>
      <AboutUsBlock />
      <OurStorySection />
      <OurAwardsSection />
      <OpeningHours />
      <Footer />
    </>
  );
};

export default AboutUsPage;
