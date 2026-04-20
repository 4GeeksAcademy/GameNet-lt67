import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react'; // Icono de IA
import { Link } from 'react-router-dom';

export function AIRecommendations() {
    const [data, setData] = useState({ recommendations: [], message: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const token = localStorage.getItem("token") || localStorage.getItem("token_company");
                const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai-recommendations`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (resp.ok) {
                    const result = await resp.json();
                    setData(result);
                }
            } catch (error) {
                console.error("AI Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecommendations();
    }, []);

    if (loading) return (
        <div className="card sidebar-card border-0">
            <div className="card-body p-3 text-center">
                <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                <p className="small text-secondary m-0 mt-2">Loading recommendations...</p>
            </div>
        </div>
    );


    if (data.recommendations.length === 0) {
        return (
            <div className="card sidebar-card border-0">
                <div className="card-body p-3 text-center">
                    <p className="small text-secondary m-0">
                        Add Games to receive recommendations from AI ✨
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="card sidebar-card border-0">
            <div className="card-body p-3">
                <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="icon-box bg-grad-purple">
                        <Sparkles size={16} className="text-white" />
                    </div>
                    <h2 className="h6 fw-bold m-0 text-white">GameNet AI Suggestions</h2>
                </div>
                
                <p className="x-small text-secondary mb-3 lh-sm italic">
                    "{data.message}"
                </p>

                <div className="d-flex flex-column gap-3">
                    {data.recommendations.map((game, index) => (
                        <Link 
                            key={index} 
                            to={`/games/${game.id}`} 
                            className="text-decoration-none sidebar-item d-flex align-items-center gap-2"
                        >
                            {game.image && (
                                <img 
                                    src={game.image} 
                                    alt={game.name} 
                                    className="rounded" 
                                    style={{ width: '32px', height: '32px', objectFit: 'cover' }} 
                                />
                            )}
                            <p className="small m-0 item-text text-white">{game.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}