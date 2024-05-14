import React, { useContext } from 'react';
import Layout from "../../components/layout";
import PaymentForm from "../Booking3/PaymentForm";
import Footer from '../../components/footer';
import BookingSummary from './BookingSummary';
import BookingPath from '../Booking2/BookingPath';
import { SelectedServiceContext } from "../../ServicesContext.js";


function Booking3Page() {
    const {checkedList} = useContext(SelectedServiceContext)
    return (
        <>
            <Layout />
            <BookingPath checkedList={checkedList}/>
            <PaymentForm />
            <BookingSummary />
            <Footer />
        </>
    );
}

export default Booking3Page;