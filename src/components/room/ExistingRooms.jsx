import React from "react";
import { useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { useEffect } from "react";
import { Col } from "react-bootstrap";
import RoomPaginator from "../common/RoomPaginator";

const ExistingRooms = () => {
    //variables
    const[rooms, setRooms] = useState([]); 
    const[currentPage, setCurrentPage] = useState(1);
    const[roomsPerPage] = useState(8);
    const[isLoading, setIsLoading] = useState(false);
    const[filteredRooms, setFilteredRooms] = useState([]);
    const[selectedRoomType, setSelectedRoomType] = useState("");
    const[successMessage, setSuccessMessage] = useState("");
    const[errorMessage, setErrorMessage] = useState("");
    

    //functions
    useEffect(() => {
        fetchRooms();
    }, [])
    
    const fetchRooms = async() => {
        setIsLoading(true);

        try {
            const result = await getAllRooms();
            setRooms(result);
            setIsLoading(false);
        } catch (error) {
        setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        if(selectedRoomType === "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    }, [rooms, selectedRoomType]);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalRooms / roomsPerPage);
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    return (
        <>
        {isLoading ? (
            <p>Loading existing rooms...</p>
        ) : (
            <>
            <section className="mt-5 mb-5 container">
                <div className="d-flex justify-content-center mb-3 mt-5">
                    <h2>Existing rooms</h2>
                </div>
                <Col md={6} className="mb-3 mb-bd-0">
                    <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                </Col>

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Room Type</th>
                            <th>Room Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRooms.map((room)=>(
                            <tr key={room.id} className="text-center">
                                <td>{room.roomType}</td>
                                <td>{room.roomPrice}</td>
                                <td>
                                    <butto>View / Edit</butto>
                                    <butto>Delete</butto>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <RoomPaginator 
                    currentPage={currentPage}
                    totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                    onPageChange={handlePaginationClick}
                />
            </section>
            </>
        )}
        </>
    )

}

export default ExistingRooms;