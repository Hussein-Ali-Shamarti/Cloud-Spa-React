import React, { useState } from 'react';
import { SelectedServiceContext } from './ServicesContext';
import Booking from "./pages/Booking/Booking"
import Services from "./pages/home/services"

export const ServicesContextProvider = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <SelectedServiceContext.Provider value={{ selectedService, setSelectedService }}>
      <Booking />
      <Services />
    </SelectedServiceContext.Provider>
  );
};
