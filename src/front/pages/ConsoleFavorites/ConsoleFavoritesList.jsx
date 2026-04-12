import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Monitor, Trash2, ArrowLeft, PlusCircle,
    Home, User, Hash, ShieldCheck
} from 'lucide-react';

function ConsoleFavoritesList() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [consoleFavorites, setConsoleFavorites] = useState([]);

    async function getConsoleFavorites() {
        if (!userId) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/console/favorites/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setConsoleFavorites(data);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

    useEffect(() => {
        getConsoleFavorites();
    }, [userId]);

    const deleteFavorite = (uId, cId) => {
        if (!uId || !cId) return;

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/console/favorites/${uId}/${cId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // USAR setConsoleFavorites (el nombre que definiste arriba)
                    setConsoleFavorites(prev => prev.filter(fav =>
                        !(fav.user_id === uId && fav.console_id === cId)
                    ));
                } else {
                    console.error("Error al borrar en el servidor");
                }
            })
            .catch(error => console.error("Error de red:", error));
    };

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">

                {/* Header Section Corregida */}
                <div className="d-flex align-items-center justify-content-between mb-5 px-3">
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={() => navigate("/admin")} className="btn-back-control border-0 bg-transparent">
                            <ArrowLeft size={28} className="text-white opacity-75" />
                        </button>
                        <div>
                            <h2 className="brand-title h3 mb-0 text-white fw-bold">HARDWARE VAULT</h2>
                            <p className="text-warning small fw-bold mb-0 d-flex align-items-center gap-2">
                                <ShieldCheck size={14} /> REGISTERED CONSOLES: USER #{userId}
                            </p>
                        </div>
                    </div>

                    <div className="d-flex gap-3">
                        {/* Botón Add Console: Estilo Cristal Neón Naranja */}
                        <button className="btn-neon-action orange-variant d-flex align-items-center gap-2 px-4 py-2"
                            onClick={() => navigate('/console/favorites')}>
                            <PlusCircle size={18} />
                            <span className="text-white fw-bold">Associate Console</span>
                        </button>

                        {/* Botón Home: Estilo Cristal Neón Blanco */}
                        <button className="btn-neon-action gray-variant d-flex align-items-center gap-2 px-3 py-2"
                            onClick={() => navigate('/')}>
                            <Home size={18} />
                            <span className="text-white fw-bold">Home</span>
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="admin-table-wrapper border border-warning rounded-4 overflow-hidden shadow-lg">
                    <table className="table table-dark table-hover mb-0 align-middle">
                        <thead className="bg-black border-bottom border-warning">
                            <tr>
                                <th className="p-4 text-warning small fw-bold"><Hash size={14} /> ID</th>
                                <th className="p-4 text-warning small fw-bold"><User size={14} /> OWNER</th>
                                <th className="p-4 text-warning small fw-bold"><Monitor size={14} /> CONSOLE MODEL</th>
                                <th className="p-4 text-warning small fw-bold text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consoleFavorites.length > 0 ? (
                                consoleFavorites.map((fav) => (
                                    <tr key={fav.id} className="admin-table-row">
                                        <td className="p-4 fw-mono text-secondary">#{fav.id}</td>
                                        <td className="p-4 text-white">
                                            {fav.user_nickname || fav.user_name}
                                        </td>
                                        <td className="p-4">
                                            <div className="d-flex align-items-center gap-2">
                                                <Monitor size={16} className="text-warning" />
                                                <span className="text-white fw-bold">{fav.console_name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                className="btn-action btn-delete"
                                                
                                                onClick={() => deleteFavorite(fav.user_id, fav.console_id)}
                                                title="Decommission Hardware"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-5">
                                        <Monitor size={48} className="text-secondary opacity-25 mb-3" />
                                        <p className="text-secondary">No hardware registries found for this terminal.</p>
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

export default ConsoleFavoritesList;