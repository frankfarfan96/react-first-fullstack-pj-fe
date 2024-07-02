import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
    return(
        <section className="container mt-5">
            <h2>Welcome to Admin Panel</h2>
            <hr />
            <Link to={"/add-room"}>
                Add Rooms
            </Link>
            <hr />
            <Link to={"/existing-rooms"}>
                Manage Rooms 2
            </Link>
            <hr />
            <Link to={"/existing-bookings"}>
                Manage Bookings
            </Link>
        </section>
    )
}

export default Admin;