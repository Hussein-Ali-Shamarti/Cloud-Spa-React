import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, query, orderByChild, equalTo, get, set } from "firebase/database";
import '../../styles/AppointmentTab.css';

const AppointmentTab = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async (userEmail) => {
            const database = getDatabase();
            const appointmentsRef = query(ref(database, 'appointments'), orderByChild('email'), equalTo(userEmail));
            const snapshot = await get(appointmentsRef);
            if (snapshot.exists()) {
                const appointmentsData = [];
                snapshot.forEach(childSnapshot => {
                    appointmentsData.push({ id: childSnapshot.key, ...childSnapshot.val() });
                });
                setAppointments(appointmentsData);
            }
        };

        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            if (user) {
                fetchAppointments(user.email);
            } else {
                window.location.href = '/login';
            }
        });
    }, []);

    const cancelAppointment = async (appointmentId) => {
        const database = getDatabase();
        const appointmentRef = ref(database, `appointments/${appointmentId}`);
        await set(appointmentRef, null);
        setAppointments(prev => prev.filter(appointment => appointment.id !== appointmentId));
    };

    const changeDate = async (appointmentId) => {
        const newDate = prompt('Enter new date (YYYY-MM-DD):');
        if (newDate) {
            const database = getDatabase();
            const appointmentRef = ref(database, `appointments/${appointmentId}/date`);
            await set(appointmentRef, newDate);
            setAppointments(prev => prev.map(appointment => 
                appointment.id === appointmentId ? { ...appointment, date: newDate } : appointment
            ));
        }
    };

    return (
        <div className="container">
            <div className="tabs">
                <a onClick={() => setTab(0)} className={tab === 0 ? "active" : ""}>Appointments</a>
                <a onClick={() => setTab(1)} className={tab === 1 ? "active" : ""}>Profile</a>
                <a onClick={() => setTab(2)} className={tab === 2 ? "active" : ""}>History</a>
            </div>
            <h2>Upcoming Appointments:</h2>
            <div className="appointments" id="appointments">
                {appointments.map(appointment => (
                    <div key={appointment.id} className="appointment-card">
                        <h3>Appointment {appointment.date}:</h3>
                        <p>OrderNr: {appointment.orderNr}</p>
                        <p>Date: {appointment.date}</p>
                        <p>Time: {appointment.time}</p>
                        <p>Customer Name: {appointment.customerName}</p>
                        <p>Order Details:</p>
                        <ul>
                            {appointment.orderDetails.map((detail, index) => (
                                <li key={index}>{detail}</li>
                            ))}
                        </ul>
                        <div className="button-group">
                            <button className="cancel" onClick={() => cancelAppointment(appointment.id)}>Cancel appointment</button>
                            <button className="change" onClick={() => changeDate(appointment.id)}>Change date</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppointmentTab;
