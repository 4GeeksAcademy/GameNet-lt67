import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Info, Heart, Users, TrendingUp } from 'lucide-react';
import useGlobalReducer from "../../hooks/useGlobalReducer";

function GamesUser() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);



    async function getGames() {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/game");
            const data = await response.json();
            setGames(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGames();

    }, []);




    const toggleFavorite = async (gameId) => {
        const token = localStorage.getItem("token");
        if (!token) return alert("Please login");

        const isFav = favoriteIds.includes(gameId);
        const method = isFav ? 'DELETE' : 'POST'; 

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/favorites/${gameId}`, {
                method: method,
                headers: { 'Authorization': 'Bearer ' + token }
            });

            if (response.ok) {
                
                if (isFav) {
                    setFavoriteIds(favoriteIds.filter(id => id !== gameId));
                } else {
                    setFavoriteIds([...favoriteIds, gameId]);
                }
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
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
                {games.map((game) => {

                    
                    const isFavorite = favoriteIds.includes(game.id);

                    return (
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
                                        <Link to={"/game/details/" + game.id} className="btn gamenet-btn-ghost flex-grow-1 d-flex align-items-center justify-content-center gap-2">
                                            <Info size={18} /> Details
                                        </Link>

                                        <button
                                            className={`btn flex-grow-1 d-flex align-items-center justify-content-center gap-2 ${isFavorite ? 'btn-favorite-active' : 'gamenet-btn-primary'
                                                }`}
                                            onClick={() => toggleFavorite(game.id)}
                                        >
                                            <Heart
                                                size={18}
                                                className={`heart-icon ${isFavorite ? 'heart-filled' : ''}`}
                                            />
                                            {isFavorite ? 'In Favorites' : 'Add Favorites'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ); 
                })}
            </div>
        </div>
    );
}

export default GamesUser;