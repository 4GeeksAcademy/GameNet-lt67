import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MessageSquare, ArrowLeft, ExternalLink, Calendar } from 'lucide-react';
import useGlobalReducer from "../../hooks/useGlobalReducer";

function MyComments() {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const [myComments, setMyComments] = useState([]);
    const userId = store.user?.id;

    const getMyComments = async () => {
        if (!userId) return;
        try {
           
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}/comments`);
            if (response.ok) {
                const data = await response.json();
                setMyComments(data);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        getMyComments();
    }, [userId]);

    return (
        <div className="container mt-5 mb-5 p-4 favorites-container shadow-lg">
 
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="m-0 d-flex align-items-center gap-3 text-white">
                    <div className="logo-box" style={{ width: '40px', height: '40px', fontSize: '20px', background: 'linear-gradient(45deg, #00dbde, #fc00ff)' }}>
                        <MessageSquare size={20} color="white" />
                    </div>
                    My Activity: Comments
                </h2>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} /> Back
                </button>
            </div>

            
            <div className="row">
                {myComments.length > 0 ? (
                    myComments.map((comment) => (
                        <div key={comment.id} className="col-12 mb-3">
                            <div className="card game-card-custom border-0 bg-dark shadow-sm">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="p-2 rounded bg-secondary bg-opacity-25">
                                                <MessageSquare size={16} className="text-info" />
                                            </div>
                                            <span className="text-secondary small">You commented on:</span>
                                            <span className="text-info fw-bold small">{comment.post_company || "Game Post"}</span>
                                        </div>
                                        <Link to={"/post/" + comment.post_id} className="btn btn-sm btn-outline-light opacity-50 hover-opacity-100">
                                            <ExternalLink size={14} /> View Post
                                        </Link>
                                    </div>

                                  
                                    <blockquote className="blockquote mb-3">
                                        <p className="text-light fs-6 italic">"{comment.text}"</p>
                                    </blockquote>

                                    
                                    <div className="d-flex align-items-center gap-2 text-muted small">
                                        <Calendar size={12} />
                                        <span>{comment.created_at || "Recently"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <MessageSquare size={48} className="text-secondary mb-3 opacity-20" />
                        <p className="text-secondary fs-5">You haven't shared your thoughts yet.</p>
                        <button className="btn btn-gradient mt-2" onClick={() => navigate('/')}>
                            Join the conversation
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyComments;