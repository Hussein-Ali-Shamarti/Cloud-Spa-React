import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/Booking2/Calendar.css";
import { SelectedServiceContext } from "../../ServicesContext.js";

const Calendar = () => {
  const [currentDate2, setCurrentDate] = useState("");
  const [days2, setDays] = useState([]);
  const [currentMonth2, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear2, setCurrentYear] = useState(new Date().getFullYear());
  const [today, setToday] = useState(new Date());
  const [prevMOnthDays, setPrevMonthDays] = useState([]);
  const [nextMOnthDays, setNextMonthDays] = useState([]);
  const { selectedDate, setSelectedDate,} = useContext(SelectedServiceContext);
  const location = useLocation();
  const { checkedList} = location.state || {};
  const WeekDays2 = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    updateCalendar2();
  }, [currentMonth2, currentYear2]);

  const updateCalendar2 = () => {
    const date2 = new Date(currentYear2, currentMonth2, 1);
    let firstDayOfMOnth = date2.getDay();
    if (firstDayOfMOnth === 0) {
      firstDayOfMOnth = 6; // Søndag, juster til lørdag (6)
    } else {
      firstDayOfMOnth--; // Juster tilsvarende én mindre for alle andre dager
    }

    const lastDateOfMonth = new Date(
      currentYear2,
      currentMonth2 + 1,
      0
    ).getDate();
    const daysArray = [];
    const PrevMONthDays = [];
    const NextMOnthDays = [];

    const lastDateOfPrevMonth = new Date(
      currentYear2,
      currentMonth2,
      0
    ).getDate();
    for (let i = firstDayOfMOnth - 1; i >= 0; i--) {
      PrevMONthDays.push(lastDateOfPrevMonth - i);
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
      daysArray.push(i);
    }
    const remainingDays = 7 - ((PrevMONthDays.length + daysArray.length) % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        NextMOnthDays.push(i);
      }
    }
    const current = new Date();
    current.setHours(0, 0, 0, 0); // Nullstill tidspunktet for en nøyaktig dato sammenligning
    setToday(current);
    setPrevMonthDays(PrevMONthDays);
    setDays(daysArray);
    setNextMonthDays(NextMOnthDays);
    setCurrentDate(
      `${new Date(currentYear2, currentMonth2).toLocaleString("default", {
        month: "long"
      })} ${currentYear2}`
    );
  };

  const goToNextMonth2 = () => {
    if (currentMonth2 === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear2 + 1);
    } else {
      setCurrentMonth(currentMonth2 + 1);
    }
  };

  const goToPrevMonth2 = () => {
    if (currentMonth2 === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear2 - 1);
    } else {
      setCurrentMonth(currentMonth2 - 1);
    }
  };

  const navigate = useNavigate();
  const handleDateClick = (year, month, day) => {
    const date = new Date(year, month, day);  // Set the time to the end of the day
    const today = new Date();
    
    if (date.setHours(0, 0, 0, 0) >= today.getTime()) {
      if (month > currentMonth2) {
        goToNextMonth2();
      } else if (month < currentMonth2) {
        goToPrevMonth2();
      } else {
        setSelectedDate(date);
        console.log("Selected Date:", date);
        navigate("/Booking3", {state: {checkedList}});
      }
    } else {
      window.alert("Cannot select a date in the past");
    }
  };
  const services = checkedList || [];
  console.log("Services:", services);
  return (
    <div className="Calendar-Container">
      <div className="wrapper-Calendar">
        <div className="header2">
          <h5 className="current-date2">{currentDate2}</h5>
          <div className="icons">
            <span className="before-symbol" onClick={goToPrevMonth2}>
              {" "}
              &lt;{" "}
            </span>
            <span className="after-symbol" onClick={goToNextMonth2}>
              {" "}
              &gt;{" "}
            </span>
          </div>
        </div>
        <div className="Calendar2">
          <ul className="weeks2">
            {WeekDays2.map((day) => (
              <li key={day}>{day}</li>
            ))}
          </ul>
          <ul className="days2">
            {prevMOnthDays.map((day, index) => (
              <li key={index} className="inActive">
                {" "}
                {day}{" "}
              </li>
            ))}

            {days2.map((day, index) => {
              const dayDate = new Date(currentYear2, currentMonth2, day);
              let dayState = dayDate < today ? "inActive" : "Active";
              return (
                <li key={index} className={dayState}onClick={() => handleDateClick(currentYear2, currentMonth2, day)}>
                  {day}
                </li>
              );
            })}

            {nextMOnthDays.map((day, index) => (
              <li key={index} className="inActive" onClick={() => handleDateClick(currentYear2, currentMonth2 + 1, day)} >
                {" "}
                {day}{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Calendar;
