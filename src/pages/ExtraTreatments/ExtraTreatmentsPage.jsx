import React, { useEffect, useState, useRef } from "react";
import ClassicMassage from "./ClassicMassage";
import MassageAndScrub from "./MassageAndScrub";
import HotStoneMassage from "./HotStoneMassage";
import FacialTreatment from "./FacialTreatment";
import SteamRoom from "./SteamRoom";
import TitleExtraTreatmentsPage from "./TitleExtraTreatmentsPage";
import Layout from "../../components/layout";
import Footer from "../../components/footer";
import { useParams } from "react-router-dom";

function ExtraTreatmentsPage() {
  const { sectionId } = useParams();
  const sectionRef = useRef(null);
  useEffect(() => {
    console.log(sectionId);
    console.log(sectionRef);
    if (sectionId && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sectionId]);
  return (
    <>
      <Layout />
      <div ref={sectionRef}>
        <TitleExtraTreatmentsPage />
        <ClassicMassage id="ClassicMassage" />
        <MassageAndScrub id="Massage-and-scrub" />
        <HotStoneMassage id="hot-stone-massage" />
        <FacialTreatment id="facial-treatment"/>
        <SteamRoom id="steam-room"/>
      </div>
      <Footer />
    </>
  );
}

export default ExtraTreatmentsPage;
