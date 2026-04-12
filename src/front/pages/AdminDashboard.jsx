import React, { useState } from "react"; // Añadido useState
import { Link, useNavigate } from "react-router-dom";
import {
  Users, Building2, Gamepad2, LayoutGrid, Monitor, Gamepad,
  Share2, Star, ShieldCheck, ArrowLeft, Terminal, Search
} from 'lucide-react';
import useGlobalReducer from "../hooks/useGlobalReducer";
import UserSelectorModal from "../components/UserSelectorModal";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const [modalConfig, setModalConfig] = useState(null);

  // Función de manejo unificada
  const handleAction = (action) => {
        if (action.action === "openModal") {
            
            setModalConfig({
                path: action.path,
                title: action.label
            });
        } else {
            navigate(action.path);
        }
    };

  const adminActions = [
    { label: "Users", path: "/user", icon: <Users size={28} />, color: "text-info" },
    { label: "Companies", path: "/company", icon: <Building2 size={28} />, color: "text-success" },
    { label: "Games", path: "/game", icon: <Gamepad2 size={28} />, color: "text-primary" },
    { label: "Company Posts", path: "/companypost", icon: <Share2 size={28} />, color: "text-danger" },
    { label: "Consoles", path: "/console", icon: <Monitor size={28} />, color: "text-warning" },
    { label: "Game Consoles", path: "/gameconsole", icon: <LayoutGrid size={28} />, color: "text-info" },
    { label: "Game List", path: "/gameconsolelist", icon: <Terminal size={28} />, color: "text-light" },
    { label: "User Console Favorites",path: "/console/favorites/", action: "openModal", icon: <Star size={28} />, color: "text-warning" },
    { label: "User Game Favorites", path: "/game/favorites/", action: "openModal", icon: <Gamepad size={28} />, color: "text-warning" },
  ];

  return (
    <div className="admin-dashboard-wrapper py-5 min-vh-100" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="container">
        
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-5">
          <div>
            <h1 className="brand-title h2 mb-1">COMMAND CENTER</h1>
            <p className="text-secondary small text-uppercase fw-bold" style={{ letterSpacing: '2px' }}>
              Main Database Management
            </p>
          </div>
          <Link to="/" className="text-decoration-none">
            <button className="btn-back-home d-flex align-items-center gap-2">
              <ArrowLeft size={18} /> BACK TO HOME
            </button>
          </Link>
        </div>

        {/* Grid de Cards */}
        <div className="row g-4">
          {adminActions.map((action, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div
                className="admin-card-button d-flex align-items-center gap-3 p-4"
                onClick={() => handleAction(action)} // Llamamos a la función mejorada
                style={{ cursor: 'pointer' }}
              >
                <div className={`admin-card-icon ${action.color}`}>
                  {action.icon}
                </div>
                <div className="admin-card-content">
                  <span className="text-white fw-bold d-block">{action.label}</span>
                  <small className="text-secondary">
                    {action.action === "openModal" ? "Requires User Selection" : `Manage ${action.label.toLowerCase()}`}
                  </small>
                </div>
                <div className="ms-auto arrow-indicator">
                  {action.action === "openModal" ? <Search size={14} className="text-info" /> : <Terminal size={14} className="text-secondary" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
          {modalConfig && (
                <UserSelectorModal 
                    title={modalConfig.title}
                    targetPath={modalConfig.path}
                    onClose={() => setModalConfig(null)}
                />
            )}

    </div>
  );
};