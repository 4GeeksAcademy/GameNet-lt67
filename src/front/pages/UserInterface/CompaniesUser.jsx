import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Globe, Building2, ExternalLink, BadgeCheck } from 'lucide-react';

function CompaniesUser() {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);

    async function getCompanies() {
        try {
            
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/company");
            if (response.ok) {
                const data = await response.json();
                setCompanies(data);
            }
        } catch (error) {
            console.log("Error fetching companies:", error);
        }
    }

    useEffect(() => {
        getCompanies();
    }, []);

    return (
        <div className="container py-5 min-vh-100">
            <div className="d-flex align-items-center gap-3 mb-5">
                <Building2 size={40} className="text-pink" />
                <h1 className="brand-title h1 mb-0" style={{ fontSize: '3rem' }}>Company Partners</h1>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                {companies.map((company) => (
                    <div className="col" key={company.id}>
                        
                        <div 
                            className="card gamenet-company-card h-100 border-0 overflow-hidden"
                            onClick={() => navigate("/company-profile/" + company.id)}
                            style={{ cursor: 'pointer' }}
                        >
                          
                            <div className="company-card-banner">
                                <img 
                                    src={company.banner_img || "https://via.placeholder.com/400x150/111111/ec4899?text=GameNet"} 
                                    alt="Banner" 
                                    className="banner-img-card"
                                />
                                <div className="banner-overlay"></div>
                            </div>

                            <div className="card-body p-4 pt-0 position-relative">
                               
                                <div className="company-card-logo-wrapper">
                                    <img 
                                        src={company.logo} 
                                        alt={company.name} 
                                        className="company-card-logo shadow-neon"
                                    />
                                </div>

                                <div className="mt-5">
                                    <h2 className="gamenet-card-title h4 mb-1 d-flex align-items-center gap-2">
                                        {company.name}
                                        {company.verified && <BadgeCheck size={18} className="text-info" />}
                                    </h2>
                                    <p className="text-pink small fw-bold mb-3">{company.email}</p>

                                    <p className="gamenet-description text-secondary mb-4 line-clamp-2">
                                        {company.description || "Leading the future of gaming experiences and innovation."}
                                    </p>

                                    <div className="d-flex align-items-center justify-content-between mt-auto pt-3 border-top border-secondary-subtle">
                                        <div className="d-flex align-items-center gap-2 text-secondary small">
                                            <Globe size={14} /> 
                                            <span>Visit Headquarters</span>
                                        </div>
                                        <ExternalLink size={16} className="text-pink" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CompaniesUser;