//Author: 7030
import React, { createContext, useState } from "react";

export const SelectedServiceContext = createContext();

export const SelectedServiceProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkedList, setCheckedList] = useState([]);
  const [totalSum, setTotalSum] = useState([]);
  const [personCount, setPersonCount] = useState(1);

  return (
    <SelectedServiceContext.Provider
      value={{ selectedService, checkedList, selectedDate, totalSum, personCount, setSelectedService,  setSelectedDate, setCheckedList, setTotalSum, setPersonCount }}>
      {children}
    </SelectedServiceContext.Provider>
  );
};
