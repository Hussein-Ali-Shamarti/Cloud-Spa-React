/*Author: 7032*/


import { useState, useEffect } from "react";
import "../../styles/EventCalendar.css";
import React from 'react';

function heart(day) {
  return <span dangerouslySetInnerHTML={{ __html: `${day} &#10084;` }}></span>;
}

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const generateCalendar = (date) => {
    const monthName = date.toLocaleDateString("default", { month: "long" });
    const year = date.toLocaleDateString("default", { year: "numeric" });
    const monthYearTitle = `${
      monthName.charAt(0).toUpperCase() + monthName.slice(1)
    } ${year}`;

    const firstDayOfMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getDay();
    const lastDayOfPreviousMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();
    const lastDayOfMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const adjustedFirstDayOfMonth = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;

    const prevMonthDays = [];
    for (let i = 0; i < adjustedFirstDayOfMonth - 1; i++) {
      prevMonthDays.push(
        lastDayOfPreviousMonth - adjustedFirstDayOfMonth + i + 2
      );
    }

    const currentMonthDays = [];
    for (let i = 1; i <= lastDayOfMonth; i++) {
      currentMonthDays.push(i);
    }

    const daysToAddForNextMonth =
      7 - ((prevMonthDays.length + currentMonthDays.length) % 7);
    const nextMonthDays = [];
    if (daysToAddForNextMonth && daysToAddForNextMonth < 7) {
      for (let i = 1; i <= daysToAddForNextMonth; i++) {
        nextMonthDays.push(i);
      }
    }

    return { monthYearTitle, prevMonthDays, currentMonthDays, nextMonthDays };
  };

  const { monthYearTitle, prevMonthDays, currentMonthDays, nextMonthDays } =
    generateCalendar(currentDate);

  useEffect(() => {
    // This will run once upon component mounting, similar to the "DOMContentLoaded" event
    generateCalendar(currentDate);
  }, [currentDate]);

  return (
    <section className="event-calendar-container">
      <div>
        <div className="title-container">
          <h2 className="calendarTitle">Event Calendar</h2>
        </div>
        <div className="sub-content">
          <div className="calendar-container">
            <div className="calendar-header">
              <h5 id="month-year">{monthYearTitle}</h5>
              <div className="arrows-container">
                <span
                  className="arrow left"
                  id="prev-month"
                  onClick={() =>
                    setCurrentDate(
                      new Date(currentDate.setMonth(currentDate.getMonth() - 1))
                    )
                  }
                >
                  &lt;
                </span>
                <span
                  className="arrow right"
                  id="next-month"
                  onClick={() =>
                    setCurrentDate(
                      new Date(currentDate.setMonth(currentDate.getMonth() + 1))
                    )
                  }
                >
                  &gt;
                </span>
              </div>
            </div>

            <div className="weekdays">
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
              <div>Su</div>
            </div>

            <div id="days-grid" className="days">
              {prevMonthDays.map((day) => (
                <div key={`prev${day}`} className="day inactive">
                  {day}
                </div>
              ))}
              {currentMonthDays.map((day) => (
                <div key={day} className="day">
                  {day === 14 && currentDate.getMonth() === 1
                    ? heart(day)
                    : day}
                </div>
              ))}
              {nextMonthDays.map((day) => (
                <div key={`next${day}`} className="day inactive">
                  {day}
                </div>
              ))}
            </div>
          </div>
          <div className="event-description">
            <p>
              Explore our Event Calendar for a glimpse into the exciting
              happenings at Cloud Spa. From rejuvenating workshops to exclusive
              offers and seasonal specials. Stay tuned for updates on upcoming
              events!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCalendar;
