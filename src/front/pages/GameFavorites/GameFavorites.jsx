import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GameFavorites() {
    const navigate = useNavigate()

    const [userId, setUserId] = useState(0)
    const [gameId, setGameId] = useState(0)
    const [userList, setUserList] = useState([])
    const [gameList, setGameList] = useState([])

    function getUsers() {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/")
            .then(response => response.json())
            .then(data => {
                setUserList(data)

            })
            .catch((error) => console.log(error))
    }

    function getGames() {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/")
            .then(response => response.json())
            .then(data => {
                setGameList(data)

            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getUsers()
        getGames()
    }, [])

    function sendData(e) {
        e.preventDefault()
        if (userId === "" || gameId === "") {
            alert("Please select a user and console");
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

       fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/favorites/${userId}/${gameId}`, requestOptions)
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
            navigate("/game/favorites");
        })
        .catch((error) => console.error("Error:", error));
    }

    return (
        <div>
            <h1 className="">Associate a game to user</h1>
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
                    <label className="form-label">Select Game</label>
                    <select 
                        className="form-select" 
                        value={gameId} 
                        onChange={(e) => setGameId(e.target.value)}
                    >
                        <option value="">Choose a game...</option>
                        {gameList.map((game) => (
                            <option key={game.id} value={game.id}>
                                {game.name}
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

export default GameFavorites