import React, {useState, useEffect} from "react";
import "../../styles/Booking2/Calendar.css";



const Calendar = () => {
  
  const [currentDate2, setCurrentDate]= useState("");
  const [days2, setDays] = useState([]);
  const [currentMonth2, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear2, setCurrentYear] = useState(new Date().getFullYear());
  const [today, setToday]= useState(new Date());

  const WeekDays2 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const adjustedWeekDays2 = [...WeekDays2];
  
  useEffect(() => {
    updateCalendar2();
  }, [currentMonth2, currentYear2]);

  const updateCalendar2 = () => {
    const date2 = new Date(currentYear2, currentMonth2, 1);
    let firstDayOfWeek = date2.getDay();
    if (firstDayOfWeek === 0) {
      firstDayOfWeek = 6; // Søndag, juster til lørdag (6)
      } else {
      firstDayOfWeek--; // Juster tilsvarende én mindre for alle andre dager
      }

    const lastDateOfMonth = new Date(currentYear2, currentMonth2 + 1, 0).getDate();
    const daysArray = [];

    const lastDateOfPrevMonth = new Date(currentYear2, currentMonth2, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      daysArray.push(lastDateOfPrevMonth - i);
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
      daysArray.push(i);
    }
    const remainingDays = 7 - (daysArray.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        daysArray.push(i);
      }
    }
    setDays(daysArray);
    setCurrentDate(`${new Date(currentYear2, currentMonth2).toLocaleString('default', { month: 'long' })} ${currentYear2}`);
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

  



    return(
       
       <div className="Calendar-Container">
       <div className="wrapper-Calendar">
          <div className="header2">
            <h5 className="current-date2">{currentDate2}</h5>
            <div className="icons">
                <span className="before-symbol" onClick={goToPrevMonth2}> &lt; </span>
                <span className="after-symbol" onClick={goToNextMonth2}> &gt; </span>
            </div>
          </div>
          <div className="Calendar2">
            
            <ul className="weeks2">   
            {adjustedWeekDays2.map(day => (
              <li key={day}>{day}</li>
            ))}
            </ul>
            <ul className="days2">
            {days2.map((day, index) => (
              <li key={index}>{day}</li>
              ))}  
                
            </ul>
          </div>

       </div>
       </div>
       
    );
};
export default Calendar;