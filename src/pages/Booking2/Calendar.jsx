import React, {useState, useEffect} from "react";
import "../../styles/Booking2/Calendar.css";



const Calendar = () => {
  
  const [currentDate2, setCurrentDate]= useState("");
  const [days2, setDays] = useState([]);

  const WeekDays2 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const adjustedWeekDays2 = [...WeekDays2];
  
  //getting new date, current year and month
  useEffect(() => {
    let date2= new Date();
    let currYear2= date2.getFullYear();
    let currMonth2= date2.getMonth();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const lastDateOfMonth = new Date(currYear2, currMonth2 + 1, 0).getDate();
    const firstDateOfMonth = new Date(currYear2, currMonth2, 1);
    let firstDayOfWeek = firstDateOfMonth.getDay();
      if (firstDayOfWeek === 0) {
      firstDayOfWeek = 6; // Søndag, juster til lørdag (6)
      } else {
      firstDayOfWeek--; // Juster tilsvarende én mindre for alle andre dager
      }
    const lastDayOfWeek = new Date(currYear2, currMonth2 + 1, 0).getDay();
    const daysArray = [];

    

    const lastDateOfPrevMonth = new Date(currYear2, currMonth2, 0).getDate();
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        daysArray.push(lastDateOfPrevMonth - i);
      }
      for (let i = 1; i < firstDayOfWeek; i++){
        daysArray.push("")
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
  setCurrentDate(`${months[currMonth2]} ${currYear2}`);
}, []);

  



    return(
       
       <div className="Calendar-Container">
       <div className="wrapper-Calendar">
          <div className="header2">
            <h5 className="current-date2">{currentDate2}</h5>
            <div className="icons">
                <span className="before-symbol"> &lt; </span>
                <span className="after-symbol"> &gt; </span>
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