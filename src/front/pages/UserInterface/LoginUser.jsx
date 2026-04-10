import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import useGlobalReducer from "../../hooks/useGlobalReducer";


function LoginUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        };

        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/login", requestOptions)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: 'set_auth',
                    payload: true
                });
                localStorage.setItem("auth", true);
                localStorage.setItem("token", data.access_token);
                navigate("/"); // Redirigir solo tras éxito
            })
            .catch(error => console.error("Error en login:", error));
    }

    return (
        <div className="login-page">
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
                    <p className="text-secondary small">Welcome back, Commander.</p>
                </div>

                {/* Formulario Funcional */}
                <form onSubmit={sendData} className="d-flex flex-column gap-3">
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

                    <div className="search-bar-wrapper">
                        <Lock size={18} className="search-icon" />
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            className="form-control custom-input w-100" 
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-login mt-3">
                        <LogIn size={20} className="me-2" />
                        Sign In
                    </button>

                    <div className="separator my-2">
                        <span>or</span>
                    </div>

                    <Link to="/user/signup" className="text-decoration-none">
                        <button type="button" className="btn-signup-ghost w-100">
                            <UserPlus size={20} className="me-2" />
                            Create new account
                        </button>
                    </Link>
                </form>

                <div className="text-center mt-4">
                    <a href="#" className="text-secondary small text-decoration-none hover-white">
                        Forgot your password?
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginUser;