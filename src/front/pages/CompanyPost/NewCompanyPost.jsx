import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Send, Image as ImageIcon, MessageSquare, 
    Hash, Megaphone, Gamepad2, Wrench, Trophy, 
    XCircle, Eye 
} from "lucide-react";

function NewCompanyPost() {
    const navigate = useNavigate();

    const [companyId, setCompanyId] = useState("");
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');
    const [contentType, setContentType] = useState('announcement');

    const icons = {
        announcement: <Megaphone className="text-info" size={18} />,
        release: <Gamepad2 className="text-success" size={18} />,
        update: <Wrench className="text-warning" size={18} />,
        event: <Trophy className="text-danger" size={18} />
    };

    async function sendData(e) {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id_company": companyId,
                "message": message,
                "image": image,
                "content_type": contentType 
            })
        };

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/posts/admin", requestOptions);
            if (response.ok) {
                navigate("/companypost"); 
            } else {
                const error = await response.json();
                console.error("Error creating post:", error.msg);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    }

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0b0d' }}>
            <div className="container">
                <div className="row g-5">
                    
                   
                    <div className="col-lg-7">
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <div className="p-3 bg-info-subtle rounded-3">
                                <Send className="text-info" size={28} />
                            </div>
                            <div>
                                <h2 className="text-white fw-bold mb-0">BROADCAST HUB</h2>
                                <p className="text-info small fw-bold mb-0 uppercase tracking-widest">Post to Community Newsfeed</p>
                            </div>
                        </div>

                        <form className="admin-card-wrapper p-4 p-lg-5 border border-secondary-subtle rounded-4 bg-dark-soft shadow-lg" onSubmit={sendData}>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className="form-label text-white-50 small fw-bold"><Hash size={14} className="me-1"/> AUTHORIZED COMPANY ID</label>
                                    <input value={companyId} onChange={(e) => setCompanyId(e.target.value)} type="number" className="form-control custom-input-dark" placeholder="0" required />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-white-50 small fw-bold"><ImageIcon size={14} className="me-1"/> CATEGORY</label>
                                    <select className="form-select custom-input-dark" value={contentType} onChange={(e) => setContentType(e.target.value)}>
                                        <option value="announcement">Announcement</option>
                                        <option value="release">Game Release</option>
                                        <option value="update">Update / Patch</option>
                                        <option value="event">Special Event</option>
                                    </select>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-white-50 small fw-bold"><MessageSquare size={14} className="me-1"/> MESSAGE</label>
                                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="form-control custom-input-dark" rows="5" placeholder="What's happening in your studio?" required></textarea>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-white-50 small fw-bold"><ImageIcon size={14} className="me-1"/> MEDIA URL (Optional)</label>
                                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" className="form-control custom-input-dark" placeholder="https://..." />
                                </div>

                                <div className="col-12 d-flex gap-3 pt-4">
                                    <button type="submit" className="btn-brand-info flex-grow-1 py-3 d-flex align-items-center justify-content-center gap-2">
                                        <Send size={18} /> PUBLISH POST
                                    </button>
                                    <button type="button" onClick={() => navigate("/companypost")} className="btn btn-outline-secondary px-4">
                                        <XCircle size={18} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    
                    <div className="col-lg-5">
                        <div className="sticky-top" style={{ top: '2rem' }}>
                            <h6 className="text-secondary small fw-bold mb-3 d-flex align-items-center gap-2">
                                <Eye size={16} /> LIVE PREVIEW
                            </h6>
                            
                            
                            <div className="post-preview-card bg-dark border border-secondary rounded-4 overflow-hidden shadow-lg">
                                {image && (
                                    <div className="preview-img-container border-bottom border-secondary">
                                        <img src={image} alt="Preview" className="w-100 object-fit-cover" style={{ maxHeight: '250px' }} />
                                    </div>
                                )}
                                <div className="p-4">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="rounded-circle bg-secondary" style={{ width: '35px', height: '35px' }}></div>
                                            <span className="text-white-50 x-small fw-bold">Company #{companyId || 'ID'}</span>
                                        </div>
                                        <div className="badge-post-type d-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark border border-secondary text-uppercase x-small text-white">
                                            {icons[contentType]} {contentType}
                                        </div>
                                    </div>
                                    <p className="text-white mb-0" style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem' }}>
                                        {message || "Your message will appear here..."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default NewCompanyPost