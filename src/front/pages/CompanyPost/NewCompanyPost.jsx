import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewCompanyPost() {
    const navigate = useNavigate();

    const [companyId, setCompanyId] = useState(0);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');
    const [contentType, setContentType] = useState('announcement'); 

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
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/posts", requestOptions);
            if (response.ok) {
                console.log("Post created successfully");
                navigate("/"); 
            } else {
                const error = await response.json();
                console.error("Error creating post:", error.msg);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    }

    return (
        <div className="container mt-5 text-white">
            <h1 className="mb-4">Create New Company Post</h1>
            <form className="w-50" onSubmit={sendData}>
                {/* Company ID */}
                <div className="mb-3">
                    <label className="form-label">Company ID</label>
                    <input 
                        value={companyId} 
                        onChange={(e) => setCompanyId(e.target.value)} 
                        type="number" 
                        className="form-control bg-dark text-white border-secondary" 
                        required 
                    />
                </div>

                {/* Content Type (Badges) */}
                <div className="mb-3">
                    <label className="form-label">Post Category</label>
                    <select 
                        className="form-select bg-dark text-white border-secondary"
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value)}
                    >
                        <option value="announcement">Announcement</option>
                        <option value="release">Game Release</option>
                        <option value="update">Update / Patch</option>
                        <option value="event">Special Event</option>
                    </select>
                </div>

                {/* Message */}
                <div className="mb-3">
                    <label className="form-label">Post Message</label>
                    <textarea 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        className="form-control bg-dark text-white border-secondary" 
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Image URL */}
                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input 
                        value={image} 
                        onChange={(e) => setImage(e.target.value)} 
                        type="text" 
                        className="form-control bg-dark text-white border-secondary" 
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary px-4">Create Post</button>
                    <button type="button" onClick={() => navigate("/")} className="btn btn-outline-secondary">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NewCompanyPost;