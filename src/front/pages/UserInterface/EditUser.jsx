import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserPen, Mail, User as UserIcon, ArrowLeft, Save } from 'lucide-react';

function EditUser() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);

    // Cargar datos actuales del usuario
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setNickname(data.nickname);
                    setEmail(data.email);
                }
            } catch (error) {
                console.log("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [userId, token]);

    const sendData = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ "nickname": nickname, "email": email })
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}`, requestOptions);
            if (response.ok) {
                // Podrías añadir una notificación de éxito aquí
                navigate("/"); // Volvemos al feed principal tras actualizar
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-black">
            <div className="spinner-border text-info" role="status"></div>
        </div>
    );

    return (
        <div className="edit-profile-container py-5 min-vh-100" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        
                        {/* Botón Volver */}
                        <button 
                            onClick={() => navigate(-1)} 
                            className="btn btn-link text-secondary d-flex align-items-center gap-2 mb-4 text-decoration-none p-0"
                        >
                            <ArrowLeft size={18} /> Back
                        </button>

                        <div className="profile-card bg-dark border border-secondary rounded-4 p-4 p-md-5 shadow-lg">
                            <div className="text-center mb-4">
                                <div className="icon-badge mx-auto mb-3">
                                    <UserPen size={32} className="text-info" />
                                </div>
                                <h2 className="text-white fw-bold">Edit Profile</h2>
                                <p className="text-secondary small">Update your account information</p>
                            </div>

                            <form onSubmit={sendData}>
                                {/* Input Nickname */}
                                <div className="mb-4">
                                    <label className="form-label text-secondary small text-uppercase fw-bold">Nickname</label>
                                    <div className="input-group-custom">
                                        <UserIcon size={18} className="input-icon" />
                                        <input 
                                            value={nickname} 
                                            onChange={(e) => setNickname(e.target.value)} 
                                            type="text" 
                                            className="form-control-custom"
                                            placeholder="Enter your new nickname"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Input Email */}
                                <div className="mb-5">
                                    <label className="form-label text-secondary small text-uppercase fw-bold">Email Address</label>
                                    <div className="input-group-custom">
                                        <Mail size={18} className="input-icon" />
                                        <input 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            type="email" 
                                            className="form-control-custom"
                                            placeholder="Enter your new email"
                                            required
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="btn-update-profile">
                                    <Save size={18} />
                                    <span>Save Changes</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser