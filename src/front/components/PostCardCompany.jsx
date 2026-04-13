import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Send, Trash2 } from 'lucide-react';

export function PostCardCompany({ id, company, content, timestamp, stats, user_liked, data, getpost }) {
  
    const [liked, setLiked] = useState(user_liked);
    const [localStats, setLocalStats] = useState(stats);
    const [bookmarked, setBookmarked] = useState(false);
   
       // Estados de comentarios
       const [showComments, setShowComments] = useState(false);
       const [commentsList, setCommentsList] = useState([]);
       const [commentText, setCommentText] = useState("");
       const [isSubmitting, setIsSubmitting] = useState(false);
       const [loadingComments, setLoadingComments] = useState(false);


    if (!company || !content) return null;

    
    const fetchComments = async () => {
        setLoadingComments(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${id}/comments`);
            if (response.ok) {
                const data = await response.json();
                setCommentsList(data);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoadingComments(false);
        }
    };


async function deleteCompanyPost(id) {
        if (!window.confirm("SYSTEM WARNING: Are you sure you want to delete this broadcast? This action cannot be undone.")) return;

        const requestOptions = { method: "DELETE" };
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${id}`, requestOptions);
            if (response.ok) {
                getpost(); 
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

useEffect(() => {
    setLiked(user_liked);
}, [user_liked]);

useEffect(() => {
    if (showComments) {
        fetchComments();
    }
}, [showComments]);


const badgeClasses = {
    release: 'badge-release',
    update: 'badge-update',
    announcement: 'badge-announcement',
    event: 'badge-event',
};

const overlayGradients = {
    release: 'linear-gradient(135deg, #00ff87 0%, #00ffff 100%)',
    update: 'linear-gradient(135deg, #0099ff 0%, #d400ff 100%)',
    announcement: 'linear-gradient(135deg, #ff0050 0%, #d400ff 100%)',
    event: 'linear-gradient(135deg, #d400ff 0%, #0099ff 100%)',
};

return (
    <div className="card custom-card overflow-hidden mb-4">
        
        <div className="card-header border-0 bg-transparent p-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
                <div className="position-relative">
                    <img src={company.logo} alt={company.name} className="company-logo rounded-3" />
                    {company.verified && (
                        <div className="verified-badge">
                            <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="h6 fw-bold m-0 text-white">{company.name}</h3>
                    <p className="small text-secondary m-0">{timestamp}</p>
                </div>
            </div>
            <span className={`badge-ui ${badgeClasses[content.type]}`}>
                {content.type}
            </span>
        </div>

        {/* Texto del Post */}
        <div className="px-3 pb-3">
            <p className="text-light m-0" style={{ whiteSpace: 'pre-line' }}>
                {content.text}
            </p>
        </div>

        
        {content.image && (
            <div className="position-relative post-img-wrapper group">
                <img src={content.image} alt="Post Content" className="w-100 object-fit-cover" style={{ aspectRatio: '16/9' }} />
                <div className="hover-overlay" style={{ background: overlayGradients[content.type] }}></div>
            </div>
        )}

        
        <div className="card-footer border-top-custom bg-transparent p-3">
            <div className="d-flex justify-content-between mb-3 small text-secondary">
                <span>{localStats?.likes?.toLocaleString()} likes</span>
                <span>{localStats?.comments} comments · {localStats?.shares} shares</span>
            </div>

            <div className="d-flex gap-2">
                <button className={`btn-action btn btn-danger w-50`} onClick={()=>deleteCompanyPost(data)}>
                    <Trash2 size={20} fill={liked ? "currentColor" : "none"} />
                    <span>Delete</span>
                </button>

                <button className={`btn-action flex-fill ${showComments ? 'active' : ''}`} onClick={() => setShowComments(!showComments)}>
                    <MessageCircle size={20} />
                    <span>Comment</span>
                </button>


            </div>

            {showComments && (
                <div className="mt-3 pt-3 border-top border-secondary animate-fade-in">
                    

                    <div className="comments-container" style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '5px' }}>
                        {loadingComments ? (
                            <div className="text-center py-2"><span className="spinner-border spinner-border-sm text-primary"></span></div>
                        ) : commentsList.length > 0 ? (
                            commentsList.map((c) => (
                                <div key={c.id} className="d-flex gap-2 mb-3 align-items-start">
                                    <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', flexShrink: 0 }}>
                                        <span className="small fw-bold text-dark">{c.user_name?.charAt(0).toUpperCase() || 'U'}</span>
                                    </div>
                                    <div className="bg-dark p-2 rounded-3 flex-grow-1 border border-secondary shadow-sm">
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <span className="small fw-bold text-info">@{c.user_name}</span>
                                            <span className="text-secondary" style={{ fontSize: '0.7rem' }}>{c.created_at}</span>
                                        </div>
                                        <p className="small m-0 text-light">{c.text}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-secondary small py-2">No comments yet. Be the first!</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    </div>
);
}