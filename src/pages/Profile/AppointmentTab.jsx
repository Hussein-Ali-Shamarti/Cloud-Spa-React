import React, { useState, useEffect, useRef } from 'react';
import Footer from "../../components/footer";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { database, ref, get, remove, set } from '../../firebase-config'; // Ensure 'set' is imported
import "../../styles/AppointementTab.css";

const Appointments = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const scrollContainerRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollDirection, setScrollDirection] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editOrderData, setEditOrderData] = useState({});

    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

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

    const fetchOrders = async (email) => {
        try {
            const ordersRef = ref(database, 'orders');
            const snapshot = await get(ordersRef);
            if (snapshot.exists()) {
                const ordersData = snapshot.val();
                const ordersList = Object.entries(ordersData).map(([orderId, orderDetails]) => {
                    if (orderDetails && orderDetails.OrderDetails && orderDetails.OrderDetails.PaymentInformation) {
                        return {
                            orderId,
                            ...orderDetails.OrderDetails,
                            email: orderDetails.OrderDetails.PaymentInformation.email,
                            firstName: orderDetails.OrderDetails.PaymentInformation.firstName,
                            lastName: orderDetails.OrderDetails.PaymentInformation.lastName,
                        };
                    } else {
                        console.warn(`Order ${orderId} is missing expected structure`);
                        return null;
                    }
                }).filter(order => order !== null);
                setOrders(ordersList);
                filterOrdersByEmail(ordersList, email);
            }
        } catch (error) {
            console.error('Error fetching orders', error);
        }
    };

    const filterOrdersByEmail = (orders, email) => {
        const filtered = orders.filter(order => order.email === email);
        setFilteredOrders(filtered);
    };

    const cancelAppointment = async (orderId) => {
        try {
            const orderRef = ref(database, `orders/${orderId}`);
            await remove(orderRef);
            setFilteredOrders(filteredOrders.filter(order => order.orderId !== orderId));
        } catch (error) {
            console.error('Error cancelling order', error);
        }
    };

    useEffect(() => {
        let scrollInterval;
        if (isScrolling && scrollDirection) {
            scrollInterval = setInterval(() => {
                if (scrollDirection === 'left') {
                    scrollContainerRef.current.scrollLeft -= 5;
                } else if (scrollDirection === 'right') {
                    scrollContainerRef.current.scrollLeft += 5;
                }
            }, 16);
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

    const startEdit = (order) => {
        setIsEditing(true);
        setEditOrderData(order);
    };

    const handleEditChange = (field, value) => {
        setEditOrderData(prev => ({ ...prev, [field]: value }));
    };

    const submitEdit = async () => {
        try {
            const orderRef = ref(database, `orders/${editOrderData.orderId}`);
            await set(orderRef, editOrderData);
            setIsEditing(false);
            fetchOrders(userEmail);
        } catch (error) {
            console.error('Error updating order', error);
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
    };

    return (
        <div className="appointments-container">
            <h1>Upcoming Appointments:</h1>
            {filteredOrders.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <div className="orders-list-container" onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
                    <div className="scroll-edge left" onMouseDown={() => handleMouseDown('left')} onMouseUp={handleMouseUp} />
                    {isEditing ? (
                        <div className="edit-form">
                            <input
                                type="date"
                                value={editOrderData.selectedDate || today}
                                min={today}
                                onChange={(e) => handleEditChange('selectedDate', e.target.value)}
                            />
                            <select
                                value={editOrderData.sessionType || ''}
                                onChange={(e) => handleEditChange('sessionType', e.target.value)}
                            >
                                <option value="Morning Awakening Spa">Morning Awakening Spa</option>
                                <option value="Daytime Spa">Daytime Spa</option>
                                <option value="Afternoon Spa">Afternoon Spa</option>
                                <option value="Evening Spa">Evening Spa</option>
                                <option value="Night Spa">Night Spa</option>
                            </select>
                            <select multiple
                                value={editOrderData.SelectedTreatments || []}
                                onChange={(e) => handleEditChange('SelectedTreatments', Array.from(e.target.selectedOptions, option => option.value))}
                            >
                                <option value="Classic Massage">Classic Massage</option>
                                <option value="Massage and Scrub">Massage and Scrub</option>
                                <option value="Hot Stone Massage">Hot Stone Massage</option>
                                <option value="Facial Treatment">Facial Treatment</option>
                                <option value="Steam Room">Steam Room</option>
                            </select>
                            <button onClick={submitEdit}>Submit Changes</button>
                            <button onClick={cancelEdit}>Cancel</button>
                        </div>
                    ) : (
                        <div className="orders-list" ref={scrollContainerRef}>
                            {filteredOrders.map(order => (
                                <div className="order-item" key={order.orderId}>
                                    <h2>Appointment for {order.selectedDate}</h2>
                                    <p>Order Nr: {order.orderId}</p>
                                    <p>Date: {order.selectedDate}</p>
                                    <p>Customer Name: {order.firstName} {order.lastName}</p>
                                    <p>Order Details</p>
                                    <ul>
                                        {order.SelectedTreatments && order.SelectedTreatments.map((treatment, index) => (
                                            <li key={index}>{treatment}</li>
                                        ))}
                                    </ul>
                                    <div className="button-container">
                                        <button className="appointments-cancel-button" onClick={() => cancelAppointment(order.orderId)}>
                                            Cancel Appointment
                                        </button>
                                        <button className="appointments-edit-button" onClick={() => startEdit(order)}>
                                            Edit Appointment
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="scroll-edge right" onMouseDown={() => handleMouseDown('right')} onMouseUp={handleMouseUp} />
                </div>
            )}
        </div>
    );
};

export default Appointments;