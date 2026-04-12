import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Trash2, ArrowLeft, PlusCircle, Home, 
    Cpu, Gamepad2, Hash, Link2 
} from 'lucide-react';

function GameConsoleList() {
    const navigate = useNavigate();
    const [gameconsoles, setGameConsoles] = useState([]);

    async function getGameConsoles() {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/gameconsole");
            const data = await response.json();
            setGameConsoles(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGameConsoles();
    }, []);

    function deleteGameConsole(id) {
        if (!window.confirm("TERMINAL WARNING: Break this hardware-software link?")) return;

        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/gameconsole/" + id, requestOptions)
            .then((response) => response.text())
            .then(() => {
                getGameConsoles();
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                
               
                <div className="d-flex align-items-center justify-content-between mb-5 px-3">
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={() => navigate("/admin")} className="btn-back-control border-0 bg-transparent">
                            <ArrowLeft size={28} className="text-white opacity-75" />
                        </button>
                        <div>
                            <h2 className="brand-title h3 mb-0 text-white fw-bold">COMPATIBILITY MATRIX</h2>
                            <p className="text-purple small fw-bold mb-0 d-flex align-items-center gap-2">
                                <Link2 size={14} /> SYSTEM ARCHITECTURE: MAPPED CONNECTIONS
                            </p>
                        </div>
                    </div>
                    
                    <div className="d-flex gap-3">
                        {/* Botón Asociar: Estilo Cristal Neón Púrpura */}
                        <button className="btn-neon-action purple-variant d-flex align-items-center gap-2 px-4 py-2" 
                                onClick={() => navigate('/gameconsole')}>
                            <PlusCircle size={18} /> 
                            <span className="text-white fw-bold">Link New Hardware</span>
                        </button>

                        
                        <button className="btn-neon-action gray-variant d-flex align-items-center gap-2 px-3 py-2" 
                                onClick={() => navigate('/')}>
                            <Home size={18} />
                            <span className="text-white fw-bold">Home</span>
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="admin-table-wrapper border border-purple rounded-4 overflow-hidden shadow-lg">
                    <table className="table table-dark table-hover mb-0 align-middle">
                        <thead className="bg-black border-bottom border-purple">
                            <tr>
                                <th className="p-4 text-purple small fw-bold"><Hash size={14} /> ID</th>
                                <th className="p-4 text-purple small fw-bold"><Gamepad2 size={14} /> GAME TITLE</th>
                                <th className="p-4 text-purple small fw-bold"><Cpu size={14} /> PLATFORM ARCHITECTURE</th>
                                <th className="p-4 text-purple small fw-bold text-center">LINK CONTROL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gameconsoles.length > 0 ? (
                                gameconsoles.map((item) => (
                                    <tr key={item.id} className="admin-table-row">
                                        <td className="p-4 fw-mono text-secondary">#{item.id}</td>
                                        <td className="p-4">
                                            <span className="text-white fw-bold">{item.game_name}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="d-flex align-items-center gap-2">
                                                <Cpu size={16} className="text-purple" />
                                                <span className="text-info fw-bold">{item.console_name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button 
                                                className="btn-action btn-delete" 
                                                onClick={() => deleteGameConsole(item.id)}
                                                title="Sever Connection"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-5">
                                        <Link2 size={48} className="text-secondary opacity-25 mb-3" />
                                        <p className="text-secondary">The compatibility matrix is currently offline (no data).</p>
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

export default GameConsoleList;