import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function CompanyPosts() {
    const navigate = useNavigate();
    const [companyPosts, setCompanyPosts] = useState([]);

    async function getCompanyPosts() {
        try {
            // Using the English endpoint we defined earlier
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
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        const requestOptions = {
            method: "DELETE",
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${id}`, requestOptions);
            if (response.ok) {
                console.log("Post deleted successfully");
                getCompanyPosts(); // Refresh list
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    return (
        <div className="container mt-5 text-white">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Manage Company Posts</h1>
                <button className="btn btn-success" onClick={() => navigate('/new_companypost')}>
                    + Create New Post
                </button>
            </div>

            <div className="table-responsive bg-dark p-3 rounded shadow">
                <table className="table table-dark table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Company</th>
                            <th>Category</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companyPosts.length > 0 ? (
                            companyPosts.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>
                                        {/* Now accessing the nested company name from serialize */}
                                        <span className="fw-bold text-info">
                                            {post.company?.name || `ID: ${post.id_company}`}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge-ui badge-${post.content?.type || 'announcement'}`}>
                                            {post.content?.type}
                                        </span>
                                    </td>
                                    <td className="text-truncate" style={{ maxWidth: "200px" }}>
                                        {post.content?.text}
                                    </td>
                                    <td>{post.timestamp}</td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link to={`/companypost/${post.id}`} className="btn btn-sm btn-outline-light">
                                                View
                                            </Link>
                                            <button 
                                                className="btn btn-sm btn-primary" 
                                                onClick={() => navigate('/update_companypost/' + post.id)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-danger" 
                                                onClick={() => deleteCompanyPost(post.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-secondary">
                                    No posts found. Start by creating one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <button className="btn btn-outline-secondary mt-3" onClick={() => navigate('/')}>
                Back to Feed
            </button>
        </div>
    );
}

export default CompanyPosts