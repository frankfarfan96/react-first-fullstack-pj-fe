import React, { useState } from "react"; 
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions"; 

const FindBooking = () => {
    const[confirmationCode, setConfirmationCode] = useState("");
    const[error, setError] = useState("");
    const[isLoading, setIsLoading] = useState(false);
    const[bookingInfo, setBookingInfo] = useState({
        id: "",
        room: {id: ""},
        bookingConfirmationCode: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumGuest: ""
    });

    const [isDeleted, setIsDeleted] = useState(false);
    
    const clearBookingInfo = {
        id: "",
        room: {id: ""},
        bookingConfirmationCode: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumGuest: ""
    }

    const handleInputChange = (e) => {
        setConfirmationCode(e.target.value);
    }

    const handlFormSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await getBookingByConfirmationCode(confirmationCode);
            setBookingInfo(data);
            setError(null);
        
        } catch (error) {
            setBookingInfo(clearBookingInfo);

            if(error.respone && error.respone.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message);
            }           
        }
        setTimeout(() => setIsLoading(false), 2000)
    }

    const handleBookingCancellation = async(bookingId) => {
        try {
            await cancelBooking(bookingInfo.id);
            setIsDeleted(true);
            setBookingInfo(clearBookingInfo);
            setConfirmationCode("");
            setError("");
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                <h2>Find My Booking</h2>
                <form onSubmit={handlFormSubmit} className="col-md-6">
                    <div className="input-group mb-3">
                        <input 
                            className="form-control"
                            type="text"
                            id="confirmationCode"
                            name="confirmationCode"
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder="Enter the booking confermation code"
                            />
                            <button className="btn btn-hotel input-group-text">Find booking</button>
                    </div>
                </form>

                {isLoading ? ( 
                <div>Finding your booking ...</div>
                 ) : error ? (<div className="text-danger">Error : {error}</div>) :
                 bookingInfo.bookingConfirmationCode ? (
                    <div className="col-md-6 mt-4 mb-5">
                        <h3>Booking Information</h3>
                        <p>Booking Confirmation Code : {bookingInfo.bookingConfirmationCode}</p>
                        <p>Booking ID : {bookingInfo.id}</p>
                        <p>Room Number : {bookingInfo.room.id}</p>
                        <p>Check-in Date : {bookingInfo.checkInDate}</p>
                        <p>Check-out Date : {bookingInfo.checkOutDate}</p>
                        <p>Full Name : {bookingInfo.guestFullName}</p>
                        <p>Email Address : {bookingInfo.guestEmail}</p>
                        <p>Adults : {bookingInfo.numOfAdults}</p>
                        <p>Children : {bookingInfo.numOfChildren}</p>
                        <p>Total Guest : {bookingInfo.totalNumGuest}</p>
                        
                        {!isDeleted && (
                            <button 
                                className="btn btn-danger"
                                onClick={()=>handleBookingCancellation(bookingInfo.id)}>
                                Cancel Booking
                            </button>
                        )}

                    </div>
                 ) : (
                    <div>
                        find bookiing ...
                    </div>
                 )}

                {isDeleted && (
                    <div className="alert alert-success mt-3" role="alert"> Booking has been cancelled successfully! </div>
                )}
            </div>
        </>
    );
}

export default FindBooking;