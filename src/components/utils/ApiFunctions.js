// file to create functions that we interact with our server BE
import axios from "axios";

//create our URL
export const api = axios.create({
    baseURL :"http://localhost:9192"
})

// This function adds a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
    
    const formData = new FormData();
    
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);
   
    const response = await api.post("/rooms/add/new-room", formData);

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
        const result = await api.delete((`/rooms/delete/room/${roomId}`));

        return resuls.data;

    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}
