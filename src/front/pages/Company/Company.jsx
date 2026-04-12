import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
    ArrowLeft, Globe, Mail, Info, 
    ExternalLink, ShieldCheck, Building2, Map 
} from 'lucide-react';

function Company() {
    const navigate = useNavigate();
    const [company, setCompany] = useState({});
    const { companyId } = useParams();

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/company/" + companyId);
                const data = await response.json();
                setCompany(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCompany();
    }, [companyId]);

    return (
        <div className="admin-page-container min-vh-100" style={{ backgroundColor: '#050608', color: '#f8f9fa' }}>
            {/* Header: Banner de la Empresa */}
            <div className="company-hero-banner position-relative" style={{ 
                height: '35vh', 
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), #050608), url(${company.banner_img || 'https://via.placeholder.com/1500x500'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="container h-100 position-relative">
                    <button onClick={() => navigate("/company")} className="btn-back-circle position-absolute top-0 start-0 mt-4 ms-3">
                        <ArrowLeft size={24} />
                    </button>
                    
                    {/* Logo Flotante */}
                    <div className="company-logo-profile shadow-lg border border-3 border-dark rounded-4 overflow-hidden bg-white d-flex align-items-center justify-content-center" style={{ 
                        width: '150px', 
                        height: '150px', 
                        position: 'absolute', 
                        bottom: '-75px', 
                        left: '20px' 
                    }}>
                        {company.logo ? (
                            <img src={company.logo} alt="Logo" className="img-fluid" />
                        ) : (
                            <Building2 size={60} className="text-dark opacity-25" />
                        )}
                    </div>
                </div>
            </div>

            <div className="container mt-5 pt-4">
                <div className="row g-4 mt-2">
                    {/* Columna Izquierda: Identidad */}
                    <div className="col-lg-4">
                        <div className="admin-card-wrapper p-4 border-0 bg-dark-soft rounded-4 shadow-sm h-100">
                            <div className="mb-4">
                                <h2 className="fw-black mb-1 d-flex align-items-center gap-2">
                                    {company.name} 
                                    {company.verified && <ShieldCheck size={24} className="text-warning" />}
                                </h2>
                                <p className="text-primary fw-bold small uppercase tracking-widest">Official Partner Identity</p>
                            </div>

                            <div className="d-grid gap-3">
                                <div className="contact-item d-flex align-items-center gap-3 p-2 rounded-3 hover-bg-light">
                                    <Mail size={20} className="text-secondary" />
                                    <div>
                                        <small className="d-block text-secondary fw-bold">Email Address</small>
                                        <span className="text-white-50">{company.email}</span>
                                    </div>
                                </div>

                                <div className="contact-item d-flex align-items-center gap-3 p-2 rounded-3 hover-bg-light">
                                    <Globe size={20} className="text-secondary" />
                                    <div>
                                        <small className="d-block text-secondary fw-bold">Digital Presence</small>
                                        <a href={company.website_url} target="_blank" rel="noreferrer" className="text-primary text-decoration-none d-flex align-items-center gap-1">
                                            Visit Website <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="contact-item d-flex align-items-center gap-3 p-2 rounded-3 hover-bg-light">
                                    <Map size={20} className="text-secondary" />
                                    <div>
                                        <small className="d-block text-secondary fw-bold">Entity Index</small>
                                        <span className="text-white-50">PARTNER_ID: {companyId}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Descripción y Otros */}
                    <div className="col-lg-8">
                        <div className="admin-card-wrapper p-4 border-0 bg-dark-soft rounded-4 shadow-sm mb-4">
                            <h5 className="text-primary fw-bold mb-4 d-flex align-items-center gap-2">
                                <Info size={20} /> ABOUT THE ORGANIZATION
                            </h5>
                            <p className="lead-description text-secondary-emphasis lh-lg">
                                {company.description || "The organization has not provided a public profile description yet."}
                            </p>
                        </div>

                        {/* Botón de Retorno Estilizado */}
                        <div className="d-flex justify-content-end">
                            <button onClick={() => navigate("/company")} className="btn btn-outline-primary px-5 py-2 fw-bold rounded-pill text-uppercase tracking-widest">
                                Return to List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Company;