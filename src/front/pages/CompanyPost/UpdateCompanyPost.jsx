import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Send, Image as ImageIcon, MessageSquare,
    Hash, Megaphone, Gamepad2, Wrench, Trophy,
    XCircle, Eye, RefreshCw, ArrowLeft
} from "lucide-react";

function UpdateCompanyPost() {
    const { companyPostId } = useParams();
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

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/post/admin/" + companyPostId);
                const data = await response.json();

                console.log("Datos recibidos del backend:", data); // <--- MIRA ESTO EN LA CONSOLA

                if (data) {
                    // Si tu backend devuelve el objeto directo:
                    setCompanyId(data.company.id_company || "");
                    setMessage(data.content.text || "");
                    setImage(data.content.image || "");
                    setContentType(data.content.type|| "announcement");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        if (companyPostId) {
            getPost();
        }
    }, [companyPostId]);
    async function sendData(e) {
        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id_company": companyId,
                "message": message,
                "image": image,
                "content_type": contentType
            })
        };

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/post/" + companyPostId, requestOptions);
            if (response.ok) {
                navigate("/companypost");
            } else {
                const error = await response.json();
                console.error("Error updating post:", error.msg);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    }

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0b0d' }}>
            <div className="container">

                {/* Header con botón de regreso */}
                <div className="d-flex align-items-center gap-3 mb-5 px-lg-2">
                    <button onClick={() => navigate("/companypost")} className="btn btn-outline-info border-0 p-2 rounded-circle">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h2 className="text-white fw-bold mb-0 text-uppercase tracking-tighter">Edit Broadcast</h2>
                        <p className="text-info small fw-bold mb-0 opacity-75">Update information for Post #{companyPostId}</p>
                    </div>
                </div>

                <div className="row g-5">
                    {/* Formulario de Edición */}
                    <div className="col-lg-7">
                        <form className="admin-card-wrapper p-4 p-lg-5 border border-secondary-subtle rounded-4 bg-dark-soft shadow-lg" onSubmit={sendData}>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className="form-label text-white-50 small fw-bold"><Hash size={14} className="me-1" /> COMPANY ID</label>
                                    <input value={companyId} onChange={(e) => setCompanyId(e.target.value)} type="number" className="form-control custom-input-dark" placeholder="0" required />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label text-white-50 small fw-bold"><ImageIcon size={14} className="me-1" /> CATEGORY</label>
                                    <select className="form-select custom-input-dark" value={contentType} onChange={(e) => setContentType(e.target.value)}>
                                        <option value="announcement">Announcement</option>
                                        <option value="release">Game Release</option>
                                        <option value="update">Update / Patch</option>
                                        <option value="event">Special Event</option>
                                    </select>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-white-50 small fw-bold"><MessageSquare size={14} className="me-1" /> MESSAGE</label>
                                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="form-control custom-input-dark" rows="5" required></textarea>
                                </div>

                                <div className="col-12">
                                    <label className="form-label text-white-50 small fw-bold"><ImageIcon size={14} className="me-1" /> MEDIA URL</label>
                                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" className="form-control custom-input-dark" placeholder="https://..." />
                                </div>

                                <div className="col-12 d-flex gap-3 pt-4">
                                    <button type="submit" className="btn-brand-info flex-grow-1 py-3 d-flex align-items-center justify-content-center gap-2">
                                        <RefreshCw size={18} /> SYNCHRONIZE POST
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Previsualización en Vivo */}
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
                                            <span className="text-white-50 x-small fw-bold">Company #{companyId || '...'}</span>
                                        </div>
                                        <div className="badge-post-type d-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark border border-secondary text-uppercase x-small text-white">
                                            {icons[contentType]} {contentType}
                                        </div>
                                    </div>
                                    <p className="text-white mb-0" style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                        {message || "No content provided..."}
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

export default UpdateCompanyPost;