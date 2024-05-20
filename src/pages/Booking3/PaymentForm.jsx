import React, { useState, useContext, useEffect } from 'react';
import BankCard from '../../Pictures/BankCard.png';
import Vipps from '../../Pictures/Vipps.png';
import '../../styles/Booking3/PaymentForm.css';
import "../../styles/BookingButtons.css"
import { database, set, ref } from "../../firebase-config.js";
import { SelectedServiceContext } from "../../ServicesContext.js";
import { useLocation, Link } from "react-router-dom";
import { formatDate } from "../Booking3/BookingSummary.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase-config.js";

const PaymentForm = () => {
    const { selectedDate, totalSum } = useContext(SelectedServiceContext);
    const location = useLocation();
    const { checkedList } = location.state || {};

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        country: '',
        ageConfirm: true,
        paymentMethod: 'credit-card',
        cardNumber: '',
        expiryDate: '',
        securityNumber: '',
        selectedDate: selectedDate,
        totalSum: totalSum
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(app), user => {
            if (user) {
                setFormData({
                    ...formData,
                    firstName: user.displayName ? user.displayName.split(' ')[0] : '',
                    lastName: user.displayName ? user.displayName.split(' ')[1] : '',
                    email: user.email ? user.email : '',
                    telephone: user.phoneNumber ? user.phoneNumber : '',
                });
            }
        });

        return () => unsubscribe();
    }, []);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        let newValue = type === 'checkbox' ? checked : value;  // Change const to let
        
        if (type === 'number') {
            newValue = value.replace(/[^0-9]/g, '');  // Now this reassignment works fine
        }
    
        setFormData(prevState => ({ ...prevState, [name]: newValue }));
    };
    

    const handleFormSubmit = (event) => {
        event.preventDefault();

        //Validates that names are filled
        if (!formData.firstName || !formData.lastName) {
            alert("Please enter your first and last name")
            return;
        }
        // Validate telephone number format
        const telephonePattern = /^\d{8,15}$/;
        if (!telephonePattern.test(formData.telephone)) {
            alert('Please enter a valid telephone number with country code, e.g., +47 555 222 00');
            return;
        }
        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        //Validate the expiryDate 
        const validateExpiryDate = () => {
            const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
            const expiryDate = formData.expiryDate.trim(); // Ensure no extra spaces
        
            if (!expiryDatePattern.test(expiryDate)) {
                alert('Please enter a valid expiry date');
                return false;
            }
        
            return true;
        };
        //Validate the credit card number
        if (formData.paymentMethod === 'credit-card' && formData.cardNumber.length !== 16) {
            alert('Please enter a valid card number.');
            return;
        }
        //Validate the security number
        const isSecurityNumberValid = (securityNumber) => {
            return /^\d{3}$/.test(securityNumber);
        }
        if (formData.paymentMethod === 'credit-card' && !isSecurityNumberValid(formData.securityNumber)) {
            alert('Please enter a valid 3-digit security number.');
            return;
        }
        console.log('Form submitted:', formData);
        saveOrderToDatabase();
        alert("Order successfully submitted!");
    };

    const toggleCardDetails = (event) => {
        const { value } = event.target;
        setFormData({ ...formData, paymentMethod: value });
    };

    const saveOrderToDatabase = () => {
        const orderNumber = generateOrderNumber();
        const newOrderRef = ref(database, `orders/${orderNumber}`);
        set(newOrderRef, {
            OrderDetails: {
                PaymentInformation: formData,
                selectedDate: formatDate(selectedDate),
                SelectedTreatments: checkedList,
                totalSum: totalSum
            },
        })
            .then(() => {
                console.log("Order stored successfully!");
            })
            .catch((error) => {
                console.error("Error in storing order", error);
            });
    };

    const generateOrderNumber = () => {
        return Date.now() + Math.floor(Math.random() * 1000);
    };

    const handleExpiryDateChange = (event) => {
        let { value } = event.target;
    
        // Remove any non-digit characters
        value = value.replace(/\D/g, '');
    
        // Add the slash after the first two digits
        if (value.length >= 3) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
    
        // Ensure the length does not exceed 5 characters (MM/YY)
        if (value.length > 5) {
            value = value.slice(0, 5);
        }
    
        setFormData(prevState => ({ ...prevState, expiryDate: value }));
    };
    

    return (
        <div className="booking3page-content-container">
            <div className="booking3page-personal-header">
                <h3 className='booking3page-personal-header-h3'>Personal information</h3>
            </div>
            <section id="info-form">
                <form onSubmit={handleFormSubmit}>
                    <div className="booking3page-form-group booking3page-row">
                        <div className="booking3page-form-group booking3page-half-width">
                            <label htmlFor="first-name">First name</label>
                            <input type="text" id="first-name" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                        </div>
                        <div className="booking3page-form-group booking3page-half-width">
                            <label htmlFor="last-name">Last name</label>
                            <input type="text" id="last-name" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="booking3page-form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder='info@email.com' required />
                    </div>
                    <div className="booking3page-form-group booking3page-row">
                        <div className="booking3page-form-group booking3page-half-width">
                            <label htmlFor="telephone">Telephone number</label>
                            <input type="number" id="telephone" name="telephone" value={formData.telephone} onChange={handleInputChange} placeholder="55522200" pattern="^\d{8,15}$" required />
                        </div>
                        <div className="booking3page-form-group booking3page-half-width">
                            <label htmlFor="country">Country</label>
                            <select id="country" name="country" value={formData.country} onChange={handleInputChange} required>
                                <option value=""></option>
                                <option value="NO">Norway</option>
                                <option value="SE">Sweden</option>
                                <option value="DK">Denmark</option>
                                <option value="FI">Finland</option>
                            </select>
                        </div>
                    </div>
                    <div className="booking3page-checkbox-container">
                        <input type="checkbox" id="ageConfirm" name="ageConfirm" checked={formData.ageConfirm} onChange={handleInputChange} />
                        <label htmlFor="ageConfirm" className="booking3page-checkbox-label">I confirm that I am 16 years of age or older</label>
                    </div>

                    <label htmlFor="payment-method" className="booking3page-form-label">Payment</label>
                    <div className="booking3page-payment-section">
                        <div className="booking3page-payment-option">
                            <input type="radio" id="credit-card" name="paymentMethod" value="credit-card" checked={formData.paymentMethod === 'credit-card'} onChange={toggleCardDetails} />
                            <img src={BankCard} alt="Credit/Debit card" />
                            <label htmlFor="credit-card">Credit/Debit card</label>
                        </div>
                        {formData.paymentMethod === 'credit-card' && (
                            <div className="booking3page-card-details">
                                <label htmlFor="card-number">Card number</label>
                                <input type="number" id="card-number" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder='Enter 16-digit card number' required />
                                <div className="booking3page-expiry-and-security">
                                    <div>
                                    <label htmlFor="expiry-date">Expiry date (MM/YY)</label>
                                        <input type="text" id="expiry-date" name="expiryDate" value={formData.expiryDate} onChange={handleExpiryDateChange} placeholder="MM/YY" pattern="^(0[1-9]|1[0-2])\/\d{2}$" required />
                                    </div>
                                    <div>
                                        <label htmlFor="security-number">Security number</label>
                                        <input type="number" id="security-number" name="securityNumber" value={formData.securityNumber} onChange={handleInputChange} placeholder='3-digit security number' required />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="booking3page-payment-option">
                            <input type="radio" id="vipps" name="paymentMethod" value="vipps" checked={formData.paymentMethod === 'vipps'} onChange={toggleCardDetails} />
                            <label htmlFor="vipps"> <img src={Vipps} alt="Vipps" /></label>
                        </div>
                    </div>
                </form>
            </section>
            <div className="booking3page-buttons">
                <Link to="/" className="booking3page-back-button" >Back
                </Link>
                <button type="submit" className="booking3page-submit-button" onClick={handleFormSubmit}>Submit</button></div>       
                </div>
    );
};

export default PaymentForm;
