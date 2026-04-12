import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Users, Gamepad2, Link as LinkIcon, 
    ArrowLeft, CheckCircle2, Info 
} from "lucide-react";

function ConsoleFavorites() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [consoleId, setConsoleId] = useState("");
    const [userList, setUserList] = useState([]);
    const [consoleList, setConsoleList] = useState([]);

    function getUsers() {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/")
            .then(response => response.json())
            .then(data => setUserList(data))
            .catch((error) => console.log(error));
    }

    function getConsoles() {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/console/")
            .then(response => response.json())
            .then(data => setConsoleList(data))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getConsoles();
        getUsers();
    }, []);

    function sendData(e) {
        e.preventDefault();
        if (!userId || !consoleId) {
            alert("Please select both a user and a console");
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/console/favorites/${userId}/${consoleId}`, requestOptions)
            .then(async (response) => response.json())
            .then((result) => navigate(-1))
            .catch((error) => console.error("Error:", error));
    }

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0b0d', color: '#e0e0e0' }}>
            <div className="container">
                
               
                <div className="d-flex align-items-center gap-3 mb-5 px-lg-4">
                    <button onClick={() => navigate("/admin")} className="btn btn-outline-info border-0 p-2 rounded-circle bg-dark-soft">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h2 className="text-white fw-bold mb-0 text-uppercase tracking-tighter">Hardware Association</h2>
                        <p className="text-info small fw-bold mb-0 opacity-75 d-flex align-items-center gap-2">
                            <Info size={14} /> LINKING CONSOLES TO USER PROFILES
                        </p>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="admin-card-wrapper p-4 p-md-5 border border-secondary-subtle rounded-4 bg-dark-soft shadow-lg">
                            
                          
                            <div className="d-flex justify-content-center align-items-center gap-4 mb-5">
                                <div className={`p-4 rounded-circle border ${userId ? 'border-info bg-info-subtle' : 'border-secondary opacity-50'}`}>
                                    <Users size={32} className={userId ? 'text-info' : 'text-secondary'} />
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <LinkIcon size={20} className={userId && consoleId ? 'text-success' : 'text-secondary opacity-25'} />
                                    <div style={{ width: '40px', height: '2px' }} className={`my-2 ${userId && consoleId ? 'bg-success' : 'bg-secondary opacity-25'}`}></div>
                                </div>
                                <div className={`p-4 rounded-circle border ${consoleId ? 'border-success bg-success-subtle' : 'border-secondary opacity-50'}`}>
                                    <Gamepad2 size={32} className={consoleId ? 'text-success' : 'text-secondary'} />
                                </div>
                            </div>

                            <form onSubmit={sendData}>
                                <div className="mb-4">
                                    <label className="form-label text-white-50 small fw-bold text-uppercase tracking-wider">
                                        <Users size={14} className="me-2" /> Target User
                                    </label>
                                    <select
                                        className="form-select custom-input-dark py-3"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        required
                                    >
                                        <option value="">Choose a user...</option>
                                        {userList.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                @{user.nickname}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-5">
                                    <label className="form-label text-white-50 small fw-bold text-uppercase tracking-wider">
                                        <Gamepad2 size={14} className="me-2" /> Assign Console
                                    </label>
                                    <select 
                                        className="form-select custom-input-dark py-3" 
                                        value={consoleId} 
                                        onChange={(e) => setConsoleId(e.target.value)}
                                        required
                                    >
                                        <option value="">Choose hardware...</option>
                                        {consoleList.map((con) => (
                                            <option key={con.id} value={con.id}>
                                                {con.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button type="submit" className="btn-brand-info w-100 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold text-uppercase shadow-sm" >
                                    <CheckCircle2 size={18} /> Establish Connection
                                </button>
                            </form>
                        </div>
                        
                        <p className="text-center mt-4 text-secondary small">
                            Users will be able to see these consoles in their public profile.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConsoleFavorites;