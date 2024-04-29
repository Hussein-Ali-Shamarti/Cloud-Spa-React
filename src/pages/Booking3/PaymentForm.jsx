import React, { useState } from 'react';
import BankCard from '../../Pictures/BankCard.png';
import Vipps from '../../Pictures/Vipps.png';
import '../../styles/Booking3/PaymentForm.css';

const PaymentForm = () => {
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
        securityNumber: ''
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    }

    const toggleCardDetails = (event) => {
        const { value } = event.target;
        setFormData({ ...formData, paymentMethod: value });
    }

    return (
        <div className="booking3page-content-container">
            <div className="booking3page-personal-header">
                <h3>Personal information</h3>
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
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="booking3page-form-group booking3page-row">
                        <div className="booking3page-form-group booking3page-half-width">
                            <label htmlFor="telephone">Telephone number</label>
                            <input type="tel" id="telephone" name="telephone" value={formData.telephone} onChange={handleInputChange} required />
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

                    {/* Payment section */}
                    <label htmlFor="payment-method" className="booking3page-form-label">Payment</label>
                    <div className="booking3page-payment-section">
                        <div className="booking3page-payment-option">
                            <input type="radio" id="credit-card" name="paymentMethod" value="credit-card" checked={formData.paymentMethod === 'credit-card'} onChange={toggleCardDetails} />
                            <img src={BankCard} />
                            <label htmlFor="credit-card">Credit/Debit card</label>
                        </div>
                        {formData.paymentMethod === 'credit-card' && (
                            <div className="booking3page-card-details">
                                <label htmlFor="card-number">Card number</label>
                                <input type="text" id="card-number" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
                                <div className="booking3page-expiry-and-security">
                                    <div>
                                        <label htmlFor="expiry-date">Expiry date</label>
                                        <input type="text" id="expiry-date" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required />
                                    </div>
                                    <div>
                                        <label htmlFor="security-number">Security number</label>
                                        <input type="text" id="security-number" name="securityNumber" value={formData.securityNumber} onChange={handleInputChange} required />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="booking3page-payment-option">
                            <input type="radio" id="vipps" name="paymentMethod" value="vipps" checked={formData.paymentMethod === 'vipps'} onChange={toggleCardDetails} />
                            <label htmlFor="vipps"> <img src={Vipps} /></label>
                        </div>
                    </div>
                </form>
            </section>
            <div className="booking3page-buttons">
                        <a href="/" className="booking3page-back-button">Back</a>
                        <button type="submit" className="booking3page-submit-button">Submit</button>
                    </div>
        </div>
        
        
    );
}

export default PaymentForm;
