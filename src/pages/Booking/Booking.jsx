import Booking1 from "../../Pictures/booking1.jpg";
import React, {useState} from 'react';
import Layout from "../../components/layout";
import "../../styles/Booking1.css";
const LIST_DATA = [
    {id: "1", value: "Classic Massage"}, 
    {id: "2", value:"Massage and Scrub"},
    {id: "3", value: "Hot stone massage"},
    {id: "4", value: "Facial Massage"},
    {id: "5", value: "Steam room"},
];
const Booking = () => {
    const [checkedList, setCheckedList] = useState([]);

    const handleSelect = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            // Add checked items into checklist
            setCheckedList([...checkedList, value]);
        } else {
            // Remove unchecked item from checkList
            const filteredList = checkedList.filter((item) => item !== value);
            setCheckedList(filteredList);
        }
    };
    return (
        <div className="booking-page">
        <><div className="image-container">
            <img
                src={Booking1}
                alt="bath"
                className="booking1-image" />
        </div>
        <div className="booking-path">
            <div className="step-indicator">
                <span className="treatment-label">Treatements</span>
                <span className="date-label">Date</span>
                <span className="checkout-label">Check Out</span>
            </div>
            <div className="current-step"></div>
        </div>
                <div className="container">
                    <div className="card">
                        <p className="title">Indulge in extra treatments to elevate your Spa Experience:</p>
                    </div>
                    <div className="card-body">
                        <label>You selected:</label>
                        {checkedList.map((item, index) => {
                            return (
                                <div className="chip" key={index}>
                                    <p className="chip-label">{item} </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="booking-body">
                    {LIST_DATA.map((item) => {
                        return (
                            <div key={item.id} className="checkbox-container">
                                <input
                                    type="checkbox"
                                    name="booking"
                                    id={item.id}
                                    value={item.value}
                                    onChange={handleSelect} />
                                <label htmlFor={item.id}>{item.value}</label>
                            </div>
                        );
                    })};
                </div>
                <div className="button-container">
                <a href="/" class="cancel-button">Cancel</a>
                <a href="/Booking2" class="next-button">Next</a>
            </div>
            </>
        </div>
    );
};
<><Booking />
        <Layout />
        </>
export default Booking;