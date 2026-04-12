import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Image as ImageIcon, Type, AlertCircle, BadgeCheck, Globe } from "lucide-react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { PostCard } from "../../components/PostCard";

export const CompanyDashboard = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const companyId = store.company?.id;


    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");
    const [contentType, setContentType] = useState("update");
    const [companyPosts, setCompanyPosts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [companyData, setCompanyData] = useState(null);

    const fetchCompanyProfile = async () => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/company/me`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token_company")}`
                }
            });
            if (resp.ok) {
                const data = await resp.json();
                console.log("Datos recibidos:", data); 
                setCompanyData(data);
            }
        } catch (error) {
            console.error("Error al cargar perfil:", error);
        }
    };

    useEffect(() => {
        fetchCompanyProfile();
    }, []);

    useEffect(() => {
        if (companyId) fetchCompanyProfile();
    }, [companyId]);

    useEffect(() => {
        if (!store.auth_company) {
            navigate("/");
        } else {
            fetchMyPosts();
        }
    }, [store.auth_company]);

    const fetchMyPosts = async () => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/company/posts`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token_company")}` }
            });
            if (resp.ok) {
                const data = await resp.json();
                setCompanyPosts(data);
            }
        } catch (error) {
            console.error("Error al cargar posts:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const postData = {
            "id_company": companyId,
            "message": message,
            "image": image,
            "content_type": contentType
        };

        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token_company")}`
                },
                body: JSON.stringify(postData)
            });

            if (resp.ok) {
                setMessage("");
                setImage("");
                setContentType("update");
                fetchMyPosts();
            }
        } catch (error) {
            console.error("Error al crear post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        {store.auth_company?
        <div className="container py-5 min-vh-100">
            <div className="row justify-content-center">
                <div className="col-lg-8">

                    {/* SECCIÓN DE PERFIL ESTILO GAMENET */}
                    <div className="company-profile-section mb-5 overflow-hidden">
                        <div className="profile-banner-container">
                            <img
                                src={companyData?.banner_img}
                                className="banner-img"
                                alt="Banner"
                            />
                            <div className="banner-gradient-overlay"></div>
                        </div>

                        <div className="profile-content-box p-4 bg-black border border-secondary border-top-0 rounded-bottom-4 shadow-lg position-relative">
                            <div className="company-logo-overlap">
                                <img
                                    src={companyData?.logo}
                                    alt="Logo"
                                    className="img-fluid rounded-3 border border-3 border-black shadow-neon"
                                />
                            </div>

                            <div className="mt-5 pt-2">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h2 className="text-white fw-bold mb-0 d-flex align-items-center gap-2">
                                            {companyData?.name}
                                            {companyData?.verified && <BadgeCheck className="text-info" size={24} />}
                                        </h2>
                                        <p className="text-info small mb-3">{companyData?.email}</p>
                                    </div>
                                    
                                </div>

                                <p className="text-secondary mt-2 mb-4" style={{ maxWidth: '90%' }}>
                                    {companyData?.description || "No company description available."}
                                </p>

                                <div className="d-flex gap-4 border-top border-secondary pt-3 mt-2">
                                    {companyData?.website_url && (
                                        <a href={companyData.website_url} target="_blank" className="text-decoration-none text-secondary small d-flex align-items-center gap-1 hover-info">
                                            <Globe size={14} /> {companyData.website_url.replace("https://", "")}
                                        </a>
                                    )}
                                    <span className="text-secondary small d-flex align-items-center gap-1">
                                        <AlertCircle size={14} /> Official Representative
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="gamenet-post-container mb-5 animate-fade-in">
                        
                        <div className="gamenet-card-glow"></div>

                        <div className="card bg-black border-0 shadow-lg gamenet-glass-card">
                            <div className="card-body p-4 position-relative">
                               
                                <h4 className="gamenet-gradient-text mb-4 d-flex align-items-center gap-3">
                                    <div className="icon-box-neon">
                                        <Send size={20} />
                                    </div>
                                    <span>Create New Update</span>
                                </h4>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4 position-relative">
                                        <textarea
                                            className="form-control gamenet-input neon-border-focus"
                                            rows="3"
                                            placeholder="What's the latest in the gaming world?..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="row g-4 mb-4">
                                        <div className="col-md-6">
                                            <div className="gamenet-input-group">
                                                <label className="small text-info text-uppercase fw-bold mb-2 d-block">Media URL</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-transparent border-end-0 text-info border-secondary">
                                                        <ImageIcon size={18} />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control gamenet-input border-start-0"
                                                        placeholder="https://..."
                                                        value={image}
                                                        onChange={(e) => setImage(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="gamenet-input-group">
                                                <label className="small text-info text-uppercase fw-bold mb-2 d-block">Content Type</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-transparent border-end-0 text-info border-secondary">
                                                        <Type size={18} />
                                                    </span>
                                                    <select
                                                        className="form-select gamenet-input border-start-0"
                                                        value={contentType}
                                                        onChange={(e) => setContentType(e.target.value)}
                                                    >
                                                        <option value="update">Update</option>
                                                        <option value="announcement">Announcement</option>
                                                        <option value="release">Release</option>
                                                        <option value="event">Event</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end align-items-center gap-3">
                                        {image && <span className="text-success small fw-bold">✓ Image attached</span>}
                                        <button
                                            type="submit"
                                            className="btn-gamenet-rgb"
                                            disabled={isSubmitting}
                                        >
                                            <span>{isSubmitting ? "TRANSMITTING..." : "PUBLISH POST"}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                    <div className="posts-section">
                        <h5 className="text-secondary text-uppercase mb-4" style={{ letterSpacing: '2px' }}>
                            Manage Your Posts
                        </h5>
                        <div className="d-flex flex-column gap-4">
                            {companyPosts.length > 0 ? (
                                companyPosts.map((post) => (
                                    <PostCard
                                        key={post.id}
                                        id={post.id}
                                        company={post.company}      
                                        content={post.content}      
                                        timestamp={post.timestamp}  
                                        stats={post.stats}          
                                        user_liked={post.user_liked}
                                        data={post}                 
                                    />
                                ))
                            ) : (
                                <div className="text-center py-5 border border-secondary rounded border-dashed">
                                    <AlertCircle size={40} className="text-secondary mb-3" />
                                    <p className="text-secondary">No posts yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
        :navigate("/company/login")}
        </>
    );
};