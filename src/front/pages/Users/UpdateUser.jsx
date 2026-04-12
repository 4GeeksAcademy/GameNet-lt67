import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
    Edit3, Mail, User, ArrowLeft, 
    Settings, RefreshCw, Home 
} from 'lucide-react';

function UpdateUser() {
    const { userId } = useParams()
    const navigate = useNavigate()

    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/" + userId)
            .then(response => response.json())
            .then(data => {
                setNickname(data.nickname)
                setEmail(data.email)
            })
            .catch((error) => console.log(error))
    }, [userId])

    function sendData(e) {
        e.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "nickname": nickname,
                "email": email
            })
        }
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/" + userId, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        navigate("/user")
    }

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                
                {/* Header Section */}
                <div className="d-flex align-items-center justify-content-between mb-5 px-3">
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={() => navigate("/user")} className="btn-back-control border-0 bg-transparent">
                            <ArrowLeft size={28} className="text-white opacity-75" />
                        </button>
                        <div>
                            <h2 className="brand-title h3 mb-0 text-white fw-bold">ENTITY OVERRIDE</h2>
                            <p className="text-cyan small fw-bold mb-0 d-flex align-items-center gap-2">
                                <Settings size={14} /> MODIFYING ACCOUNT DATA: ID #{userId}
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
                    <div className="col-md-5">
                        <div className="admin-card-wrapper p-4 border border-cyan rounded-4 shadow-lg bg-dark-soft">
                            <form onSubmit={sendData}>
                                <div className="text-center mb-4">
                                    <div className="icon-user-circle mx-auto mb-2 border-cyan shadow-cyan">
                                        <Edit3 size={30} className="text-cyan" />
                                    </div>
                                    <h5 className="text-white fw-bold">Update Profile</h5>
                                </div>

                                {/* Nickname Input */}
                                <div className="mb-3">
                                    <label className="form-label text-cyan small fw-bold d-flex align-items-center gap-2">
                                        <User size={14} /> IDENTITY (NICKNAME)
                                    </label>
                                    <input 
                                        value={nickname} 
                                        onChange={(e) => setNickname(e.target.value)} 
                                        type="text" 
                                        className="form-control custom-input-dark-cyan" 
                                        required
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="mb-4">
                                    <label className="form-label text-cyan small fw-bold d-flex align-items-center gap-2">
                                        <Mail size={14} /> COMM-LINK (EMAIL)
                                    </label>
                                    <input 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        type="email" 
                                        className="form-control custom-input-dark-cyan" 
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn-cyan-action w-100 py-3 d-flex align-items-center justify-content-center gap-2 shadow-cyan-btn">
                                    <RefreshCw size={18} /> SYNCHRONIZE CHANGES
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;