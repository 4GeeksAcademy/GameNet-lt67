import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
    Heart, Trash2, ArrowLeft, PlusCircle,
    Home, User, Gamepad2, Hash, BookmarkCheck
} from 'lucide-react';

function GameFavoriteList() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [gameFavorites, setGameFavorites] = useState([]);

    async function getGameFavorites() {
        if (!userId) return;
        try {
            
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/favorites/${userId}`);

            if (response.ok) {
                const data = await response.json();
                setGameFavorites(data);
            } else if (response.status === 404) {
                console.error("Endpoint no encontrado. Revisa routes.py");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    }

    useEffect(() => {
        getGameFavorites();
    }, [userId]);

    function deleteGameFavorites(favoriteId) {
        if (!window.confirm("Remove this title from user's collection?")) return;

        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/favorites/${userId}/${favoriteId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                getGameFavorites();
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">


                {/* Header Section */}
                <div className="d-flex align-items-center justify-content-between mb-5 px-3">
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={() => navigate("/admin")} className="btn-back-control border-0 bg-transparent">
                            <ArrowLeft size={28} className="text-white opacity-75 hover-opacity-100" />
                        </button>
                        <div>
                            <h2 className="brand-title h3 mb-0 text-white fw-bold" style={{ letterSpacing: '1px' }}>USER VAULT</h2>
                            <p className="text-pink small fw-bold mb-0 d-flex align-items-center gap-2">
                                <BookmarkCheck size={14} /> SECURITY CLEARANCE: USER #{userId}
                            </p>
                        </div>
                    </div>

                    <div className="d-flex gap-3">
                        {/* Botón Add Favorite: Texto Blanco forzado */}
                        <button className="btn-neon-action pink-variant d-flex align-items-center gap-2 px-4 py-2"
                            onClick={() => navigate('/game/favorites')}>
                            <PlusCircle size={18} />
                            <span className="text-white fw-bold">Add Favorite</span>
                        </button>

                        {/* Botón Home: Texto Blanco forzado */}
                        <button className="btn-neon-action gray-variant d-flex align-items-center gap-2 px-3 py-2"
                            onClick={() => navigate('/')}>
                            <Home size={18} />
                            <span className="text-white fw-bold">Home</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Table */}
                <div className="admin-table-wrapper border border-pink rounded-4 overflow-hidden shadow-lg">
                    <table className="table table-dark table-hover mb-0 align-middle">
                        <thead className="bg-black border-bottom border-pink">
                            <tr>
                                <th className="p-4 text-pink small fw-bold"><Hash size={14} /> ID</th>
                                <th className="p-4 text-pink small fw-bold"><User size={14} /> ACCOUNT</th>
                                <th className="p-4 text-pink small fw-bold"><Gamepad2 size={14} /> GAME TITLE</th>
                                <th className="p-4 text-pink small fw-bold text-center">MANAGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gameFavorites.length > 0 ? (
                                gameFavorites.map((fav) => (
                                    <tr key={fav.id} className="admin-table-row">
                                        <td className="p-4 fw-mono text-secondary">#{fav.id}</td>
                                        <td className="p-4 text-white">
                                            {fav.user_name}
                                        </td>
                                        <td className="p-4">
                                            <div className="d-flex align-items-center gap-2">
                                                <Heart size={14} className="text-pink" fill="#ec4899" />
                                                <span className="text-info fw-bold">{fav.game_name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                className="btn-action btn-delete"
                                                onClick={() => deleteGameFavorites(fav.id)}
                                                title="Remove from favorites"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-5">
                                        <Heart size={48} className="text-secondary opacity-25 mb-3" />
                                        <p className="text-secondary">This user's vault is currently empty.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default GameFavoriteList;