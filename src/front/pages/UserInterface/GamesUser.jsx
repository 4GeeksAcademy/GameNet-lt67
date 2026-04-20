import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Info, Heart, Users, TrendingUp } from 'lucide-react';

function GamesUser() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);

    
    async function getGames() {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/game", {
                headers: {
                    // Si hay token, lo enviamos para que el backend sepa qué juegos son favoritos para ESTE usuario
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            });
            const data = await response.json();
            setGames(data);
        } catch (error) {
            console.log("Error al cargar juegos:", error);
        }
    }

    useEffect(() => {
        getGames();
    }, []);

    
    const toggleFavorite = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to add favorites.");
            return;
        }

        try {
            
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/${id}/favorites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                
                setGames(prevGames => 
                    prevGames.map(game => 
                        game.id === id 
                            ? { ...game, is_favorite: data.is_favorite } 
                            : game
                    )
                );
            }
        } catch (error) {
            console.error("Error al procesar favorito:", error);
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    };

    return (
        <div className="container py-5">
            <h1 className="gamenet-card-title mb-5" style={{ fontSize: '3rem' }}>Discover Games</h1>

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                {games.map((game) => (
                    <div className="col" key={game.id}>
                        <div className="card gamenet-game-card p-4 h-100 border-0">
                            <div className="position-relative mb-3">
                                <img
                                    src={game.cover_img}
                                    alt={game.name}
                                    style={{ width: '80px', borderRadius: '15px' }}
                                />
                            </div>

                            <div className="card-body p-0">
                                <h2 className="gamenet-card-title mb-2">{game.name}</h2>

                                <div className="d-flex gap-4 mb-3">
                                    <div className="gamenet-stat-row">
                                        <Users size={18} className="me-1" /> {formatNumber(game.current_players)}
                                    </div>
                                    <div className="gamenet-stat-row">
                                        <TrendingUp size={18} className="me-1" /> {formatNumber(game.total_sales)}
                                    </div>
                                </div>

                                <p className="gamenet-description text-secondary mb-4">
                                    {game.description || "The best game"}
                                </p>

                                <div className="d-flex gap-3">
                                    <Link to={"/games/" + game.id} className="btn gamenet-btn-ghost flex-grow-1 d-flex align-items-center justify-content-center gap-2">
                                        <Info size={18} /> Details
                                    </Link>

                                    <button
                                        className={`btn flex-grow-1 d-flex align-items-center justify-content-center gap-2 ${
                                            game.is_favorite ? 'gamenet-btn-primary' : 'btn-favorite-active'
                                        }`}
                                        onClick={() => toggleFavorite(game.id)}
                                    >
                                        <Heart
                                            size={18}
                                            className={`heart-icon ${game.is_favorite ? 'heart-filled' : ''}`}
                                        />
                                        {game.is_favorite ? 'In Favorites' : 'Add Favorites'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GamesUser;