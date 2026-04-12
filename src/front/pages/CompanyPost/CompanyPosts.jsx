import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
    Share2, Edit3, Eye, Trash2, PlusCircle, 
    ArrowLeft, Calendar, Tag, MessageSquare, Building, Hash, Search 
} from 'lucide-react';

function CompanyPosts() {
    const navigate = useNavigate();
    const [companyPosts, setCompanyPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    async function getCompanyPosts() {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/posts");
            if (response.ok) {
                const data = await response.json();
                setCompanyPosts(data);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    useEffect(() => {
        getCompanyPosts();
    }, []);

    async function deleteCompanyPost(id) {
        if (!window.confirm("SYSTEM WARNING: Are you sure you want to delete this broadcast? This action cannot be undone.")) return;

        const requestOptions = { method: "DELETE" };
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${id}`, requestOptions);
            if (response.ok) {
                getCompanyPosts(); 
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    const filteredCompanyPosts = companyPosts.filter(posts => 
        posts.company?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        posts.id.toString().includes(searchTerm)
    );

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                
                {/* Header Section */}
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={() => navigate("/admin")} className="btn-back-home border-0 bg-transparent text-secondary">
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <h2 className="brand-title h3 mb-0">COMMUNICATIONS HUB</h2>
                            <p className="text-danger small fw-bold mb-0">Company Broadcasts & News</p>
                        </div>
                    </div>
                    
                    <div className="search-bar-wrapper mb-3">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            className="form-control custom-input w-100"
                            placeholder="Search user..."
                            autoFocus
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <button className="btn-login py-2 px-4 d-flex align-items-center gap-2 border-danger " 
                            style={{borderColor: '#dc3545'}}
                            onClick={() => navigate('/new_companypost')}>
                        <PlusCircle size={18} /> New Broadcast
                    </button>
                </div>

                {/* Table Wrapper */}
                <div className="admin-table-wrapper border border-danger rounded-4 overflow-hidden shadow-lg">
                    <table className="table table-dark table-hover mb-0 align-middle">
                        <thead className="bg-black border-bottom border-danger">
                            <tr>
                                <th className="p-4 text-danger small fw-bold"><Hash size={14} /> ID</th>
                                <th className="p-4 text-danger small fw-bold"><Building size={14} /> SOURCE</th>
                                <th className="p-4 text-danger small fw-bold"><Tag size={14} /> CATEGORY</th>
                                <th className="p-4 text-danger small fw-bold"><MessageSquare size={14} /> CONTENT Preview</th>
                                <th className="p-4 text-danger small fw-bold"><Calendar size={14} /> POSTED</th>
                                <th className="p-4 text-danger small fw-bold text-center">CONTROL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCompanyPosts.length > 0 ? (
                                filteredCompanyPosts.map((post) => (
                                    <tr key={post.id} className="admin-table-row">
                                        <td className="p-4 fw-mono text-secondary">#{post.id}</td>
                                        <td className="p-4">
                                            <span className="text-info fw-bold">
                                                {post.company?.name || `Studio ID: ${post.id_company}`}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`badge bg-black border border-danger text-danger text-uppercase p-2`} style={{fontSize: '10px'}}>
                                                {post.content?.type || 'announcement'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-secondary mb-0 text-truncate small" style={{ maxWidth: "250px" }}>
                                                {post.content?.text}
                                            </p>
                                        </td>
                                        <td className="p-4 text-secondary small">
                                            {post.timestamp}
                                        </td>
                                        <td className="p-4">
                                            <div className="d-flex justify-content-center gap-2">
                                                <Link to={`/companypost/${post.id}`} className="btn-action btn-view" title="Preview Post">
                                                    <Eye size={18} />
                                                </Link>
                                                <button className="btn-action btn-edit" onClick={() => navigate('/update_companypost/' + post.id)} title="Modify Post">
                                                    <Edit3 size={18} />
                                                </button>
                                                <button className="btn-action btn-delete" onClick={() => deleteCompanyPost(post.id)} title="Retract Post">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-5">
                                        <Share2 size={48} className="text-secondary opacity-25 mb-3" />
                                        <p className="text-secondary">No transmissions detected in the logs.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4">
                    <button className="btn-back-home d-flex align-items-center gap-2" onClick={() => navigate('/admin')}>
                         <ArrowLeft size={16} /> RETURN TO PUBLIC FEED
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CompanyPosts;