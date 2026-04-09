import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ConsoleFavorites() {
    const navigate = useNavigate()

    const [userId, setUserId] = useState(0)
    const [consoleId, setConsoleId] = useState(0)
    const [userList, setUserList] = useState([])
    const [consoleList, setConsoleList] = useState([])

    function getUsers() {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/")
            .then(response => response.json())
            .then(data => {
                setUserList(data)

            })
            .catch((error) => console.log(error))
    }

    function getConsoles() {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/console/")
            .then(response => response.json())
            .then(data => {
                setConsoleList(data)

            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getConsoles()
        getUsers()
    }, [])

    function sendData(e) {
        e.preventDefault()
        if (userId === "" || consoleId === "") {
            alert("Please select a user and console");
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

       fetch(`${import.meta.env.VITE_BACKEND_URL}/api/console/favorites/${userId}/${consoleId}`, requestOptions)
        .then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                alert(data.error || "Algo salió mal");
                throw new Error(data.error);
            }
            return data;
        })
        .then((result) => {
            console.log("Success:", result);
            navigate("/console/favorites");
        })
        .catch((error) => console.error("Error:", error));
    }

    return (
        <div>
            <h1 className="">Associate a console to user</h1>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label className="form-label">Select User</label>
                    <select
                        className="form-select"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    >
                        <option value="">Choose a user...</option>
                        {userList.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.nickname}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Select Console</label>
                    <select 
                        className="form-select" 
                        value={consoleId} 
                        onChange={(e) => setConsoleId(e.target.value)}
                    >
                        <option value="">Choose a console...</option>
                        {consoleList.map((console) => (
                            <option key={console.id} value={console.id}>
                                {console.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Associate</button>
            </form>
            <button onClick={() => navigate("/")} className="btn btn-primary">Back home</button>
        </div>
    )
}

export default ConsoleFavorites