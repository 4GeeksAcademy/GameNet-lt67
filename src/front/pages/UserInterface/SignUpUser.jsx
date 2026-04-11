import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserPlus } from 'lucide-react'; // Importamos los iconos necesarios
import useGlobalReducer from "../../hooks/useGlobalReducer";

function SignUpUser() {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const sendData = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "nickname": nickname,
                "email": email,
                "password": password
            })
        };
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", requestOptions);
            
                    navigate("/login");
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-page"> {/* Usamos la misma clase de contenedor del login */}
            <div className="login-card p-4 p-md-5">
                {/* Logo & Branding */}
                <div className="text-center mb-5">
                    <div className="logo-box-wrapper d-inline-flex mb-3">
                        <div className="logo-glow"></div>
                        <div className="logo-box">
                            <span className="logo-letter">G</span>
                        </div>
                    </div>
                    <h1 className="brand-title h2">GameNet</h1>
                    <p className="text-secondary small">Join the elite. Create your profile.</p>
                </div>

                {/* Formulario con el estilo de GameNet */}
                <form onSubmit={sendData} className="d-flex flex-column gap-3">
                    
                    {/* Campo Nickname */}
                    <div className="search-bar-wrapper">
                        <User size={18} className="search-icon" />
                        <input 
                            value={nickname} 
                            onChange={(e) => setNickname(e.target.value)} 
                            type="text" 
                            className="form-control custom-input w-100" 
                            placeholder="Username / Nickname"
                            required
                        />
                    </div>

                    {/* Campo Email */}
                    <div className="search-bar-wrapper">
                        <Mail size={18} className="search-icon" />
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            className="form-control custom-input w-100" 
                            placeholder="Email address"
                            required
                        />
                    </div>

                    {/* Campo Password */}
                    <div className="search-bar-wrapper">
                        <Lock size={18} className="search-icon" />
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            className="form-control custom-input w-100" 
                            placeholder="Create Password"
                            required
                        />
                    </div>

                    {/* Botón de Registro Principal */}
                    <button type="submit" className="btn-login mt-3">
                        <UserPlus size={20} className="me-2" />
                        Create Account
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-secondary small">
                            By registering, you agree to our <span className="text-white shadow-sm">Terms of Service</span>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpUser;