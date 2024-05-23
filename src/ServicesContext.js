//Author: 7030
import React, { createContext, useState } from "react";

export const SelectedServiceContext = createContext();

export const SelectedServiceProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkedList, setCheckedList] = useState([]);
  const [totalSum, setTotalSum] = useState([]);
  return (
    <SelectedServiceContext.Provider
      value={{ selectedService, checkedList, selectedDate, totalSum, setSelectedService,  setSelectedDate, setCheckedList, setTotalSum }}>
      {children}
    </SelectedServiceContext.Provider>
  );
};
