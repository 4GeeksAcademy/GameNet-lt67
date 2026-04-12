import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
    User as UserIcon, Mail, ArrowLeft, 
    Shield, Activity, Home, Database, IdCard 
} from 'lucide-react';

function User() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/" + userId);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [userId]);

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                
                {/* Header con navegación legible */}
                <div className="d-flex align-items-center justify-content-between mb-5 px-3">
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={() => navigate("/user")} className="btn-back-control border-0 bg-transparent">
                            <ArrowLeft size={28} className="text-white opacity-75" />
                        </button>
                        <div>
                            <h2 className="brand-title h3 mb-0 text-white fw-bold">ENTITY PROFILE</h2>
                            <p className="text-cyan small fw-bold mb-0 d-flex align-items-center gap-2">
                                <Activity size={14} /> STATUS: AUTHORIZED ACCESS
                            </p>
                        </div>
                    </div>
                    <button className="btn-neon-action gray-variant d-flex align-items-center gap-2 px-3 py-2" 
                            onClick={() => navigate('/')}>
                        <Home size={18} />
                        <span className="text-white fw-bold">Home</span>
                    </button>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="admin-card-wrapper p-0 border border-cyan rounded-4 shadow-lg overflow-hidden bg-dark-soft">
                            
                            {/* Card Top Banner */}
                            <div className="bg-cyan p-4 text-center">
                                <div className="icon-avatar-glow mx-auto mb-2">
                                    <UserIcon size={50} className="text-black" />
                                </div>
                                <h4 className="text-black fw-black mb-0">{user.nickname || "LOADING..."}</h4>
                                <span className="badge bg-black text-cyan mt-2">UUID: {userId}</span>
                            </div>

                            {/* Info List */}
                            <div className="p-4">
                                <div className="detail-item mb-4 pb-3 border-bottom border-secondary-subtle">
                                    <label className="text-cyan small fw-bold d-flex align-items-center gap-2 mb-2">
                                        <IdCard size={14} /> REGISTERED NICKNAME
                                    </label>
                                    <div className="text-white h5 ps-4 fw-mono">{user.nickname}</div>
                                </div>

                                <div className="detail-item mb-4">
                                    <label className="text-cyan small fw-bold d-flex align-items-center gap-2 mb-2">
                                        <Mail size={14} /> ENCRYPTED COMM-LINK
                                    </label>
                                    <div className="text-white h5 ps-4 fw-mono">{user.email}</div>
                                </div>

                                <div className="d-grid gap-2 mt-5">
                                    <button 
                                        onClick={() => navigate("/user")} 
                                        className="btn-cyan-action py-3 d-flex align-items-center justify-content-center gap-2"
                                    >
                                        <Database size={18} /> BACK TO DIRECTORY
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center mt-4">
                            <p className="text-secondary small fw-bold d-flex align-items-center justify-content-center gap-2">
                                <Shield size={12} className="text-cyan" /> 
                                DATA SECURED BY GAMENET PROTOCOL v3.0
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;