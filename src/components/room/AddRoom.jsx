import React, { useState } from "react";
import { addRoom } from "../utils/ApiFunctions";

const AddRoom = () => {
    const[newRoo, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });

    const[imagePreview, setImagePreview] = useState("");
    const[successMessage,setSuccessMessage] = useState("");
    const[errorMessage, setErrorMessage] = useState("");

    // Function to handle input change in our form
    const handleRoomInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if(name === "roomPrice") {
            
            if(!isNaN(value)) {
                value.parseInt(value);
            } else {
            value = "";
            }
        }

        setNewRoom({...newRoom, [name]: value, })
    }

    // Function to handle input photo in our form
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({...newRoom, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    // Function to handle our submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
            if(success !== undefined) {
                setSuccessMessage("A new room was added to the database");
                // Clean fetched data
                setNewRoom({photo: null, roomType: "", roomPrice: ""});
                setImagePreview("");
                setErrorMessage("");
            } else {
                setErrorMessage("Error adding room");
            }

        } catch(error) {
            setErrorMessage(error.message);

        }
    }

    return (
        <div>

        </div>
    )
}

export default AddRoom;