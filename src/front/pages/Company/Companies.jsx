import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
    Building2, Mail, Edit3, Eye, Trash2, PlusSquare, 
    ArrowLeft, Globe, Image as ImageIcon, Hash 
} from 'lucide-react';

function Companies() {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);

    async function getCompanies() {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/company");
            const data = await response.json();
            setCompanies(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCompanies();
    }, []);

    function deleteCompany(id) {
        if (!window.confirm("CRITICAL ACTION: Are you sure you want to delete this company? All associated data will be lost.")) return;
        
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/post/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                getCompanies();
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
                            <h2 className="brand-title h3 mb-0">PARTNER DIRECTORY</h2>
                            <p className="text-success small fw-bold mb-0">Verified Game Studios</p>
                        </div>
                    </div>
                    
                    <button className="btn-login py-2 px-4 d-flex align-items-center gap-2 border-success" 
                            style={{borderColor: '#198754'}}
                            onClick={() => navigate('/new_company')}>
                        <PlusSquare size={18} /> Add Studio
                    </button>
                </div>

                {/* Table */}
                <div className="admin-table-wrapper border border-success rounded-4 overflow-hidden shadow-lg">
                    <table className="table table-dark table-hover mb-0 align-middle">
                        <thead className="bg-black border-bottom border-success">
                            <tr>
                                <th className="p-4 text-success small fw-bold"><Hash size={14} /> ID</th>
                                <th className="p-4 text-success small fw-bold">STUDIO</th>
                                <th className="p-4 text-success small fw-bold"><Mail size={14} /> CONTACT</th>
                                <th className="p-4 text-success small fw-bold"><Globe size={14} /> WEBSITE</th>
                                <th className="p-4 text-success small fw-bold text-center">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company) => (
                                <tr key={company.id} className="admin-table-row">
                                    <td className="p-4 fw-mono text-secondary">#{company.id}</td>
                                    <td className="p-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="company-logo-mini rounded-circle border border-success overflow-hidden d-flex align-items-center justify-content-center bg-black" 
                                                 style={{width: '45px', height: '45px'}}>
                                                {company.logo_img ? (
                                                    <img src={company.logo_img} alt="logo" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                                                ) : (
                                                    <Building2 size={20} className="text-success opacity-50" />
                                                )}
                                            </div>
                                            <div>
                                                <span className="text-white fw-bold d-block">{company.name}</span>
                                                <small className="text-secondary d-inline-block text-truncate" style={{maxWidth: '150px'}}>
                                                    {company.description || "No description provided"}
                                                </small>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-secondary small">
                                        {company.email}
                                    </td>
                                    <td className="p-4">
                                        {company.website_url ? (
                                            <a href={company.website_url} target="_blank" rel="noreferrer" className="text-info text-decoration-none small d-flex align-items-center gap-1">
                                                <Globe size={12} /> Visit Site
                                            </a>
                                        ) : (
                                            <span className="text-muted small">N/A</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link to={"/company/" + company.id} className="btn-action btn-view" title="Studio Profile">
                                                <Eye size={18} />
                                            </Link>
                                            <button className="btn-action btn-edit" onClick={() => navigate('/update_company/' + company.id)} title="Edit Studio">
                                                <Edit3 size={18} />
                                            </button>
                                            <button className="btn-action btn-delete" onClick={() => deleteCompany(company.id)} title="Terminate Partnership">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {companies.length === 0 && (
                        <div className="text-center py-5">
                            <p className="text-secondary">No registered companies in the mainframe.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Companies