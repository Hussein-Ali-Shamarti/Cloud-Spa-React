import React, { useState, useEffect, useRef } from 'react';
import Footer from "../../components/footer";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { database, ref, get, remove } from '../../firebase-config';
import "../../styles/AppointementTab.css";
import EditPopup from "../Profile/editPopup"
import editPopup from '../Profile/editPopup';

const Appointments = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const scrollContainerRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollDirection, setScrollDirection] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
                fetchOrders(user.email);
            }
        });
        return () => unsubscribe();
    }, []);

    // Function to get the orders from the database
    const fetchOrders = async (email) => {
        try {
            const ordersRef = ref(database, 'orders');
            const snapshot = await get(ordersRef);
            if (snapshot.exists()) {
                const ordersData = snapshot.val();
    
                const ordersList = Object.entries(ordersData).map(([orderId, orderDetails]) => {
                    if (
                        orderDetails &&
                        orderDetails.OrderDetails &&
                        orderDetails.OrderDetails.PaymentInformation
                    ) {
                        return {
                            orderId,
                            ...orderDetails.OrderDetails,
                            email: orderDetails.OrderDetails.PaymentInformation.email,
                            firstName: orderDetails.OrderDetails.PaymentInformation.firstName,
                            lastName: orderDetails.OrderDetails.PaymentInformation.lastName,
                        };
                    } else {
                        console.warn(`Order ${orderId} is missing expected structure`);
                        return null; // Return null if structure does not match
                    }
                }).filter(order => order !== null); // Filter out null values
    
                setOrders(ordersList);
                filterOrdersByEmail(ordersList, email);
            }
        } catch (error) {
            console.error('Error fetching orders', error);
        }
    };
    

    // Filters the orders based on the user's email so that only the logged-in user's orders show up
    const filterOrdersByEmail = (orders, email) => {
        const filtered = orders.filter(order => order.email === email); // Changed 'PaymentInformation.email' to 'email'
        console.log("Filtered Orders:", filtered); // Log the filtered orders
        setFilteredOrders(filtered);
    };

    // Function to handle the cancellation of an appointment
    const cancelAppointment = async (orderId) => {
        try {
            const orderRef = ref(database, `orders/${orderId}`);
            await remove(orderRef);
            setFilteredOrders(filteredOrders.filter(order => order.orderId !== orderId));
            console.log(`Order ${orderId} cancelled successfully.`);
        } catch (error) {
            console.error('Error cancelling order', error);
        }
    };

    // Function to handle the horizontal scrolling when there are more than 9 orders in at the same time
    useEffect(() => {
        let scrollInterval;
        if (isScrolling && scrollDirection) {
            scrollInterval = setInterval(() => {
                if (scrollDirection === 'left') {
                    scrollContainerRef.current.scrollLeft -= 5;
                } else if (scrollDirection === 'right') {
                    scrollContainerRef.current.scrollLeft += 5;
                }
            }, 16);  // ~60 frames per second
        }
        return () => clearInterval(scrollInterval);
    }, [isScrolling, scrollDirection]);

    const handleMouseDown = (direction) => {
        setIsScrolling(true);
        setScrollDirection(direction);
    };

    const handleMouseUp = () => {
        setIsScrolling(false);
        setScrollDirection(null);
    };

    const editAppointment=(orderId)=>{
setShowEditPopup(true);
    }

    return (
        <div className="appointments-container">
            <h1>Upcoming Appointments:</h1>
            {filteredOrders.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <div
                    className="orders-list-container"
                    onMouseLeave={handleMouseUp}
                    onMouseUp={handleMouseUp}
                >
                    <div
                        className="scroll-edge left"
                        onMouseDown={() => handleMouseDown('left')}
                        onMouseUp={handleMouseUp}
                    />
                    <div className="orders-list" ref={scrollContainerRef}>
                        {filteredOrders.map(order => ( // Puts the filteredOrders into a mapping to display the orders
                            <div className="order-item" key={order.orderId}>
                                <h2>Appointment {order.selectedDate}</h2>
                                <p>Order Nr: {order.orderId}</p>
                                <p>Date: {order.selectedDate}</p> {/* Fixed: Changed 'order.selectedDate' to 'order.selectedDate' */}
                                <p>Customer Name: {order.firstName} {order.lastName}</p>
                                <p>Order Details</p>
                                <ul>
                                    {order.SelectedTreatments.map((treatment, index) => (
                                        <li key={index}>{treatment}</li>
                                    ))}
                                </ul>
                                <div className="button-container">
                                    <button className="appointments-cancel-button" onClick={() => cancelAppointment(order.orderId)}>
                                        Cancel Appointment
                                    </button>
                                    <button className='appointments-edit-button' onClick={() => editAppointment( order.orderId)}>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}     
                        {showEditPopup && (
                        <EditPopup/>
                        )}       

                    </div>
                    <div
                        className="scroll-edge right"
                        onMouseDown={() => handleMouseDown('right')}
                        onMouseUp={handleMouseUp}
                    />
                </div>
            )}
        </div>
    );
};

export default Appointments;