import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
    ArrowLeft, Calendar, Users, TrendingUp, 
    Building2, AlignLeft, Gamepad2, Database
} from 'lucide-react';

function Game() {
    const navigate = useNavigate();
    const [game, setGame] = useState({});
    const { gameId } = useParams();

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/" + gameId);
                const data = await response.json();
                setGame(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchGame();
    }, [gameId]);

    return (
        <div className="admin-page-container min-vh-100" style={{ backgroundColor: '#050505', color: '#e0e0e0' }}>
            
            <div className="game-hero-banner position-relative" style={{ 
                height: '40vh', 
                backgroundImage: `linear-gradient(to bottom, rgba(5,5,5,0.3), #050505), url(${game.cover_img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="container h-100 d-flex align-items-end pb-4">
                    <div className="d-flex align-items-center gap-4">
                        <button onClick={() => navigate("/game")} className="btn-back-circle">
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <span className="badge bg-info text-dark mb-2 fw-bold">DATABASE ENTRY #{gameId}</span>
                            <h1 className="display-4 fw-black text-white m-0 tracking-tighter">{game.name?.toUpperCase()}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <div className="row g-4">
                    {/* Columna Izquierda: Información Principal */}
                    <div className="col-lg-8">
                        <div className="admin-card-wrapper p-4 mb-4 border-0 bg-dark-soft rounded-4 shadow">
                            <h5 className="text-info fw-bold mb-3 d-flex align-items-center gap-2">
                                <AlignLeft size={20} /> MISSION BRIEFING
                            </h5>
                            <p className="lead text-secondary-emphasis lh-base">
                                {game.description || "No description available for this entry."}
                            </p>
                        </div>

                        <div className="admin-card-wrapper p-4 border-0 bg-dark-soft rounded-4 shadow">
                            <h5 className="text-info fw-bold mb-4 d-flex align-items-center gap-2">
                                <Database size={20} /> METADATA & ASSETS
                            </h5>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="info-box p-3 rounded-3 bg-black-50 border border-secondary-subtle">
                                        <label className="small text-info fw-bold d-block mb-1">PUBLISHER ID</label>
                                        <div className="d-flex align-items-center gap-2">
                                            <Building2 size={18} className="text-secondary" />
                                            <span className="h6 m-0 text-white">{game.id_company}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="info-box p-3 rounded-3 bg-black-50 border border-secondary-subtle">
                                        <label className="small text-info fw-bold d-block mb-1">TRAILER LINK</label>
                                        <div className="d-flex align-items-center gap-2">
                                            
                                            <a href={game.trailer_url} target="_blank" rel="noreferrer" className="text-white text-decoration-none small truncate">
                                                {game.trailer_url ? "Watch Official Trailer" : "N/A"}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Estadísticas (Cards) */}
                    <div className="col-lg-4">
                        <div className="d-grid gap-3">
                            <div className="stat-card p-3 rounded-4 border-start border-4 border-info bg-dark-soft shadow-sm">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <label className="small text-secondary fw-bold d-block">RELEASE DATE</label>
                                        <span className="h5 fw-bold text-white">{game.release_date}</span>
                                    </div>
                                    <Calendar size={32} className="text-info opacity-50" />
                                </div>
                            </div>

                            <div className="stat-card p-3 rounded-4 border-start border-4 border-primary bg-dark-soft shadow-sm">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <label className="small text-secondary fw-bold d-block">TOTAL SALES</label>
                                        <span className="h5 fw-bold text-white">{Number(game.total_sales).toLocaleString()} Units</span>
                                    </div>
                                    <TrendingUp size={32} className="text-primary opacity-50" />
                                </div>
                            </div>

                            <div className="stat-card p-3 rounded-4 border-start border-4 border-warning bg-dark-soft shadow-sm">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <label className="small text-secondary fw-bold d-block">ACTIVE PLAYERS</label>
                                        <span className="h5 fw-bold text-white">{Number(game.current_players).toLocaleString()} Online</span>
                                    </div>
                                    <Users size={32} className="text-warning opacity-50" />
                                </div>
                            </div>

                            <button onClick={() => navigate("/game")} className="btn btn-outline-info py-3 fw-bold mt-2 rounded-3 text-uppercase tracking-widest">
                                Return to Inventory
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game