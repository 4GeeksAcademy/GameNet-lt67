import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
    ArrowLeft, Monitor, DollarSign, 
    Cpu, Hash, ShieldCheck, Activity
} from 'lucide-react';

function Console() {
    const navigate = useNavigate();
    const [consoleData, setConsoleData] = useState({});
    const { consoleId } = useParams();

    useEffect(() => {
        const fetchConsole = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/console/" + consoleId);
                const data = await response.json();
                setConsoleData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchConsole();
    }, [consoleId]);

    return (
        <div className="admin-page-container min-vh-100" style={{ backgroundColor: '#080808', color: '#f8f9fa' }}>
            {/* Header / Hero Section */}
            <div className="hardware-hero py-5 border-bottom border-danger-subtle bg-dark-soft">
                <div className="container">
                    <button onClick={() => navigate("/console")} className="btn-back-control mb-4 bg-transparent border-0 text-secondary">
                        <ArrowLeft size={24} className="me-2" /> <small className="fw-bold">SYSTEM INVENTORY</small>
                    </button>
                    
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <div className="d-flex align-items-center gap-3 mb-2">
                                <span className="badge bg-danger text-white px-3 py-2 rounded-pill fw-bold">HARDWARE UNIT</span>
                                <span className="text-secondary small fw-bold">ID: {consoleId}</span>
                            </div>
                            <h1 className="display-4 fw-black text-white m-0 tracking-tighter text-uppercase">
                                {consoleData.name || "LOADING_SYSTEM..."}
                            </h1>
                        </div>
                        <div className="col-md-4 text-md-end mt-4 mt-md-0">
                            <div className="price-tag-large p-4 rounded-4 bg-black border border-danger d-inline-block shadow-lg">
                                <label className="d-block small text-danger fw-bold tracking-widest">MSRP VALUE</label>
                                <span className="h1 m-0 fw-black text-white">
                                    <small className="h4">$</small>{consoleData.price}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technical Specifications Area */}
            <div className="container py-5">
                <div className="row g-4 justify-content-center">
                    <div className="col-lg-10">
                        <div className="admin-card-wrapper p-5 rounded-4 bg-dark-soft border border-secondary-subtle shadow">
                            <h5 className="text-danger fw-bold mb-5 d-flex align-items-center gap-2 text-uppercase tracking-wider">
                                <Cpu size={24} /> System Specifications
                            </h5>

                            <div className="row g-5">
                                {/* Detalle 1 */}
                                <div className="col-md-6">
                                    <div className="spec-item d-flex align-items-start gap-3">
                                        <div className="spec-icon-box p-3 rounded-3 bg-black border border-danger">
                                            <Monitor size={24} className="text-danger" />
                                        </div>
                                        <div>
                                            <label className="text-secondary small fw-bold d-block mb-1">UNIT LABEL</label>
                                            <p className="h5 text-white fw-bold">{consoleData.name}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Detalle 2 */}
                                <div className="col-md-6">
                                    <div className="spec-item d-flex align-items-start gap-3">
                                        <div className="spec-icon-box p-3 rounded-3 bg-black border border-danger">
                                            <DollarSign size={24} className="text-danger" />
                                        </div>
                                        <div>
                                            <label className="text-secondary small fw-bold d-block mb-1">VALUATION</label>
                                            <p className="h5 text-white fw-bold">{consoleData.price} USD</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Detalle 3 (Simulado para estética) */}
                                <div className="col-md-6">
                                    <div className="spec-item d-flex align-items-start gap-3">
                                        <div className="spec-icon-box p-3 rounded-3 bg-black border border-secondary">
                                            <Hash size={24} className="text-secondary" />
                                        </div>
                                        <div>
                                            <label className="text-secondary small fw-bold d-block mb-1">DATABASE KEY</label>
                                            <code className="text-info">HARDWARE_REF_{consoleId}</code>
                                        </div>
                                    </div>
                                </div>

                                {/* Detalle 4 (Simulado para estética) */}
                                <div className="col-md-6">
                                    <div className="spec-item d-flex align-items-start gap-3">
                                        <div className="spec-icon-box p-3 rounded-3 bg-black border border-secondary">
                                            <Activity size={24} className="text-secondary" />
                                        </div>
                                        <div>
                                            <label className="text-secondary small fw-bold d-block mb-1">SYSTEM STATUS</label>
                                            <span className="text-success d-flex align-items-center gap-2">
                                                <ShieldCheck size={16} /> Online & Verified
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 text-center">
                            <button onClick={() => navigate("/console")} className="btn btn-outline-danger px-5 py-3 rounded-3 fw-bold text-uppercase tracking-widest">
                                Close Terminal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Console