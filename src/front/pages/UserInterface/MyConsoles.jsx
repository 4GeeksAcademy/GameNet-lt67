import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Monitor, ArrowLeft, Tv, Smartphone, Cpu } from 'lucide-react';
import useGlobalReducer from "../../hooks/useGlobalReducer";

function MyConsoles() {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const [consoleFavorites, setConsoleFavorites] = useState([]);
    const userId = store.user?.id;

    const getConsoleFavorites = async () => {
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
    };

    useEffect(() => {
        getConsoleFavorites();
    }, [userId]);

    const deleteConsoleFavorite = async (consoleId) => {
        try {
            
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/console/favorites/${userId}/${consoleId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                
                setConsoleFavorites(prev => prev.filter(fav => fav.console_id !== consoleId));
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-5 mb-5 p-4 favorites-container shadow-lg">

            <div className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="m-0 d-flex align-items-center gap-3 text-white">
                    <div className="logo-box" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary-gradient)' }}>
                        <Cpu size={20} color="white" />
                    </div>
                    My Console Collection
                </h2>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} /> Back
                </button>
            </div>

   
            <div className="row">
                {consoleFavorites.length > 0 ? (
                    consoleFavorites.map((fav) => (
                        <div key={fav.console_id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card game-card-custom h-100 shadow-sm border-0 bg-dark p-3">
                                
                                <div className="card-body d-flex flex-column align-items-center justify-content-center text-center py-4">
                                    
                                    <div className="mb-3 text-info">
                                        {fav.console_name?.toLowerCase().includes('switch') || fav.console_name?.toLowerCase().includes('portable') 
                                            ? <Smartphone size={48} /> 
                                            : <Cpu size={48} />
                                        }
                                    </div>

                                    <h5 className="text-white mb-1">{fav.console_name}</h5>
                                    <p className="text-secondary small mb-4">In your setup</p>
                                    
                                    <button 
                                        className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                                        onClick={() => deleteConsoleFavorite(fav.console_id)}
                                        style={{ transition: '0.3s' }}
                                    >
                                        <Trash2 size={16} /> Remove from setup
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <Monitor size={48} className="text-secondary mb-3 opacity-50" />
                        <p className="text-secondary fs-5">No hardware registered in your collection.</p>
                        <button className="btn btn-gradient mt-2" onClick={() => navigate('/consoles')}>
                            Browse Consoles
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyConsoles;