import "../../styles/editPopup.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  getDatabase,
  ref,
  get,
  onValue,
  push,
  child,
  update,
} from "firebase/database";

const db = getDatabase();

const EditPopup = ({ orderIdToEdit }) => {
  console.log(orderIdToEdit);
  orderIdToEdit = orderIdToEdit.toString();
  const [services, setServices] = useState([]);
  const [listData, setListData] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [oldOrder, setOldOrder] = useState(null);
  let [date, setDate] = useState("");

  useEffect(() => {
    const servicesRef = ref(db, "services");
    const listDataRef = ref(db, "bookingtreatments");

    get(servicesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setServices(Object.values(snapshot.val() || {}));
        } else {
          console.log("No services data available.");
        }
      })
      .catch((error) => {
        console.error("Error fetching services data:", error);
      });

    onValue(listDataRef, (snapshot) => {
      const data = snapshot.val() || {};
      const dataArray = Object.values(data);
      setListData(dataArray);
    });

    onValue(ref(db, `orders/${orderIdToEdit}`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setOldOrder(data);

        setDate(convertDateFormat(data.OrderDetails.selectedDate));
      } else {
        console.log("No order data available.");
      }
    });
  }, []);

  const handleSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    console.log("Selected:", value, isChecked);
    if (isChecked) {
      // Add checked items into checklist
      setCheckedList((prevList) => [...prevList, value]);
    } else {
      // Remove unchecked item from checkList
      const filteredList = checkedList.filter((item) => item !== value);
      setCheckedList(filteredList);
    }
    console.log("Updated checkedList", checkedList);
  };

  function editAppointment() {
    const newOrder = {
      OrderDetails: {
        PaymentInformation: oldOrder.OrderDetails.PaymentInformation,
        SelectedTreatments: checkedList,
        selectedDate: date.toString(),
      },
    };
    const orderRef = ref(db, `orders/${orderIdToEdit}`);

    // Get a key for a new Post.
    //const newOrderKey = push(child(ref(db), 'orders')).key;

    update(orderRef, newOrder)
      .then(() => {
        console.log("Order updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating order:", error);
      });
  }
  const convertDateFormat = (dateStr) => {
    // Split the date string by dots
    const [day, month, year] = dateStr.split(".");
    // Return the date in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  };

  console.log(oldOrder, "date");
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="">
          <input
            type="date"
            placeholder="appointment date"
            defaultValue={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="">
          <label for="services">services</label>
          <select name="services" id="services" onChange={(e)=>checkedList.push(e.target.value)}>
            {services.map((service) => (
              <option value={service.Title}>{service.Title}</option>
            ))}
          </select>
        </div>
        <div className="">
          {listData.map((item) => {
            return (
              <div key={item.id} className="">
                <input
                  type="checkbox"
                  name="booking"
                  id={item.id}
                  value={item.value}
                  onChange={handleSelect}
                  checked={checkedList.includes(item.value)}
                />
                <label htmlFor={item.id}>{item.value}</label>
              </div>
            );
          })}
        </div>
        <div className="">
          <button onClick={editAppointment}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
