import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Monitor, PlusCircle, MinusCircle, Smartphone, Tv, Loader2, Cpu, ArrowLeft } from 'lucide-react';
import useGlobalReducer from "../../hooks/useGlobalReducer";

function ConsolesUser() {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const [consoles, setConsoles] = useState([]);
    const [userConsoleIds, setUserConsoleIds] = useState([]); 
    const [loadingId, setLoadingId] = useState(null); 
    const userId = store.user?.id;


    const getConsoles = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/console");
            const data = await response.json();
            setConsoles(data);
        } catch (error) {
            console.error("Error fetching consoles:", error);
        }
    };


    const getUserFavorites = async () => {
        if (!userId) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/console/favorites/${userId}`);
            if (response.ok) {
                const data = await response.json();

                setUserConsoleIds(data.map(fav => fav.console_id));
            }
        } catch (error) {
            console.error("Error fetching user favorites:", error);
        }
    };

    useEffect(() => {
        getConsoles();
        getUserFavorites();
    }, [userId]);


    const handleToggleFavorite = async (consoleId) => {
        if (!userId) return alert("Please log in first");
        
        const isFavorite = userConsoleIds.includes(consoleId);
        const method = isFavorite ? "DELETE" : "POST";
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/console/favorites/${userId}/${consoleId}`;

        setLoadingId(consoleId); 

        try {
            const response = await fetch(url, { method });
            if (response.ok) {
                if (isFavorite) {
                    
                    setUserConsoleIds(prev => prev.filter(id => id !== consoleId));
                } else {
                    
                    setUserConsoleIds(prev => [...prev, consoleId]);
                }
            }
        } catch (error) {
            console.error("Error updating favorite:", error);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="container mt-5 mb-5 p-4 favorites-container shadow-lg">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="m-0 d-flex align-items-center gap-3 text-white">
                    <div className="logo-box">
                        <Monitor size={20} color="white" />
                    </div>
                    Pick Your Consoles
                </h2>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate('/')}>
                    <ArrowLeft size={16} /> Back
                </button>
            </div>

            <div className="row">
                {consoles.map((item) => {
                    const isFavorite = userConsoleIds.includes(item.id);
                    
                    return (
                        <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className={`card game-card-custom h-100 p-3 bg-dark border-0 ${isFavorite ? 'border-glow-active' : ''}`}>
                                <div className="card-body d-flex flex-column justify-content-between text-center">
                                    <div className="mb-3">
                                        <div className={`icon-wrapper mb-3 ${isFavorite ? 'text-primary' : 'text-secondary'}`}>
                                            {item.name.toLowerCase().includes('switch') ? <Smartphone size={40} /> : <Cpu size={40} />}
                                        </div>
                                        <h5 className="game-title text-white">{item.name}</h5>
                                    </div>

                                    <button 
                                        className={`btn w-100 d-flex align-items-center justify-content-center gap-2 transition-all ${
                                            isFavorite ? 'btn-outline-danger' : 'btn-gradient'
                                        }`}
                                        onClick={() => handleToggleFavorite(item.id)}
                                        disabled={loadingId === item.id}
                                    >
                                        {loadingId === item.id ? (
                                            <Loader2 className="spinner" size={18} />
                                        ) : isFavorite ? (
                                            <><MinusCircle size={18} /> Remove from list</>
                                        ) : (
                                            <><PlusCircle size={18} /> Add to my list</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ConsolesUser;