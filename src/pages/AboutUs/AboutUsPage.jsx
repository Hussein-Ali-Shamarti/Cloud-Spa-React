import React, { useState } from "react";
import AboutUsBlock from "./AboutUsBlock";
import OurHistoryBlock from "./OurHistoryBlock";
import OurAwardsSection from "./OurAwardsSection";
import OpeningHoursSection from "./OpeningHoursSection";
import StoryModal from "./StoryModal";
import "../../styles AboutUs/AboutUsPage.css";

const AboutUsPage = () => {
  const [isStoryOpen, setStoryOpen] = useState(false);

  return (
    <>
      <AboutUsBlock />
      <OurHistoryBlock onReadMoreClick={() => setStoryOpen(true)} />
      <OurAwardsSection />
      <OpeningHoursSection />
      <StoryModal isOpen={isStoryOpen} onClose={() => setStoryOpen(false)} />
    </>
  );
};

export default AboutUsPage;
