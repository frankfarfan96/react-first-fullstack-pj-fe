import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({booking, payment, isFormValid, onConfirm}) => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const numOfDays = checkOutDate.diff(checkInDate, "days");
    const[isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const[isProccessingPayment, setIsProccessingPayment] = useState(false);

    const navigate = useNavigate();

    const handleConfirmBooking = () => {
        setIsProccessingPayment(true);
        setTimeout(() => {
            setIsProccessingPayment(false);
            setIsBookingConfirmed(true);
            onConfirm();
        }, 3000)
    };

    useEffect(() => {
        if(isBookingConfirmed) {
            navigate("/booking-success");
        }
    }, [isBookingConfirmed, navigate])


    return (
        <div className="row">
            <div className="col-md-6"></div>
            <div className="card card-body mt-5">
                <h4 className="card-title hotel-color">Reservation Summary</h4>

                <p>FullName : <strong>{booking.guestFullName}</strong></p>
                <p>Email : <strong>{booking.guestEmail}</strong></p>
                <p>Check-In Date : <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong></p>
                <p>Check-Out Date : <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong></p>
                <p>Number of Days : <strong>{numOfDays}</strong></p>

                <div>
                    <h5 className="hotel-color">Number of Guest</h5>
                    <strong>
                        Adult{booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}
                    </strong>
                    <strong>
                        <p>Children : {booking.numOfChildren}</p>
                    </strong>
                </div>

                {payment > 0 ? (
                    <>
                    <p>Total Payment : <strong>${payment}</strong></p>


                    {isFormValid && !isBookingConfirmed ? (
                        <Button
                        variant="success" onClick={handleConfirmBooking}>
                            {isProccessingPayment ? (
                                <>
                                    <span className="spinner-border spinner-border-sm mr-2"
                                            role="status"
                                            aria-hidden="true"></span>
                                    Booking Confirmed, redirecting to payment ...
                                </>
                            ) : (
                                "Confirm Booking and proceed to payment"
                            )}
                        </Button>
                    ) : isBookingConfirmed ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading</span>
                            </div>
                        </div>
                    ) : null}
                    </>
                ) : (
                    <p className="text-danger">
                        Check-out date must be after check-in date
                    </p>
                )}

            </div>
        </div>

    )
}

export default BookingSummary;