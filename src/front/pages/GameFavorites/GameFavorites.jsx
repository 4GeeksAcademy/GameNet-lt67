import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Heart, User, Gamepad2, ArrowLeft,
    PlusCircle, Star, Database
} from 'lucide-react';

function GameFavorites() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [gameId, setGameId] = useState("");
    const [userList, setUserList] = useState([]);
    const [gameList, setGameList] = useState([]);

    function getUsers() {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/")
            .then(response => response.json())
            .then(data => setUserList(data))
            .catch((error) => console.log(error));
    }

    function getGames() {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/")
            .then(response => response.json())
            .then(data => setGameList(data))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getUsers();
        getGames();
    }, []);

    function sendData(e) {
        e.preventDefault();
        if (userId === "" || gameId === "") {
            alert("Please select both a user and a game");
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/favorites/${userId}/${gameId}`, requestOptions)
            .then(async (response) => response.json())
            .then((result) => navigate(-1))
            .catch((error) => console.error("Error detallado:", error));
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
                        <h2 className="brand-title h3 mb-0">FAVORITES MANAGER</h2>
                        <p className="text-pink small fw-bold mb-0">Link Titles to User Collections</p>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="admin-card-wrapper p-4 border border-pink rounded-4 shadow-lg bg-dark-soft">
                            <form onSubmit={sendData}>
                                <div className="text-center mb-4">
                                    <div className="icon-favorite-circle mx-auto mb-2">
                                        <Heart size={30} fill="#ec4899" className="text-pink" />
                                    </div>
                                    <h5 className="text-white fw-bold">Add to Favorites</h5>
                                </div>

                                {/* Select User */}
                                <div className="mb-4">
                                    <label className="form-label text-pink small fw-bold d-flex align-items-center gap-2">
                                        <User size={14} /> TARGET USER
                                    </label>
                                    <select
                                        className="form-select custom-input-dark-pink"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                    >
                                        <option value="">Select account...</option>
                                        {userList.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.nickname} (ID: {user.id})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4 text-center">
                                    <Star size={18} className="text-secondary opacity-25" />
                                </div>

                                {/* Select Game */}
                                <div className="mb-4">
                                    <label className="form-label text-pink small fw-bold d-flex align-items-center gap-2">
                                        <Gamepad2 size={14} /> SELECT GAME TITLE
                                    </label>
                                    <select
                                        className="form-select custom-input-dark-pink"
                                        value={gameId}
                                        onChange={(e) => setGameId(e.target.value)}
                                    >
                                        <option value="">Search game titles...</option>
                                        {gameList.map((game) => (
                                            <option key={game.id} value={game.id}>
                                                {game.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button type="submit" className="btn-pink-action w-100 py-3 d-flex align-items-center justify-content-center gap-2">
                                    <PlusCircle size={18} /> CONFIRM FAVORITE
                                </button>
                            </form>
                        </div>

                        <div className="text-center mt-4">
                            <button onClick={() => navigate("/admin")} className="btn-back-home text-secondary small text-decoration-none bg-transparent border-0">
                                <Database size={14} className="me-1" /> RETURN TO DATABASE CORE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameFavorites