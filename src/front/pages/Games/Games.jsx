import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
    Gamepad2, Edit3, Eye, Trash2, PlusCircle, 
    ArrowLeft, Calendar, BarChart3, Building, Hash, Search 
} from 'lucide-react';

function Games() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    function deleteGame(id) {
        if (!window.confirm("Are you sure you want to delete this game? This action is permanent.")) return;
        
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                getGames();
            })
            .catch((error) => console.error(error));
    }

    const filteredGames = games.filter(game => 
        game.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        game.id.toString().includes(searchTerm)
    );

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                
           
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={() => navigate("/admin")} className="btn-back-home border-0 bg-transparent text-secondary">
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <h2 className="brand-title h3 mb-0">GAMES REPOSITORY</h2>
                            <p className="text-primary small fw-bold mb-0">Global Titles Management</p>
                        </div>
                    </div>

                    <div className="search-bar-wrapper mb-3">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            className="form-control custom-input w-100"
                            placeholder="Search user..."
                            autoFocus
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <button className="btn-login py-2 px-4 d-flex align-items-center gap-2" onClick={() => navigate('/new_game')}>
                        <PlusCircle size={18} /> New Game
                    </button>
                </div>

                {/* Table Section */}
                <div className="admin-table-wrapper border border-primary rounded-4 overflow-hidden shadow-lg">
                    <table className="table table-dark table-hover mb-0 align-middle">
                        <thead className="bg-black border-bottom border-primary">
                            <tr>
                                <th className="p-4 text-primary small fw-bold"><Hash size={14} /> ID</th>
                                <th className="p-4 text-primary small fw-bold">GAME</th>
                                <th className="p-4 text-primary small fw-bold"><Building size={14} /> COMPANY</th>
                                <th className="p-4 text-primary small fw-bold"><Calendar size={14} /> RELEASE</th>
                                <th className="p-4 text-primary small fw-bold"><BarChart3 size={14} /> STATS</th>
                                <th className="p-4 text-primary small fw-bold text-center text-uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGames.map((game) => (
                                <tr key={game.id} className="admin-table-row">
                                    <td className="p-4 fw-mono text-secondary">#{game.id}</td>
                                    <td className="p-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="game-cover-mini rounded border border-secondary overflow-hidden">
                                                <img src={game.cover_img} alt="cover" style={{width: '40px', height: '55px', objectFit: 'cover'}} />
                                            </div>
                                            <div>
                                                <span className="text-white fw-bold d-block">{game.name}</span>
                                                <small className="text-secondary opacity-75">{game.trailer_url ? 'Trailer Linked' : 'No Trailer'}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-secondary">
                                        <span className="badge bg-dark border border-secondary text-secondary">
                                            ID: {game.id_company}
                                        </span>
                                    </td>
                                    <td className="p-4 text-secondary small">
                                        {game.release_date}
                                    </td>
                                    <td className="p-4">
                                        <div className="small">
                                            <div className="text-info">Sales: {game.total_sales || 0}</div>
                                            <div className="text-success">Players: {game.current_players || 0}</div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link to={"/game/" + game.id} className="btn-action btn-view" title="See Details">
                                                <Eye size={18} />
                                            </Link>
                                            <button className="btn-action btn-edit" onClick={() => navigate('/update_game/' + game.id)} title="Edit Game">
                                                <Edit3 size={18} />
                                            </button>
                                            <button className="btn-action btn-delete" onClick={() => deleteGame(game.id)} title="Delete Game">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {games.length === 0 && (
                        <div className="text-center py-5">
                            <Gamepad2 size={48} className="text-secondary opacity-25 mb-3" />
                            <p className="text-secondary">No digital titles found in the server.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Games;