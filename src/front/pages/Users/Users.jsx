import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    User, Mail, Edit3, Eye, Trash2, UserPlus,
    ArrowLeft, Shield, Hash, Search
} from 'lucide-react';

function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    async function getUsers() {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/user");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    function deleteUser(id) {
        if (!window.confirm("¿Are you sure you want to delete this user?")) return;

        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                getUsers();
            })
            .catch((error) => console.error(error));
    }

    const filteredUsers = users.filter(user => 
        user.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.id.toString().includes(searchTerm)
    );

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">

                {/* Header con acciones rápidas */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={() => navigate("/admin")} className="btn-back-home border-0 bg-transparent text-secondary">
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <h2 className="brand-title h3 mb-0">USER DATABASE</h2>
                            <p className="text-info small fw-bold mb-0">System Authority Mode</p>
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

                    <button className="btn-login py-2 px-4 d-flex align-items-center gap-2" onClick={() => navigate('/new_user')}>
                        <UserPlus size={18} /> New User
                    </button>
                </div>


                <div className="admin-table-wrapper border border-info rounded-4 overflow-hidden shadow-lg">
                    <table className="table table-dark table-hover mb-0 align-middle">
                        <thead className="bg-black border-bottom border-info">
                            <tr>
                                <th className="p-4 text-info small fw-bold"><Hash size={14} /> ID</th>
                                <th className="p-4 text-info small fw-bold"><User size={14} /> NICKNAME</th>
                                <th className="p-4 text-info small fw-bold"><Mail size={14} /> EMAIL</th>
                                <th className="p-4 text-info small fw-bold text-center"><Shield size={14} /> ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="admin-table-row">
                                    <td className="p-4 fw-mono text-secondary">#{user.id}</td>
                                    <td className="p-4">
                                        <span className="text-white fw-bold">{user.nickname}</span>
                                    </td>
                                    <td className="p-4 text-secondary">{user.email}</td>
                                    <td className="p-4">
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link to={"/user/" + user.id} className="btn-action btn-view" title="See Details">
                                                <Eye size={18} />
                                            </Link>
                                            <button className="btn-action btn-edit" onClick={() => navigate('/update_user/' + user.id)} title="Edit User">
                                                <Edit3 size={18} />
                                            </button>
                                            <button className="btn-action btn-delete" onClick={() => deleteUser(user.id)} title="Delete User">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {users.length === 0 && (
                        <div className="text-center py-5">
                            <p className="text-secondary">No users detected in the database.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Users