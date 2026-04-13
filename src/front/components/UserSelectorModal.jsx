import React, { useState, useEffect } from "react";
import { Search, X, User, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


const UserSelectorModal = ({ onClose, targetPath, title }) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/user");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error cargando usuarios:", error);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => 
        user.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.id.toString().includes(searchTerm)
    );

    return (
        <div className="modal-overlay d-flex align-items-center justify-content-center">
            <div className="admin-modal-content p-4 shadow-lg border-info">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    
                    <h5 className="text-white fw-bold mb-0 text-uppercase small" style={{letterSpacing: '1px'}}>
                        {title}
                    </h5>
                    <button className="btn-close-modal" onClick={onClose}><X size={20} /></button>
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

                <div className="user-list-container custom-scrollbar">
                    {filteredUsers.map(user => (
                        <div 
                            key={user.id} 
                            className="user-selection-item d-flex align-items-center p-3 mb-2"
                            onClick={() => {
                                // Redirige a /path/del/boton/ + ID
                                navigate(`${targetPath}${user.id}`);
                                onClose();
                            }}
                        >
                            <div className="user-avatar-sm me-3 border border-info">
                                <User size={14} className="text-info" />
                            </div>
                            <div className="flex-grow-1">
                                <div className="text-white small fw-bold">{user.nickname}</div>
                                <div className="text-secondary" style={{ fontSize: '10px' }}>ID: {user.id}</div>
                            </div>
                            <ChevronRight size={14} className="text-secondary opacity-50" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserSelectorModal;