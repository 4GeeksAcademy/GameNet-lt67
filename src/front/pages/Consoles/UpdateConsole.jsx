import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Monitor, DollarSign, Save, ArrowLeft, Settings2, RefreshCcw } from "lucide-react";

function UpdateConsole() {
    const { consoleId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/console/" + consoleId)
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setPrice(data.price);
            })
            .catch((error) => console.log(error));
    }, [consoleId]);

    function sendData(e) {
        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": name,
                "price": price
            })
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/console/" + consoleId, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                navigate("/console");
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                
                {/* Header Section */}
                <div className="d-flex align-items-center justify-content-between mb-5 px-lg-5">
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={() => navigate("/console")} className="btn-back-control border-0 bg-transparent">
                            <ArrowLeft size={28} className="text-white opacity-75" />
                        </button>
                        <div>
                            <h2 className="brand-title h3 mb-0 text-white fw-bold">HARDWARE OVERRIDE</h2>
                            <p className="text-danger small fw-bold mb-0 d-flex align-items-center gap-2">
                                <Settings2 size={14} /> RECONFIGURING SYSTEM UNIT: {consoleId}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6">
                        <div className="admin-card-wrapper p-4 p-lg-5 border-top border-4 border-danger rounded-4 bg-dark-soft shadow-lg">
                            <div className="text-center mb-4">
                                <div className="p-3 d-inline-block rounded-circle bg-danger-transparent mb-3">
                                    <RefreshCcw size={30} className="text-danger animate-spin-slow" />
                                </div>
                                <h4 className="text-white fw-bold">{name || "Loading Unit..."}</h4>
                            </div>

                            <form onSubmit={sendData}>
                                <div className="mb-4">
                                    <label className="form-label text-danger small fw-bold tracking-widest uppercase">System Label</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-black border-secondary text-secondary">
                                            <Monitor size={18} />
                                        </span>
                                        <input 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)} 
                                            type="text" 
                                            className="form-control custom-input-dark" 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-danger small fw-bold tracking-widest uppercase">New MSRP Price</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-black border-secondary text-secondary">
                                            <DollarSign size={18} />
                                        </span>
                                        <input 
                                            value={price} 
                                            onChange={(e) => setPrice(e.target.value)} 
                                            type="number" 
                                            className="form-control custom-input-dark" 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="d-flex gap-2 pt-3">
                                    <button type="submit" className="btn-red-action w-100 py-3 d-flex align-items-center justify-content-center gap-2">
                                        <Save size={20} /> APPLY PARAMETERS
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <p className="text-center mt-4 text-secondary small">
                            ID de Registro: <span className="text-danger">{consoleId}</span> — Asegúrese de verificar el precio de mercado antes de actualizar.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateConsole
