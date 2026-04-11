import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                "verified": verified // Now sending the verified status
            })
        };

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/company", requestOptions);
            if (response.ok) {
                const result = await response.json();
                console.log("Company created:", result);
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
        <div className="container mt-5 text-white">
            <h1 className="mb-4">Register Your Company</h1>
            <form className="w-75 mx-auto bg-dark p-4 rounded-3 border border-secondary" onSubmit={sendData}>
                <div className="row">
                    {/* Basic Info */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Company Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control bg-dark text-white border-secondary" required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Email Address</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control bg-dark text-white border-secondary" required />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control bg-dark text-white border-secondary" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control bg-dark text-white border-secondary" rows="3"></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Website URL</label>
                    <input value={website} onChange={(e) => setWebsite(e.target.value)} type="text" className="form-control bg-dark text-white border-secondary" placeholder="https://..." />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Logo URL</label>
                        <input value={logo} onChange={(e) => setLogo(e.target.value)} type="text" className="form-control bg-dark text-white border-secondary" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Banner URL</label>
                        <input value={banner} onChange={(e) => setBanner(e.target.value)} type="text" className="form-control bg-dark text-white border-secondary" />
                    </div>
                </div>

                {/* Verification Toggle (Usually for Admin use, but here for your setup) */}
                <div className="mb-4 form-check form-switch">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        role="switch" 
                        id="verifiedSwitch"
                        checked={verified}
                        onChange={(e) => setVerified(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="verifiedSwitch">Verified Official Company</label>
                </div>

                <div className="d-flex gap-3">
                    <button type="submit" className="btn btn-primary px-5">Create Company</button>
                    <button type="button" onClick={() => navigate("/company")} className="btn btn-outline-secondary">Go Back</button>
                </div>
            </form>
        </div>
    );
}

export default NewCompany;