import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Añadimos Link
import { Trash2, Gamepad2, ArrowLeft, ExternalLink } from 'lucide-react';
import useGlobalReducer from "../../hooks/useGlobalReducer";

function MyGames() {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const [gameFavorites, setGameFavorites] = useState([]);
    const userId = store.user?.id;

    const getGameFavorites = async () => {
        if (!userId) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/favorites/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setGameFavorites(data);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    useEffect(() => {
        getGameFavorites();
    }, [userId]);

    const deleteGameFavorite = async (favoriteId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/favorites/${userId}/${favoriteId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setGameFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-5 mb-5 p-4 favorites-container shadow-lg">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="m-0 d-flex align-items-center gap-3 text-white">
                    <div className="logo-box" style={{width: '40px', height: '40px', fontSize: '20px'}}>
                        <span className="logo-letter">G</span>
                    </div>
                    My Favorites
                </h2>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate('/')}>
                    <ArrowLeft size={16} /> Back
                </button>
            </div>

            {/* Grid de Juegos */}
            <div className="row">
                {gameFavorites.length > 0 ? (
                    gameFavorites.map((fav) => (
                        <div key={fav.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card game-card-custom h-100 shadow-sm overflow-hidden">
                                
                                {/* Imagen del Juego con Link */}
                                <Link to={"/game/details/" + fav.game_id} className="text-decoration-none">
                                    <div className="position-relative">
                                        <img 
                                            src={fav.game_image || "https://via.placeholder.com/400x200?text=No+Image"} 
                                            className="card-img-top" 
                                            alt={fav.game_name}
                                            style={{ height: "180px", objectFit: "cover" }}
                                        />
                                        <div className="image-overlay-info d-flex align-items-center justify-content-center">
                                            <ExternalLink size={24} color="white" />
                                        </div>
                                    </div>
                                </Link>

                                <div className="card-body d-flex flex-column justify-content-between p-3 bg-dark">
                                    <Link to={"/game/details/" + fav.game_id} className="text-decoration-none">
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <Gamepad2 className="text-primary" size={18} />
                                            <h5 className="game-title m-0 text-white">{fav.game_name}</h5>
                                        </div>
                                        <p className="text-secondary small mb-3">View game details</p>
                                    </Link>
                                    
                                    <button 
                                        className="btn btn-remove w-100 d-flex align-items-center justify-content-center gap-2"
                                        onClick={() => deleteGameFavorite(fav.id)}
                                    >
                                        <Trash2 size={16} /> Remove from favorites
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <p className="text-secondary fs-5">No games in your collection yet.</p>
                        <button className="btn btn-gradient mt-2" onClick={() => navigate('/games')}>
                            Browse Games
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyGames;