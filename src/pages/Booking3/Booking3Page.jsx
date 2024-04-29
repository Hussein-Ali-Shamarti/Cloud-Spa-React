import React from 'react';
import Layout from "../../components/layout";
import PaymentForm from "../Booking3/PaymentForm";
import Footer from '../../components/footer';
import BookingSummary from './BookingSummary';
import BookingPath from '../Booking2/BookingPath';

function Booking3Page() {

    return (
        <>
            <Layout />
            <BookingPath />
            <PaymentForm />
            <Footer />
        </>
    );
}

export default Booking3Page;