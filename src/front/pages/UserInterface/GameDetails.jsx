import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Users, ShoppingCart, Calendar, Building2 } from "lucide-react";

function GameDetails() {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [game, setGame] = useState(null); // Empezamos en null para manejar la carga

    useEffect(() => {
        const getGameDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/${gameId}`);
                const data = await response.json();
                setGame(data);
            } catch (error) {
                console.log("Error fetching game details:", error);
            }
        };
        getGameDetails();
    }, [gameId]);

    if (!game) return <div className="container py-5 text-center text-white">Loading game details...</div>;

    const formatNumber = (num) => {
        if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    };
    

    return (
        <div className="container py-5">
            {/* Botón de volver minimalista */}
            <button
                onClick={() => navigate("/games")}
                className="btn gamenet-btn-ghost mb-4 d-flex align-items-center gap-2"
            >
                <ArrowLeft size={20} /> Back to Games
            </button>

            <div className="game-detail-container text-white">
                <div className="row g-5">

                    {/* Columna Izquierda: Portada y Stats Rápidos */}
                    <div className="col-lg-4 text-center">
                        <img
                            src={game.cover_img}
                            alt={game.name}
                            className="game-header-img mb-4"
                            style={{ width: '200px', height: 'auto' }} // Ajustado para que no sea gigante
                        />

                        <div className="d-flex flex-column gap-3">
                            {/* Contenedor de Jugadores */}
                            <div className="gamenet-stat-glass d-flex align-items-center justify-content-center shadow-sm">
                                <Users size={24} className="stat-icon-players me-3" />
                                <div>
                                    <span className="d-block text-secondary" style={{ fontSize: '0.8rem' }}>CURRENT PLAYERS</span>
                                    <span className="fw-bold" style={{ fontSize: '1.2rem' }}>{formatNumber(game.current_players)}</span>
                                </div>
                            </div>

                            {/* Contenedor de Ventas */}
                            <div className="gamenet-stat-glass d-flex align-items-center justify-content-center shadow-sm">
                                <ShoppingCart size={24} className="stat-icon-sales me-3" />
                                <div>
                                    <span className="d-block text-secondary" style={{ fontSize: '0.8rem' }}>TOTAL SALES</span>
                                    <span className="fw-bold" style={{ fontSize: '1.2rem' }}>{formatNumber(game.total_sales)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Info y Trailer */}
                    <div className="col-lg-8">
                        <h1 className="gamenet-card-title mb-2" style={{ fontSize: '3.5rem' }}>
                            {game.name}
                        </h1>

                        <div className="d-flex gap-4 mb-4 text-secondary">
                            <span className="d-flex align-items-center gap-1">
                                <Building2 size={16} /> Company ID: {game.id_company}
                            </span>
                            <span className="d-flex align-items-center gap-1">
                                <Calendar size={16} /> Released: {game.release_date}
                            </span>
                        </div>

                        <h4 className="mb-3 text-white-50">About this game</h4>
                        <p className="lead mb-5" style={{ lineHeight: '1.8', color: '#ccc' }}>
                            {game.description || "No description available for this title."}
                        </p>

                        {/* Sección del Tráiler */}
                        {game.trailer_url && (
                            <div className="mb-4">
                                <h4 className="mb-3">Official Trailer</h4>
                                <div className="trailer-container">
                                    <iframe
                                        src={game.trailer_url.replace("watch?v=", "embed/")}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameDetails