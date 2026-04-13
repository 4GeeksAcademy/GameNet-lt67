import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, LogIn, ShieldCheck, Mail } from 'lucide-react';
import useGlobalReducer from "../../hooks/useGlobalReducer";

function LoginAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: "logout_admin" });
        dispatch({ type: "logout" });
        dispatch({ type: "logout_company" });
        localStorage.clear();
    }, []);

    async function sendData(e) {
        e.preventDefault();

        
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/admin/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();

        
            localStorage.setItem("auth_admin", "true");
            localStorage.setItem("token_admin", data.access_token);
            localStorage.setItem("role", "admin");

            dispatch({
                type: "login_admin",
                payload: data.admin
            });


            navigate("/admin");
        } else {
            const errorData = await response.json();
            alert(errorData.msg || "Access Denied: invalid credentials");
        }
    }

    return (
        <div className="login-page">
            <div className="login-card p-4 p-md-5 border-admin">

                <div className="text-center mb-5">
                    <div className="logo-box-wrapper d-inline-flex mb-3">
                        <div className="logo-glow-admin"></div>
                        <div className="logo-box bg-admin-gold">
                            <ShieldCheck size={32} className="text-dark" />
                        </div>
                    </div>
                    <h1 className="brand-title h2">CORE ACCESS</h1>
                    <p className="text-pink small fw-bold">ADMINISTRATOR AUTHENTICATION</p>
                </div>

                <form onSubmit={sendData} className="d-flex flex-column gap-3">
                    <div className="search-bar-wrapper">
                        <Mail size={18} className="search-icon" />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control custom-input w-100"
                            placeholder="Admin Email"
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
                            placeholder="Security Key"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-pink-action mt-3 w-100 py-3">
                        <LogIn size={20} className="me-2" />
                        INITIALIZE DASHBOARD
                    </button>
                </form>

                <div className="text-center mt-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="btn-back-home text-secondary small bg-transparent border-0"
                    >
                        Return to Public Terminal
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginAdmin;