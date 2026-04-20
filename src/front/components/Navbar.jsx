import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import {
    Search, Bell, User, LogOut, Heart, MessageSquare,
    UserPen, Gamepad2, ExternalLink, Cpu, Menu, Building2, LayoutDashboard, Building
} from 'lucide-react';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const userId = store.user?.id;

    // Estados de búsqueda
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Estados de UI
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMainMenu, setShowMainMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [latestPost, setLatestPost] = useState(null);

    const fetchLatestPost = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/latest`);
            if (response.ok) {
                const data = await response.json();
                setLatestPost(data);
            }
        } catch (error) {
            console.error("Error fetching latest post:", error);
        }
    };

    // Lógica de búsqueda integrada (Interna + RAWG)
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.length > 2) {
                setIsSearching(true);
                try {
                    const respInternal = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/search?query=${searchQuery}`);
                    const respRawg = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/search/rawg?q=${searchQuery}`);

                    let internalData = { consoles: [], companies: [] };
                    let rawgGames = [];

                    if (respInternal.ok) {
                        internalData = await respInternal.json();
                    }

                    if (respRawg.ok) {
                        const games = await respRawg.json();
                        rawgGames = games.map(g => ({
                            id: g.id,
                            name: g.name,
                            cover_img: g.background_image,
                            type: "games",
                            is_rawg: true
                        }));
                    }
                    setSearchResults([...rawgGames, ...internalData.consoles, ...internalData.companies]);
                } catch (error) {
                    console.error("Search error:", error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
                setIsSearching(false);
            }
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    useEffect(() => {
        if (showNotifications) {
            fetchLatestPost();
            setShowUserMenu(false);
            setShowMainMenu(false);
        }
    }, [showNotifications]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("token_company");
        dispatch({ type: "logout" });
        dispatch({ type: "logout_company" });
        navigate("/login");
    };

    const handleSelectResult = async (item) => {
        setSearchQuery("");
        setSearchResults([]);

        if (item.type === "games" && item.is_rawg) {
            const token = localStorage.getItem("token") || localStorage.getItem("token_company");
            const apiKey = import.meta.env.VITE_RAWG_API_KEY;

            try {
                const res = await fetch(`https://api.rawg.io/api/games/${item.id}?key=${apiKey}`);
                const detailedData = await res.json();

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id_company: 1,
                        name: detailedData.name || item.name,
                        cover_img: detailedData.background_image || item.cover_img,
                        release_date: detailedData.released || item.release_date,
                        description: detailedData.description_raw || "Great game!",
                        current_players: detailedData.added || 0,
                        trailer_url: detailedData.clip?.clip || ""
                    })
                });

                if (response.ok) {
                    const savedGame = await response.json();
                    navigate(`/games/${savedGame.id}`);
                }
            } catch (error) {
                console.error("Error processing game:", error);
            }
            return;
        }

        if (item.type === "consoles") {
            navigate(`/${item.type}`);
        } else if (item.type === "companies") {
            navigate(`/company-profile/${item.id}`);
        } else {
            navigate(`/${item.type}/${item.id}`);
        }
    };

    return (
        <>
            {/* NAVBAR PARA USUARIOS NORMALES */}
            {store.auth && (
                <nav className="navbar navbar-expand-lg custom-header sticky-top p-0">
                    <div className="container" style={{ height: '70px' }}>
                        <div className="d-flex align-items-center gap-3">
                            <div className="position-relative">
                                <button className={`btn-icon ${showMainMenu ? 'active' : ''}`}
                                    onClick={() => {
                                        setShowMainMenu(!showMainMenu);
                                        setShowUserMenu(false);
                                        setShowNotifications(false);
                                    }}>
                                    <Menu size={24} />
                                </button>
                                {showMainMenu && (
                                    <>
                                        <div className="position-fixed top-0 start-0 w-100 h-100" onClick={() => setShowMainMenu(false)} style={{ zIndex: 998 }}></div>
                                        <div className="user-dropdown-menu animate-fade-in shadow-lg border border-secondary"
                                            style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999, backgroundColor: '#1a1a1a', minWidth: '220px', borderRadius: '12px', marginTop: '10px', padding: '8px' }}>
                                            <Link className="dropdown-item-custom" to="/games" onClick={() => setShowMainMenu(false)}>
                                                <Gamepad2 size={16} className="text-primary" /> <span>Discover Games</span>
                                            </Link>
                                            <Link className="dropdown-item-custom" to="/consoles" onClick={() => setShowMainMenu(false)}>
                                                <Cpu size={16} className="text-success" /> <span>Add Consoles</span>
                                            </Link>
                                            <Link className="dropdown-item-custom" to="/companies-list" onClick={() => setShowMainMenu(false)}>
                                                <Building size={16} className="text-success" /> <span>Companies</span>
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                            <Link className="navbar-brand d-flex align-items-center gap-3 m-0" to="/">
                                <div className="logo-box-wrapper">
                                    <div className="logo-glow"></div>
                                    <div className="logo-box"><span className="logo-letter">G</span></div>
                                </div>
                                <span className="brand-title d-none d-sm-inline">GameNet</span>
                            </Link>
                        </div>

                        {/* Barra de Búsqueda */}
                        <div className="search-bar-wrapper d-none d-md-flex flex-fill mx-lg-5 mx-3 position-relative">
                            <Search size={18} className="search-icon" />
                            <input type="text" className="form-control custom-input w-100" 
                                placeholder="Search games (RAWG), consoles..." 
                                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            {isSearching && (
                                <div className="position-absolute end-0 top-50 translate-middle-y me-3">
                                    <div className="spinner-border spinner-border-sm text-info" style={{ width: '1rem', height: '1rem' }}></div>
                                </div>
                            )}
                            {(searchResults.length > 0 || (searchQuery.length > 2 && !isSearching)) && (
                                <div className="search-results-overlay shadow-lg">
                                    {searchResults.map((item) => (
                                        <div key={`${item.type}-${item.id}`} className="search-result-item d-flex align-items-center gap-3" onClick={() => handleSelectResult(item)}>
                                            {item.type === "consoles" ? (
                                                <div className="p-2 rounded bg-secondary bg-opacity-25"><Cpu size={20} className="text-success" /></div>
                                            ) : (
                                                <img src={item.type === "companies" ? item.logo : item.cover_img} alt={item.name} className="result-img" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                                            )}
                                            <div className="d-flex flex-column">
                                                <span className="result-name">{item.name}</span>
                                                <span className="result-category text-uppercase" style={{ fontSize: '0.65rem', color: '#00dbde' }}>
                                                    {item.type} {item.is_rawg && " (RAWG)"}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            {/* Notificaciones */}
                            <div className="position-relative">
                                <button className={`btn-icon ${showNotifications ? 'active' : ''}`} onClick={() => setShowNotifications(!showNotifications)}>
                                    <Bell size={22} />
                                    <span className="notification-badge"></span>
                                </button>
                                {showNotifications && (
                                    <>
                                        <div className="position-fixed top-0 start-0 w-100 h-100" onClick={() => setShowNotifications(false)} style={{ zIndex: 998 }}></div>
                                        <div className="user-dropdown-menu animate-fade-in shadow-lg border border-secondary" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 999, backgroundColor: '#1a1a1a', minWidth: '300px', borderRadius: '12px', marginTop: '10px', padding: '15px' }}>
                                            <h6 className="text-white mb-3"><Bell size={16} className="text-primary" /> Latest Update</h6>
                                            {latestPost ? (
                                                <div className="notification-card bg-dark rounded border border-secondary p-2">
                                                    <div className="d-flex align-items-center gap-2 mb-2">
                                                        <img src={latestPost.company?.logo} alt="" className="rounded-circle" style={{ width: '24px', height: '24px' }} />
                                                        <span className="small fw-bold text-info">{latestPost.company?.name}</span>
                                                    </div>
                                                    <p className="small text-light mb-2">{latestPost.content?.text}</p>
                                                    <Link to={`/post/${latestPost.id}`} className="btn btn-sm btn-outline-primary w-100" onClick={() => setShowNotifications(false)}>View Post</Link>
                                                </div>
                                            ) : <p className="text-center text-secondary small">No new updates.</p>}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Menú de Usuario */}
                            <div className="position-relative">
                                <button className={`btn-icon ${showUserMenu ? 'active' : ''}`} onClick={() => setShowUserMenu(!showUserMenu)}>
                                    <User size={22} />
                                </button>
                                {showUserMenu && (
                                    <>
                                        <div className="position-fixed top-0 start-0 w-100 h-100" onClick={() => setShowUserMenu(false)} style={{ zIndex: 998 }}></div>
                                        <div className="user-dropdown-menu animate-fade-in shadow-lg border border-secondary" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 999, backgroundColor: '#1a1a1a', minWidth: '220px', borderRadius: '12px', marginTop: '10px', padding: '8px' }}>
                                            <Link className="dropdown-item-custom" to={"/profile/edit/" + userId} onClick={() => setShowUserMenu(false)}><UserPen size={16} /> <span>Edit Profile</span></Link>
                                            <Link className="dropdown-item-custom" to="/my-games" onClick={() => setShowUserMenu(false)}><Gamepad2 size={16} /> <span>My Games</span></Link>
                                            <Link className="dropdown-item-custom" to="/my-consoles" onClick={() => setShowUserMenu(false)}><Cpu size={16} /> <span>My Consoles</span></Link>
                                            <Link className="dropdown-item-custom" to="/my-likes" onClick={() => setShowUserMenu(false)}><Heart size={16} /> <span>Likes</span></Link>
                                            <Link className="dropdown-item-custom" to="/my-comments" onClick={() => setShowUserMenu(false)}><MessageSquare size={16} /> <span>Comments</span></Link>
                                            <div className="dropdown-divider-custom"></div>
                                            <button className="dropdown-item-custom text-danger" onClick={handleLogout}><LogOut size={16} /> <span>Logout</span></button>
                                        </div>
                                   
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            )}

            {/* NAVBAR PARA EMPRESAS (CORP) */}
            {store.auth_company && (
                <nav className="navbar navbar-expand-lg custom-header sticky-top p-0 border-bottom border-info border-opacity-25">
                    <div className="container" style={{ height: '70px' }}>
                        <div className="d-flex align-items-center gap-3">
                            <Link className="navbar-brand d-flex align-items-center gap-3 m-0" to="/company/dashboard">
                                <div className="logo-box-wrapper">
                                    <div className="logo-glow" style={{ background: 'linear-gradient(45deg, #00dbde, #fc00ff)' }}></div>
                                    <div className="logo-box"><Building2 size={20} className="text-white" /></div>
                                </div>
                                <span className="brand-title d-none d-sm-inline">GameNet <small className="text-info" style={{ fontSize: '0.6rem' }}>CORP</small></span>
                            </Link>
                        </div>

                        <div className="d-none d-md-flex align-items-center gap-4 mx-auto">
                            <Link to="/company/analytics" className="text-decoration-none text-secondary small fw-bold hover-info">
                                <LayoutDashboard size={16} className="me-1" /> ANALYTICS
                            </Link>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <div className="position-relative">
                                <button className={`btn-icon ${showUserMenu ? 'active' : ''}`} onClick={() => setShowUserMenu(!showUserMenu)}>
                                    <Building2 />
                                </button>
                                {showUserMenu && (
                                    <>
                                        <div className="position-fixed top-0 start-0 w-100 h-100" onClick={() => setShowUserMenu(false)} style={{ zIndex: 998 }}></div>
                                        <div className="user-dropdown-menu animate-fade-in shadow-lg border border-secondary"
                                            style={{ position: 'absolute', top: '100%', right: 0, zIndex: 999, backgroundColor: '#1a1a1a', minWidth: '220px', borderRadius: '12px', marginTop: '10px', padding: '8px' }}>
                                            <div className="px-3 py-2 border-bottom border-secondary mb-2">
                                                <p className="text-white small mb-0 fw-bold">{store.company?.name}</p>
                                                <p className="text-secondary mb-0" style={{ fontSize: '0.7rem' }}>Business Account</p>
                                            </div>
                                            <button className="dropdown-item-custom text-danger" onClick={handleLogout}>
                                                <LogOut size={16} /> <span>Logout Business</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};