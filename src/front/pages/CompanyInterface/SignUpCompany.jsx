import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Mail, Lock, User, UserPlus, Globe, Image, FileText, Camera 
} from 'lucide-react'; 
import useGlobalReducer from "../../hooks/useGlobalReducer";

function SignUpCompany() {
    // Estados actualizados según tus campos
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [logo, setLogo] = useState("");
    const [banner, setBanner] = useState("");

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const sendData = async (e) => {
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
                "banner_img": banner
            })
        };
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/company/signup", requestOptions);
            if (response.ok) {
                navigate("/company/login");
            }
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    };

    return (
        <div className="login-page py-5">
            
            <div className="login-card p-4 p-md-5" style={{ maxWidth: '800px' }}>
                
                <div className="text-center mb-4">
                    <div className="logo-box-wrapper d-inline-flex mb-3">
                        <div className="logo-glow"></div>
                        <div className="logo-box">
                            <span className="logo-letter">G</span>
                        </div>
                    </div>
                    <h1 className="brand-title h2">Business Partner</h1>
                    <p className="text-secondary small">Register your company and start publishing updates.</p>
                </div>

                <form onSubmit={sendData}>
                    <div className="row">
                        
                        <div className="col-md-6 d-flex flex-column gap-3">
                            <h6 className="text-info small fw-bold mb-2">ACCOUNT DETAILS</h6>
                            
                            <div className="search-bar-wrapper">
                                <User size={18} className="search-icon" />
                                <input 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    type="text" 
                                    className="form-control custom-input w-100" 
                                    placeholder="Company Name (e.g. Nintendo)"
                                    required
                                />
                            </div>

                            <div className="search-bar-wrapper">
                                <Mail size={18} className="search-icon" />
                                <input 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    type="email" 
                                    className="form-control custom-input w-100" 
                                    placeholder="Corporate Email"
                                    required
                                />
                            </div>

                            <div className="search-bar-wrapper">
                                <Lock size={18} className="search-icon" />
                                <input 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type="password" 
                                    className="form-control custom-input w-100" 
                                    placeholder="Security Password"
                                    required
                                />
                            </div>

                            <div className="search-bar-wrapper">
                                <Globe size={18} className="search-icon" />
                                <input 
                                    value={website} 
                                    onChange={(e) => setWebsite(e.target.value)} 
                                    type="url" 
                                    className="form-control custom-input w-100" 
                                    placeholder="Official Website (https://...)"
                                />
                            </div>
                        </div>

                        {/* COLUMNA DERECHA: Branding */}
                        <div className="col-md-6 d-flex flex-column gap-3 mt-4 mt-md-0">
                            <h6 className="text-info small fw-bold mb-2">BRANDING & ASSETS</h6>
                            
                            <div className="search-bar-wrapper">
                                <FileText size={18} className="search-icon" />
                                <textarea 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    className="form-control custom-input w-100" 
                                    placeholder="Brief company description..."
                                    style={{ height: '42px', paddingTop: '8px' }}
                                />
                            </div>

                            <div className="search-bar-wrapper">
                                <Camera size={18} className="search-icon" />
                                <input 
                                    value={logo} 
                                    onChange={(e) => setLogo(e.target.value)} 
                                    type="text" 
                                    className="form-control custom-input w-100" 
                                    placeholder="Logo URL (Image Link)"
                                />
                            </div>

                            <div className="search-bar-wrapper">
                                <Image size={18} className="search-icon" />
                                <input 
                                    value={banner} 
                                    onChange={(e) => setBanner(e.target.value)} 
                                    type="text" 
                                    className="form-control custom-input w-100" 
                                    placeholder="Banner URL (Landscape)"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Botón de Registro Principal centrado */}
                    <div className="text-center">
                        <button type="submit" className="btn-login mt-4 w-50">
                            <UserPlus size={20} className="me-2" />
                            Register Company
                        </button>

                        <p className="text-secondary small mt-4">
                            By registering, you agree to our <span className="text-white">Terms of Service</span>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpCompany;