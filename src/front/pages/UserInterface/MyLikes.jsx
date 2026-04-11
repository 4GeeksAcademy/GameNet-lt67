import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, ArrowLeft, MessageSquare, ExternalLink } from 'lucide-react';
import useGlobalReducer from "../../hooks/useGlobalReducer";

function MyLikes() {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const [likedPosts, setLikedPosts] = useState([]);
    const userId = store.user?.id;

    const getLikedPosts = async () => {
        if (!userId) return;
        try {
            // Asegúrate de tener este endpoint en tu backend
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}/likes`);
            if (response.ok) {
                const data = await response.json();
                setLikedPosts(data);
            }
        } catch (error) {
            console.error("Error fetching likes:", error);
        }
    };

    useEffect(() => {
        getLikedPosts();
    }, [userId]);

    const removeLike = async (postId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${postId}/like/${userId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setLikedPosts(prev => prev.filter(post => post.id !== postId));
            }
        } catch (error) {
            console.error("Error removing like:", error);
        }
    };

    return (
        <div className="container mt-5 mb-5 p-4 favorites-container shadow-lg">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="m-0 d-flex align-items-center gap-3 text-white">
                    <div className="logo-box" style={{ width: '40px', height: '40px', fontSize: '20px', background: 'linear-gradient(45deg, #ff0055, #ff5e00)' }}>
                        <Heart size={20} color="white" fill="white" />
                    </div>
                    My Liked Posts
                </h2>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate('/')}>
                    <ArrowLeft size={16} /> Back
                </button>
            </div>

            {/* Grid de Posts */}
            <div className="row">
                {likedPosts.length > 0 ? (
                    likedPosts.map((post) => (
                        <div key={post.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card game-card-custom h-100 shadow-sm overflow-hidden border-0 bg-dark">

                                {/* Imagen del Post con Link al Detalle */}
                                <Link to={"/post/" + post.id} className="text-decoration-none">
                                    <div className="position-relative">
                                        <img
                                            src={post.content.image}
                                            className="card-img-top"
                                            alt="Post content"
                                            style={{ height: "160px", objectFit: "cover" }}
                                        />
                                        <div className="image-overlay-info">
                                            <ExternalLink size={24} color="white" />
                                        </div>
                                    </div>
                                </Link>

                                <div className="card-body p-3">
                                    <Link to={"/post/" + post.id} className="text-decoration-none">
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <img
                                                src={post.company.logo}
                                                alt="company"
                                                className="rounded-circle"
                                                style={{ width: '20px', height: '20px' }}
                                            />
                                            <span className="text-info small fw-bold">{post.company_name}</span>
                                        </div>
                                        <p className="text-light small mb-3 text-truncate-2">
                                    
                                                {post.content.text}
                                        </p>
                                    </Link>

                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-remove flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                            onClick={() => removeLike(post.id)}
                                        >
                                            <Heart size={14} fill="currentColor" /> Unlike
                                        </button>
                                        <Link to={"/post/" + post.id} className="btn btn-outline-primary p-2">
                                            <MessageSquare size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <p className="text-secondary fs-5">No posts liked yet.</p>
                        <button className="btn btn-gradient mt-2" onClick={() => navigate('/')}>
                            Explore Feed
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyLikes;