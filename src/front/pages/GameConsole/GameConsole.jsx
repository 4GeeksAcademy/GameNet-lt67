import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GameConsole() {
    const navigate = useNavigate()

    const [gameId, setGameId] = useState(0)
    const [consoleId, setConsoleId] = useState(0)
    const [gameList, setGameList] = useState([])
    const [consoleList, setConsoleList] = useState([])

    function getGames() {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/")
            .then(response => response.json())
            .then(data => {
                setGameList(data)

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
        getGames()
    }, [])

    function sendData(e) {
        e.preventDefault()
        if (gameId === "" || consoleId === "") {
            alert("Please select a game and console");
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

       fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gameconsole/${gameId}/${consoleId}`, requestOptions)
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
            navigate("/gameconsole");
        })
        .catch((error) => console.error("Error:", error));
    }

    return (
        <div>
            <h1 className="">Associate a game to console</h1>
            <form className="w-50 mx-auto" onSubmit={sendData}>
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

export default GameConsole