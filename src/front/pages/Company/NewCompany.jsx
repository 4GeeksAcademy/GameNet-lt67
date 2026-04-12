import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Building2, Mail, Lock, Globe, 
    Image as ImageIcon, FileText, CheckCircle2, 
    ArrowLeft, PlusCircle, Layout 
} from "lucide-react";

function NewCompany() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [logo, setLogo] = useState('');
    const [banner, setBanner] = useState('');
    const [verified, setVerified] = useState(false);

    async function sendData(e) {
        e.preventDefault();
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password,
                "description": description,
                "website_url": website,
                "logo": logo,
                "banner_img": banner,
                "verified": verified 
            })
        };

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/company", requestOptions);
            if (response.ok) {
                navigate("/company");
            } else {
                const errorData = await response.json();
                console.error("Failed to create company:", errorData.msg);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    }

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#08090a' }}>
            <div className="container">
                
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between mb-5 px-lg-5">
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={() => navigate("/company")} className="btn-back-control border-0 bg-transparent">
                            <ArrowLeft size={28} className="text-white opacity-75" />
                        </button>
                        <div>
                            <h2 className="brand-title h3 mb-0 text-white fw-bold">PARTNER REGISTRATION</h2>
                            <p className="text-primary-emphasis small fw-bold mb-0 d-flex align-items-center gap-2">
                                <Building2 size={14} /> REGISTERING NEW CORPORATE ENTITY
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <form className="admin-card-wrapper p-4 p-lg-5 border border-secondary-subtle rounded-4 bg-dark-soft shadow-lg" onSubmit={sendData}>
                            
                            <div className="row g-4">
                                {/* Seccion: Identidad Básica */}
                                <div className="col-12">
                                    <h6 className="text-uppercase tracking-wider text-secondary small fw-black mb-3">Identity & Credentials</h6>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label text-white-50 small fw-bold"><Building2 size={14} className="me-1"/> COMPANY NAME</label>
                                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control custom-input-dark" placeholder="e.g. Nintendo" required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-white-50 small fw-bold"><Mail size={14} className="me-1"/> CORPORATE EMAIL</label>
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control custom-input-dark" placeholder="contact@company.com" required />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label text-white-50 small fw-bold"><Lock size={14} className="me-1"/> ACCESS PASSWORD</label>
                                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control custom-input-dark" placeholder="••••••••" required />
                                        </div>
                                    </div>
                                </div>

                                {/* Seccion: Presencia Digital */}
                                <div className="col-12 mt-5">
                                    <h6 className="text-uppercase tracking-wider text-secondary small fw-black mb-3">Digital Assets</h6>
                                    <div className="row g-3">
                                        <div className="col-md-12">
                                            <label className="form-label text-white-50 small fw-bold"><Globe size={14} className="me-1"/> OFFICIAL WEBSITE</label>
                                            <input value={website} onChange={(e) => setWebsite(e.target.value)} type="text" className="form-control custom-input-dark" placeholder="https://www.company.com" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-white-50 small fw-bold"><ImageIcon size={14} className="me-1"/> LOGO URL</label>
                                            <input value={logo} onChange={(e) => setLogo(e.target.value)} type="text" className="form-control custom-input-dark" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-white-50 small fw-bold"><Layout size={14} className="me-1"/> BANNER URL</label>
                                            <input value={banner} onChange={(e) => setBanner(e.target.value)} type="text" className="form-control custom-input-dark" />
                                        </div>
                                    </div>
                                </div>

                                {/* Seccion: Detalles */}
                                <div className="col-12 mt-5">
                                    <h6 className="text-uppercase tracking-wider text-secondary small fw-black mb-3">Corporate Profile</h6>
                                    <div className="mb-4">
                                        <label className="form-label text-white-50 small fw-bold"><FileText size={14} className="me-1"/> DESCRIPTION</label>
                                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control custom-input-dark" rows="3" placeholder="Tell the community about your company..."></textarea>
                                    </div>

                                    <div className="verification-switch-box p-3 rounded-3 d-flex align-items-center justify-content-between border border-primary-subtle bg-primary-transparent">
                                        <div className="d-flex align-items-center gap-3">
                                            <CheckCircle2 size={24} className={verified ? "text-warning" : "text-white-50"} />
                                            <div>
                                                <p className="m-0 fw-bold text-white small">Verified Partner Status</p>
                                                <p className="m-0 text-white-50 x-small">Official badge will be displayed on all your games.</p>
                                            </div>
                                        </div>
                                        <div className="form-check form-switch m-0">
                                            <input 
                                                className="form-check-input custom-switch" 
                                                type="checkbox" 
                                                role="switch" 
                                                checked={verified}
                                                onChange={(e) => setVerified(e.target.checked)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 mt-5">
                                    <button type="submit" className="btn-brand-primary w-100 py-3 d-flex align-items-center justify-content-center gap-2 shadow-lg">
                                        <PlusCircle size={20} /> AUTHORIZE & CREATE ENTITY
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewCompany;