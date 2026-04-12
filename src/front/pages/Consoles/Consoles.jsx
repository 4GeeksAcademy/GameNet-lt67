import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
    Monitor, Edit3, Eye, Trash2, PlusCircle, 
    ArrowLeft, DollarSign, Hash, Layout 
} from 'lucide-react';

function Consoles() {
    const navigate = useNavigate();
    const [consoles, setConsoles] = useState([]);

    async function getConsoles() {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/console");
            const data = await response.json();
            setConsoles(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getConsoles();
    }, []);

    function deleteConsole(id) {
        if (!window.confirm("SYSTEM ALERT: Are you sure you want to decommission this console model?")) return;
        
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/console/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                getConsoles();
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={() => navigate("/admin")} className="btn-back-home border-0 bg-transparent text-secondary">
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <h2 className="brand-title h3 mb-0">HARDWARE REGISTRY</h2>
                            <p className="text-warning small fw-bold mb-0">Platform & Console Systems</p>
                        </div>
                    </div>
                    
                    <button className="btn-login py-2 px-4 d-flex align-items-center gap-2 border-warning" 
                            style={{borderColor: '#ffc107'}}
                            onClick={() => navigate('/new_console')}>
                        <PlusCircle size={18} /> Register Hardware
                    </button>
                </div>

                {/* Table Section */}
                <div className="admin-table-wrapper border border-warning rounded-4 overflow-hidden shadow-lg">
                    <table className="table table-dark table-hover mb-0 align-middle">
                        <thead className="bg-black border-bottom border-warning">
                            <tr>
                                <th className="p-4 text-warning small fw-bold"><Hash size={14} /> ID</th>
                                <th className="p-4 text-warning small fw-bold"><Layout size={14} /> SYSTEM NAME</th>
                                <th className="p-4 text-warning small fw-bold"><DollarSign size={14} /> MARKET PRICE</th>
                                <th className="p-4 text-warning small fw-bold text-center">CONTROL PANEL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consoles.map((item) => (
                                <tr key={item.id} className="admin-table-row">
                                    <td className="p-4 fw-mono text-secondary">#{item.id}</td>
                                    <td className="p-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="console-icon-box rounded bg-dark border border-secondary d-flex align-items-center justify-content-center" 
                                                 style={{width: '40px', height: '40px'}}>
                                                <Monitor size={20} className="text-warning opacity-75" />
                                            </div>
                                            <span className="text-white fw-bold">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="badge bg-black border border-warning text-warning px-3 py-2">
                                            ${item.price}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link to={"/console/" + item.id} className="btn-action btn-view" title="Hardware Specs">
                                                <Eye size={18} />
                                            </Link>
                                            <button className="btn-action btn-edit" onClick={() => navigate('/update_console/' + item.id)} title="Update System">
                                                <Edit3 size={18} />
                                            </button>
                                            <button className="btn-action btn-delete" onClick={() => deleteConsole(item.id)} title="Delete System">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {consoles.length === 0 && (
                        <div className="text-center py-5">
                            <Monitor size={48} className="text-secondary opacity-25 mb-3" />
                            <p className="text-secondary">No console hardware detected in the mainframe.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Consoles;