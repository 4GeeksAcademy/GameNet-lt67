import React, { useState } from 'react';

import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

export function PostCard({ company, content, timestamp, stats }) {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    // VALIDACIÓN: Si por alguna razón 'company' no llega, no rompas la app
    if (!company || !content) return null;

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
            {/* Header */}
            <div className="card-header border-0 bg-transparent p-3 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                    <div className="position-relative">
                        <img
                            src={company.logo}
                            alt={company.name}
                            className="company-logo rounded-3"
                        />
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

            {/* Texto */}
            <div className="px-3 pb-3">
                <p className="text-light m-0" style={{ whiteSpace: 'pre-line' }}>
                    {content.text}
                </p>
            </div>

            {/* Imagen del Post */}
            {content.image && (
                <div className="position-relative post-img-wrapper group">
                    <img src={content.image} alt="Content" className="w-100 object-fit-cover" style={{ aspectRatio: '16/9' }} />
                    <div
                        className="hover-overlay"
                        style={{ background: overlayGradients[content.type] }}
                    ></div>
                </div>
            )}

            {/* Footer / Stats */}
            <div className="card-footer border-top-custom bg-transparent p-3">
                <div className="d-flex justify-content-between mb-3 small text-secondary">
                    <span>{stats?.likes?.toLocaleString()} likes</span>
                    <span>{stats?.comments} comments · {stats?.shares} shares</span>
                </div>

                <div className="d-flex gap-2">
                    <button className={`btn-action flex-fill ${liked ? 'liked' : ''}`} onClick={() => setLiked(!liked)}>
                        <Heart size={20} fill={liked ? "currentColor" : "none"} />
                        <span>Like</span>
                    </button>
                    <button className="btn-action flex-fill">
                        <MessageCircle size={20} />
                        <span>Comment</span>
                    </button>
                    <button className="btn-action flex-fill">
                        <Share2 size={20} />
                        <span>Share</span>
                    </button>
                    <button className={`btn-icon-only ${bookmarked ? 'bookmarked' : ''}`} onClick={() => setBookmarked(!bookmarked)}>
                        <Bookmark size={20} fill={bookmarked ? "currentColor" : "none"} />
                    </button>
                </div>
            </div>
        </div>
    );
}