import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Monitor, DollarSign, PlusCircle, ArrowLeft, Cpu } from "lucide-react";

function NewConsole() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    function sendData(e) {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": name,
                "price": price
            })
        };
        
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/console", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                navigate("/console");
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0c0c0c' }}>
            <div className="container">
                
                {/* Header Section */}
                <div className="d-flex align-items-center justify-content-center mb-5">
                    <div className="text-center">
                        <div className="icon-badge-red mb-3 mx-auto">
                            <Cpu size={32} className="text-danger" />
                        </div>
                        <h2 className="brand-title h3 mb-0 text-white fw-bold text-uppercase tracking-tighter">
                            Register New Hardware
                        </h2>
                        <p className="text-secondary small fw-bold">ADD SYSTEM TO THE GRID</p>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="admin-card-wrapper p-4 border border-danger-subtle rounded-4 bg-dark-soft shadow-lg">
                            <form onSubmit={sendData}>
                                <div className="mb-4">
                                    <label className="form-label text-danger small fw-bold tracking-widest">
                                        <Monitor size={14} className="me-2" /> CONSOLE MODEL NAME
                                    </label>
                                    <input 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        type="text" 
                                        className="form-control custom-input-dark-red" 
                                        placeholder="e.g. PlayStation 5 Pro"
                                        required 
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-danger small fw-bold tracking-widest">
                                        <DollarSign size={14} className="me-2" /> MARKET PRICE (USD)
                                    </label>
                                    <input 
                                        value={price} 
                                        onChange={(e) => setPrice(e.target.value)} 
                                        type="number" 
                                        className="form-control custom-input-dark-red" 
                                        placeholder="499.99"
                                        required 
                                    />
                                </div>

                                <div className="d-grid gap-2 pt-2">
                                    <button type="submit" className="btn-red-action py-3 d-flex align-items-center justify-content-center gap-2">
                                        <PlusCircle size={20} /> INITIALIZE CONSOLE
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => navigate("/console")} 
                                        className="btn btn-link text-secondary text-decoration-none mt-2 small fw-bold"
                                    >
                                        <ArrowLeft size={14} className="me-1" /> GO BACK
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewConsole;