// file to create functions that we interact with our server BE
import axios from "axios";
import { jwtDecode } from "jwt-decode";

//create our URL
export const api = axios.create({
    baseURL :"http://localhost:9192"
})


export const getHeader = () => {
    const token = localStorage.getItem("token");

    return {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json" 
    }
}

// This function adds a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
    
    const formData = new FormData();
    
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);
   
    const response = await api.post("/rooms/add/new-room", formData, {
        headers : getHeader()
    });

    if(response.status === 201) {
        return true;
    } else {
        return false;
    }

}

// This function is for popolete the select control with all the room types we have in our Db
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types");
        
        return response.data;
    } catch(error) {
        throw new Error("Error fetching room types");
    }
}

// This funtion gets all rooms from the DB
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms");
        return result.data;

    } catch(error) {
        throw new Error("Error fetching rooms");
    }
    
}


// This function delete a room by id
export async function deleteRoom(roomId) {
    try {
        const result = await api.delete((`/rooms/delete/room/${roomId}`), {
            headers : getHeader()
        }); 

        return result.data;

    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}

// Function to update the room
export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);

    const response = await api.put(`/rooms/update/${roomId}`, formData, {
        headers : getHeader()
    });

    return response;
}

// This function gets a room by the id 
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`);
        
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`);
    }
}

// This function saves a new booking to the database
export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking);
        
        return response.data;
    } catch (error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`Error booking room : ${error.message}`);
        }
    }
}

// This function gets all bookings from the database
export async function getAllBookings() {
    try {

        const result = await api.get("/bookings/all-bookings");

        return result.data;
    } catch (error) {
        throw new Error(`Error fetching bookings : ${error.message}`);
    }
}

// This function get booking by the confirmation code
export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`);

        return result.data;
    } catch (error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`Error finding booking : ${error.message}`);
        }
    }
}

// This function cancels booking
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`, formData, {
            headers : getHeader()
        });

        return result.data;
    } catch (error) {
        throw new Error(`Error cancelling booking : ${error.message}`);
    }
}

// This function get all available rooms from the DB with a given date and room type
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) { 
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
	)
    console.log(result)
	return result

}


// This function is for registration
export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration)
        
        return response.data;
    } catch (error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`User registration error : ${error.message}`);
        }
    }

} 

// This function is for login user
export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login);

        if(response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
        return response.data;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
} 


export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers : getHeader()
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`, {
            headers : getHeader()
        })

        return response.data;
    } catch (error) {
        return error.message;
    }
}

// This is the function to get user bookings by the user id 
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}