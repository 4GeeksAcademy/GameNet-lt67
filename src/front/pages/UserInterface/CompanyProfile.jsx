import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Send, Image as ImageIcon, Type, AlertCircle, BadgeCheck, Globe } from "lucide-react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { PostCard } from "../../components/PostCard";

export const CompanyProfile = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const {companyId} = useParams()


    const [companyPosts, setCompanyPosts] = useState([]);

    const [companyData, setCompanyData] = useState(null);

    const fetchCompanyProfile = async () => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/company/${companyId}`)
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
        if(companyId){
        fetchCompanyProfile();
        fetchCompanyPosts();
        }
    }, []);

    const fetchCompanyPosts = async () => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/company/${companyId}`);
            if (resp.ok) {
                const data = await resp.json();
                setCompanyPosts(data);
            }
        } catch (error) {
            console.error("Error al cargar posts:", error);
        }
    };

    return (
        <>
        <div className="container py-5 min-vh-100">
            <div className="row justify-content-center">
                <div className="col-lg-8">

                    
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




                    <div className="posts-section">
                        <h5 className="text-secondary text-uppercase mb-4" style={{ letterSpacing: '2px' }}>
                            Posts
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
                                        data={post.id}                 
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
        </>
    );
};