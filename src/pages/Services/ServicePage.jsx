import React from "react";
import Footer from "../../components/footer";
import Services from "../../pages/home/services";
import FdsBlock from "./FdsBlock";
import ClipCardBlock from "./ClipCardBlock";

const ServicePage = () => {
  // Replace '70px' with the actual height of your navigation bar + extra space you want
  const serviceStyle = {
    paddingTop: "70px"
  };

  return (
    <>
      <div style={serviceStyle}>
        <Services />
      </div>
      <FdsBlock />
      <ClipCardBlock />
      <Footer />
    </>
  );
};

export default ServicePage;
