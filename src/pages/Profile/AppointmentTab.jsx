import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { database, ref, get, remove, update } from '../../firebase-config';
import "../../styles/AppointementTab.css";

const Appointments = () => {
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editOrder, setEditOrder] = useState(null);
    const scrollContainerRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollDirection, setScrollDirection] = useState(null);

    const fetchOrders = useCallback(async (email) => {
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
                filterOrdersByEmail(ordersList, email);
            }
        } catch (error) {
            console.error('Error fetching orders', error);
        }
    }, []);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
                fetchOrders(user.email);
            }
        });
        return () => unsubscribe();
    }, [fetchOrders]);

    useEffect(() => {
        if (userEmail) {
            fetchOrders(userEmail);
        }
    }, [userEmail, fetchOrders]);

    const filterOrdersByEmail = (orders, email) => {
        const filtered = orders.filter(order => order.email === email);
        console.log("Filtered Orders:", filtered);
        setFilteredOrders(filtered);
    };

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

    const openEditPopup = (order) => {
        setEditOrder(order);
        setShowEditPopup(true);
    };

    const handleEditSubmit = async (orderId, updatedDate, updatedTreatments, updatedServiceType) => {
        const orderRef = ref(database, `orders/${orderId}/OrderDetails`);
        const updates = {
            selectedDate: updatedDate,
            SelectedTreatments: updatedTreatments.map(treatment => ({ name: treatment })),
            serviceType: updatedServiceType,
        };
        try {
            await update(orderRef, updates);
            setShowEditPopup(false);
            fetchOrders(userEmail); // Refresh orders to reflect changes
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    return (
        <div className="appointments-container">
            <h1>Upcoming Appointments:</h1>
            {filteredOrders.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <div className="orders-list-container" onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
                    <div className="scroll-edge left" onMouseDown={() => handleMouseDown('left')} onMouseUp={handleMouseUp} />
                    <div className="orders-list" ref={scrollContainerRef}>
                        {filteredOrders.map(order => (
                            <div className="order-item" key={order.orderId}>
                                <h2>Appointment {order.selectedDate}</h2>
                                <p>Order Nr: {order.orderId}</p>
                                <p>Date: {order.selectedDate}</p>
                                <p>Customer Name: {order.firstName} {order.lastName}</p>
                                <p>Order Details</p>
                                <ul>
                                    {Array.isArray(order.SelectedTreatments) ? (
                                        order.SelectedTreatments.map((treatment, index) => {
                                            if (typeof treatment === 'object' && treatment !== null && 'name' in treatment) {
                                                return <li key={index}>{treatment.name}</li>;
                                            } else {
                                                console.error('Invalid treatment object:', treatment);
                                                return null;
                                            }
                                        })
                                    ) : (
                                        <li>No treatments available</li>
                                    )}
                                </ul>
                                <div className="button-container">
                                    <button className="appointments-cancel-button" onClick={() => cancelAppointment(order.orderId)}>
                                        Cancel Appointment
                                    </button>
                                    <button className="appointments-edit-button" onClick={() => openEditPopup(order)}>
                                        Edit Appointment
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="scroll-edge right" onMouseDown={() => handleMouseDown('right')} onMouseUp={handleMouseUp} />
                </div>
            )}
            {showEditPopup && <EditPopup order={editOrder} onClose={() => setShowEditPopup(false)} onSubmit={handleEditSubmit} />}
        </div>
    );
};

const EditPopup = ({ order, onClose, onSubmit }) => {
    const [selectedTreatments, setSelectedTreatments] = useState(order.SelectedTreatments.map(t => t.name));
    const [selectedDate, setSelectedDate] = useState(order.selectedDate);

    const treatmentsOptions = [
        { id: "1", name: "Classic Massage" },
        { id: "2", name: "Massage and Scrub" },
        { id: "3", name: "Hot stone massage" },
        { id: "4", name: "Facial Massage" },
        { id: "5", name: "Steam room" }
    ];

    const handleDateChange = (e) => {
        const newDate = new Date(e.target.value);
        if (newDate >= new Date()) {
            setSelectedDate(e.target.value);
        } else {
            alert("Selected date cannot be in the past.");
        }
    };

    const handleTreatmentChange = (treatmentName) => {
        setSelectedTreatments(prev => {
            const index = prev.indexOf(treatmentName);
            if (index > -1) {
                return prev.filter(name => name !== treatmentName);
            } else {
                return [...prev, treatmentName];
            }
        });
    };

    return (
        <div className="edit-popup">
            <h2>Edit Appointment</h2>
            <label>Date:</label>
            <input type="date" value={selectedDate} onChange={handleDateChange} />
            <label>Treatments:</label>
            <div>
                {treatmentsOptions.map(treatment => (
                    <div key={treatment.id}>
                        <input
                            type="checkbox"
                            id={`treatment-${treatment.id}`}
                            checked={selectedTreatments.includes(treatment.name)}
                            onChange={() => handleTreatmentChange(treatment.name)}
                        />
                        <label htmlFor={`treatment-${treatment.id}`}>{treatment.name}</label>
                    </div>
                ))}
            </div>
            <div className="button-container">
                <button onClick={() => onSubmit(order.orderId, selectedDate, selectedTreatments)}>Save Changes</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Appointments;
