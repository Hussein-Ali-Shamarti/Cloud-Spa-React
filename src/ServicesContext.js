// ServicesContext.js
import React, { createContext, useState } from "react";

export const SelectedServiceContext = createContext();

export const SelectedServiceProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <SelectedServiceContext.Provider
      value={{ selectedService, setSelectedService, selectedDate, setSelectedDate }}>
      {children}
    </SelectedServiceContext.Provider>
  );
};
