import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
    Building2, Mail, Globe, Image as ImageIcon, 
    FileText, Save, ArrowLeft, Layout, 
    ShieldCheck, RefreshCcw 
} from "lucide-react";

function UpdateCompany() {
    const { companyId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [logo, setLogo] = useState('');
    const [banner, setBanner] = useState('');

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/company/" + companyId)
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setEmail(data.email);
                setDescription(data.description);
                setWebsite(data.website_url);
                setLogo(data.logo_img);
                setBanner(data.banner_img);
            })
            .catch((error) => console.log(error));
    }, [companyId]);

    function sendData(e) {
        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "description": description,
                "website_url": website,
                "logo_img": logo,
                "banner_img": banner
            })
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/company/" + companyId, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        navigate("/company");
    }

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0b0d' }}>
            <div className="container">
                
                {/* Header Section */}
                <div className="d-flex align-items-center justify-content-between mb-5 px-lg-4">
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={() => navigate("/company")} className="btn-back-control border-0 bg-transparent">
                            <ArrowLeft size={28} className="text-white opacity-75" />
                        </button>
                        <div>
                            <h2 className="brand-title h3 mb-0 text-white fw-bold">UPDATE ENTITY</h2>
                            <p className="text-primary small fw-bold mb-0 d-flex align-items-center gap-2">
                                <RefreshCcw size={14} /> MODIFYING PARTNER: {name.toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Left Column: Brand Assets Preview */}
                    <div className="col-lg-4">
                        <div className="admin-card-wrapper p-4 border border-secondary rounded-4 bg-dark-soft h-100 shadow">
                            <h6 className="text-primary fw-bold mb-4 uppercase small tracking-widest">Brand Assets</h6>
                            
                            {/* Logo Preview */}
                            <div className="mb-4 text-center">
                                <label className="text-white-50 small d-block mb-2">Corporate Logo</label>
                                <div className="logo-preview-box mx-auto rounded-circle d-flex align-items-center justify-content-center border border-secondary overflow-hidden bg-black" style={{ width: '120px', height: '120px' }}>
                                    {logo ? <img src={logo} alt="Logo" className="img-fluid" /> : <Building2 size={40} className="text-secondary" />}
                                </div>
                            </div>

                            {/* Banner Preview */}
                            <div className="text-center">
                                <label className="text-white-50 small d-block mb-2">Profile Banner</label>
                                <div className="banner-preview-box rounded-3 border border-secondary overflow-hidden bg-black" style={{ height: '100px' }}>
                                    {banner ? <img src={banner} alt="Banner" className="w-100 h-100 object-fit-cover" /> : <Layout size={30} className="text-secondary mt-4" />}
                                </div>
                            </div>

                            <div className="mt-4 p-3 rounded-3 bg-primary-transparent border border-primary-subtle">
                                <p className="x-small text-primary-emphasis m-0 d-flex align-items-center gap-2">
                                    <ShieldCheck size={14} /> ID: {companyId} | Verified Data Access
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="col-lg-8">
                        <form className="admin-card-wrapper p-4 p-lg-5 border border-primary-subtle rounded-4 bg-dark-soft shadow-lg" onSubmit={sendData}>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label className="form-label text-primary small fw-bold"><Building2 size={14} className="me-1"/> COMPANY NAME</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control custom-input-dark" required />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className="form-label text-primary small fw-bold"><Mail size={14} className="me-1"/> CORPORATE EMAIL</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control custom-input-dark" required />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className="form-label text-primary small fw-bold"><Globe size={14} className="me-1"/> WEBSITE URL</label>
                                    <input value={website} onChange={(e) => setWebsite(e.target.value)} type="text" className="form-control custom-input-dark" />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-primary small fw-bold"><ImageIcon size={14} className="me-1"/> LOGO ASSET (URL)</label>
                                    <input value={logo} onChange={(e) => setLogo(e.target.value)} type="text" className="form-control custom-input-dark" />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-primary small fw-bold"><Layout size={14} className="me-1"/> BANNER ASSET (URL)</label>
                                    <input value={banner} onChange={(e) => setBanner(e.target.value)} type="text" className="form-control custom-input-dark" />
                                </div>

                                <div className="col-md-12 mb-4">
                                    <label className="form-label text-primary small fw-bold"><FileText size={14} className="me-1"/> CORPORATE DESCRIPTION</label>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control custom-input-dark" rows="4"></textarea>
                                </div>
                            </div>

                            <button type="submit" className="btn-brand-primary w-100 py-3 d-flex align-items-center justify-content-center gap-2">
                                <Save size={20} /> SYNCHRONIZE ENTITY DATA
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateCompany