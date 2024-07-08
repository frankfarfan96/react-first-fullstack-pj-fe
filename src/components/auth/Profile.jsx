import React, { useEffect, useState } from "react";
import { deleteUser, getUserProfile } from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const[user, setUser] = useState({
		id: "",
		email: "",
		firstName: "",
		lastName: "",
		role: [{ id: "", name: "" }]
    });
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

	const userId = localStorage.getItem("userId");
	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUserProfile(userId, token)
                console.log(userData);
				setUser(userData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchUser()
	}, [userId]);

    const handleDeleteAccount = async() => {
        const confirmed = window.confirm("Are you sure want to delete your account? This action cannot be undone.")

        if(confirmed) {
            await deleteUser(userId)
                .then((response) => {
                    setMessage(response.data);

                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("userRole");
                    
                    navigate("/");
                    window.location.reload();
                })
                .catch((error) => {
                    setErrorMessage(error.data);
                })
        }
    }


    return(
        <div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {message && <p className="text-danger">{message}</p>}
            {user ? (
                <div className="card" style={{backgroundColor: "whitesmoke"}}>
                    <div className="card-body">
                        <h4 className="card-title">User Information</h4>

                        <div className="row">
                            <div className="col-md-3">
                                <div className="card mb-3 shadow">
                                    <div className="card-body d-flex align-items-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
												alt="Profile"
												className="rounded-circle"
												style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                                        </div>
                                        <div className="mb-2">
                                            <strong>First Name : </strong> {user.firstName}
                                        </div>
                                        <div className="mb-2">
                                            <strong>Last Name : </strong> {user.lastName}
                                        </div>
                                        <div className="mb-2">
                                            <strong>Email : </strong> {user.email}
                                        </div>
                                        <div className="mb-2">
                                            <strong>Role : </strong> 
                                        </div>
                                        <button className="btn btn-danger" onClick={handleDeleteAccount}>
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>
                    Loading...
                </p>
            )}
        </div>
    )
};

export default Profile;