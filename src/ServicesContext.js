// ServicesContext.js
import React, { createContext, useState } from "react";

export const SelectedServiceContext = createContext();

export const SelectedServiceProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkedList, setCheckedList] = useState([]);
  return (
    <SelectedServiceContext.Provider
      value={{ selectedService, checkedList, selectedDate, setSelectedService,  setSelectedDate, setCheckedList }}>
      {children}
    </SelectedServiceContext.Provider>
  );
};
