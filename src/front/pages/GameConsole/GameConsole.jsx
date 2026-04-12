import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Link as LinkIcon, Gamepad2, Monitor, 
    ArrowLeft, PlusCircle, Cpu, Layers 
} from 'lucide-react';

function GameConsole() {
    const navigate = useNavigate();
    const [gameId, setGameId] = useState("");
    const [consoleId, setConsoleId] = useState("");
    const [gameList, setGameList] = useState([]);
    const [consoleList, setConsoleList] = useState([]);

    function getGames() {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/")
            .then(response => response.json())
            .then(data => setGameList(data))
            .catch((error) => console.log(error));
    }

    function getConsoles() {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/console/")
            .then(response => response.json())
            .then(data => setConsoleList(data))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getConsoles();
        getGames();
    }, []);

    function sendData(e) {
        e.preventDefault();
        if (gameId === "" || consoleId === "") {
            alert("Please select both a game and a console");
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gameconsole/${gameId}/${consoleId}`, requestOptions)
            .then(async (response) => {
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || "Linking failed");
                return data;
            })
            .then(() => {
                navigate("/gameconsole");
            })
            .catch((error) => alert(error.message));
    }

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                
                {/* Header */}
                <div className="d-flex align-items-center gap-3 mb-5">
                    <button onClick={() => navigate("/admin")} className="btn-back-home border-0 bg-transparent text-secondary">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h2 className="brand-title h3 mb-0">CROSS-LINK TERMINAL</h2>
                        <p className="text-purple small fw-bold mb-0">Associate Assets to Platforms</p>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="admin-card-wrapper p-4 border border-purple rounded-4 shadow-lg bg-dark-soft">
                            <form onSubmit={sendData}>
                                <div className="text-center mb-4">
                                    <div className="icon-link-circle mx-auto mb-2">
                                        <LinkIcon size={30} className="text-purple" />
                                    </div>
                                    <h5 className="text-white fw-bold">Link New Connection</h5>
                                </div>

                                {/* Select Game */}
                                <div className="mb-4">
                                    <label className="form-label text-purple small fw-bold d-flex align-items-center gap-2">
                                        <Gamepad2 size={14} /> SELECT GAME MODULE
                                    </label>
                                    <select
                                        className="form-select custom-input-dark"
                                        value={gameId}
                                        onChange={(e) => setGameId(e.target.value)}
                                    >
                                        <option value="">Search game in database...</option>
                                        {gameList.map((game) => (
                                            <option key={game.id} value={game.id}>
                                                {game.name} (ID: {game.id})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Select Console */}
                                <div className="mb-4 text-center">
                                    <Layers size={20} className="text-secondary opacity-25" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-purple small fw-bold d-flex align-items-center gap-2">
                                        <Monitor size={14} /> TARGET CONSOLE PLATFORM
                                    </label>
                                    <select 
                                        className="form-select custom-input-dark" 
                                        value={consoleId} 
                                        onChange={(e) => setConsoleId(e.target.value)}
                                    >
                                        <option value="">Search console in hardware...</option>
                                        {consoleList.map((console) => (
                                            <option key={console.id} value={console.id}>
                                                {console.name} (ID: {console.id})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button type="submit" className="btn-link-action w-100 py-3 d-flex align-items-center justify-content-center gap-2">
                                    <PlusCircle size={18} /> INITIALIZE ASSOCIATION
                                </button>
                            </form>
                        </div>

                        <div className="text-center mt-4">
                            <button onClick={() => navigate("/")} className="btn-back-home text-secondary small text-decoration-none bg-transparent border-0">
                                EXIT TO CORE FEED
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameConsole;