import React, {useState, useEffect} from "react";
import "../../styles/Booking2/Calendar.css";



const Calendar = () => {
  
  const [currentDate2, setCurrentDate]= useState("");
  
  //getting new date, current year and month
  useEffect(() => {
  let date2= new Date();
  let currYear2= date2.getFullYear();
  let currMonth2= date2.getMonth();
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  setCurrentDate(`${months[currMonth2]} ${currYear2}`);
}, []);

  



    return(
       
       <div className="Calendar-Container">
       <div className="wrapper">
          <div className="header2">
            <h5 className="current-date2">{currentDate2}</h5>
            <div className="icons">
                <span className="before-symbol"> &lt; </span>
                <span className="after-symbol"> &gt; </span>
            </div>
          </div>
          <div className="Calendar">
            <ul className="weeks">
                
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
                <li>Sun</li>
            </ul>
            <ul className="days">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>11</li>
                <li>12</li>
                <li>13</li>
                <li>14</li>
                <li>15</li>
                <li>16</li>
                <li>17</li>
                <li>18</li>
                <li>19</li>
                <li>20</li>
                <li>21</li>
                <li>22</li>
                <li>23</li>
                <li>24</li>
                <li>25</li>
                <li>26</li>
                <li>27</li>
                <li>28</li>
                <li>29</li>
                <li>30</li>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                
            </ul>
          </div>

       </div>
       </div>
       
    );
};
export default Calendar;