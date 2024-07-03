import React, { useEffect, useState } from "react";
import { cancelBooking, getAllBookings } from "../utils/ApiFunctions";
import Header from "../common/Header";
import BookingsTable from "./BookingsTable";

const Bookings = () => {
    const[bookingInfo, setBookingInfo] = useState([]);
    const[isLoading, setIsLoading] = useState(true);
    const[error, setError] = useState("");

    useEffect(() => {
        setTimeout(() => {
            getAllBookings().then((data) => {
                console.log(data);
                setBookingInfo(data);
                setIsLoading(false);
            }).catch((error) => {
                setError(error.messsage);
                setIsLoading(false);
            })
        }, 1000)
    }, []);

    const handleBookingCancellation = async(bookingId) => {
        try {
            await cancelBooking(bookingId);
            const data = await getAllBookings();
            setBookingInfo(data);

        } catch (error) {
            setError(error.messsage);
        }
    }

    return(
    <section style={{backgroundColor: "whitesmoke"}}>
        <Header title={"Existing Bookings"}/>
        {error && (<div className="text-danger">{error}</div>)}
        {isLoading ? (<p>
            Loading existing bookings
        </p>) : (
            <BookingsTable 
                bookingInfo={bookingInfo} 
                handleBookingCancellation={handleBookingCancellation} />
        )}
    </section>
    )

}

export default Bookings;