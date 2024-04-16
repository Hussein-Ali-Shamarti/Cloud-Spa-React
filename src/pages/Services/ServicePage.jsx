import React from "react";
import Footer from "../../components/footer";
import Services from "../../pages/home/services";
import FdsBlock from "./FdsBlock";
import ClipCardBlock from "./ClipCardBlock";

const ServicePage = () => {
  return (
    <>
      <Services />
      <FdsBlock />
      <ClipCardBlock />
      <Footer />
    </>
  );
};

export default ServicePage;
