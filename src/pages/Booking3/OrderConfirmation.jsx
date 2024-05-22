import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import "../../styles/Booking3/OrderConfirmation.css";

const OrderConfirmation = () => {
    const location = useLocation();
    const { orderNumber } = location.state || {};

    return (
        <div className="order-confirmation-container">
            <div className="order-confirmation-content">
                <h1>Thanks for ordering!</h1>
                <p>Your order is now submitted and your order number is:</p>
                <p className="order-number">{orderNumber}</p>
                <Link to="/" className="home-button">Take a look at our other services</Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
