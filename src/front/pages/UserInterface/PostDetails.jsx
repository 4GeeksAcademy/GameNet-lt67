import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostCard } from "../../components/PostCard";
import { ArrowLeft } from "lucide-react";

function PostDetails() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [companyPost, setCompanyPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPostDetails = async () => {
            
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${postId}`, {
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json",
                        
                        "Authorization": token ? `Bearer ${token}` : "" 
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCompanyPost(data);
                } else {
                    
                    console.error("Error: Post no encontrado o sesión expirada");
                }
            } catch (error) {
                console.log("Error de red:", error);
            } finally {
                setLoading(false);
            }
        };

        if (postId) {
            getPostDetails();
        }
    }, [postId]);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <div className="spinner-border text-info" role="status"></div>
        </div>
    );

    if (!companyPost) return (
        <div className="container text-center mt-5 text-white">
            <h3>Post not found</h3>
            <button onClick={() => navigate("/")} className="btn btn-primary mt-3">Go to Home</button>
        </div>
    );

    return (
        <div className="container mt-4 pb-5">
            <button
                onClick={() => navigate(-1)} 
                className="btn btn-link text-secondary d-flex align-items-center gap-2 mb-4 text-decoration-none"
            >
                <ArrowLeft size={20} />
                <span>Volver</span>
            </button>

            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">

                    <PostCard
                        id={companyPost.id}
                        company={companyPost.company}
                        content={companyPost.content}
                        timestamp={companyPost.timestamp}
                        stats={companyPost.stats}
                        user_liked={companyPost.user_liked}
                    />
                </div>
            </div>
        </div>
    );
}

export default PostDetails;