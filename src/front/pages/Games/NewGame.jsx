import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search, PlusCircle, ArrowLeft, Gamepad2,
    Image as ImageIcon, Calendar, Users,
    BarChart3, FileText, Globe, Home
} from "lucide-react";

function NewGame() {
    const navigate = useNavigate();

    const [companyId, setCompanyId] = useState(1);
    const [name, setName] = useState('');
    const [trailer, setTrailer] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [totalSales, setTotalSales] = useState(0);
    const [currentPlayers, setCurrentPlayers] = useState(0);
    const [description, setDescription] = useState('');
    const [coverImg, setCoverImg] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleRawgSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return; 

        setIsSearching(true);
        const apiKey = import.meta.env.VITE_RAWG_API_KEY;

        try {
            
            const url = `https://api.rawg.io/api/games?search=${encodeURIComponent(searchQuery)}&key=${apiKey}&page_size=5`;

            const response = await fetch(url);

            if (!response.ok) throw new Error("RAWG API Error");

            const data = await response.json();
            setSearchResults(data.results || []);
        } catch (error) {
            console.error("Error fetching from RAWG:", error);
            alert("Could not connect to RAWG. Check your API Key.");
        } finally {
            setIsSearching(false);
        }
    };

    const selectGame = async (game) => {
        setName(game.name);
        setCoverImg(game.background_image);
        setCurrentPlayers(game.added);
        setReleaseDate(game.released);
        setSearchResults([]);
        setSearchQuery('');

        const apiKey = import.meta.env.VITE_RAWG_API_KEY;
        try {
            const res = await fetch(`https://api.rawg.io/api/games/${game.id}?key=${apiKey}`);
            const detailedData = await res.json();
            setDescription(detailedData.description_raw || "Great game!");
        } catch (e) {
            setDescription("A new adventure awaits.");
        }
    };

    const sendData = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id_company": parseInt(companyId),
                "name": name,
                "trailer_url": trailer,
                "release_date": releaseDate,
                "total_sales": parseInt(totalSales),
                "current_players": parseInt(currentPlayers),
                "description": description,
                "cover_img": coverImg
            })
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game", requestOptions)
            .then((response) => response.json())
            .then(() => navigate("/game"))
            .catch((error) => console.error(error));
    };

    return (
        <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">

                {/* Header Section */}
                <div className="d-flex align-items-center justify-content-between mb-5 px-3">
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={() => navigate("/game")} className="btn-back-control border-0 bg-transparent">
                            <ArrowLeft size={28} className="text-white opacity-75" />
                        </button>
                        <div>
                            <h2 className="brand-title h3 mb-0 text-white fw-bold">GAME INGESTION</h2>
                            <p className="text-info small fw-bold mb-0 d-flex align-items-center gap-2">
                                <Gamepad2 size={14} /> NEW ENTRY: DATABASE SYNC
                            </p>
                        </div>
                    </div>
                    <button className="btn-neon-action gray-variant d-flex align-items-center gap-2 px-3 py-2"
                        onClick={() => navigate('/')}>
                        <Home size={18} />
                        <span className="text-white fw-bold">Home</span>
                    </button>
                </div>

                <div className="row g-4">
                    {/* Left Column: RAWG Search */}
                    <div className="col-lg-4">
                        <div className="admin-card-wrapper p-4 border border-secondary rounded-4 bg-dark-soft h-100">
                            <h5 className="text-info fw-bold mb-4 d-flex align-items-center gap-2">
                                <Search size={20} /> AUTO-IMPORT DATA
                            </h5>

                            <form onSubmit={handleRawgSearch} className="input-group mb-4">
                                <input
                                    type="text"
                                    className="form-control custom-input-dark"
                                    placeholder="Search RAWG database..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="btn btn-info text-dark fw-bold" type="submit">
                                    <Search size={18} />
                                </button>
                            </form>

                            <div className="search-results-container">
                                {isSearching ? (
                                    <div className="text-center py-3"><div className="spinner-border text-info spinner-border-sm"></div></div>
                                ) : (
                                    searchResults.map(game => (
                                        <button
                                            key={game.id}
                                            className="search-item-btn w-100 mb-2 d-flex align-items-center gap-3 p-2 rounded-3 border-0"
                                            onClick={() => selectGame(game)}
                                        >
                                            <img src={game.background_image} alt="" className="rounded-2" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                            <span className="text-white small text-start fw-bold">{game.name}</span>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="admin-card-wrapper p-4 border border-info rounded-4 bg-dark-soft shadow-lg">
                            <form onSubmit={sendData}>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label text-info small fw-bold"><BarChart3 size={14} /> COMPANY ID</label>
                                        <input value={companyId} onChange={(e) => setCompanyId(e.target.value)} type="number" className="form-control custom-input-dark" />
                                    </div>
                                    <div className="col-md-8 mb-3">
                                        <label className="form-label text-info small fw-bold"><Gamepad2 size={14} /> GAME NAME</label>
                                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control custom-input-dark" required placeholder="Project Name..." />
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <label className="form-label text-info small fw-bold"><ImageIcon size={14} /> COVER ASSET (URL)</label>
                                        <input value={coverImg} onChange={(e) => setCoverImg(e.target.value)} type="text" className="form-control custom-input-dark" placeholder="https://..." />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label text-info small fw-bold"><Globe size={14} /> TRAILER LINK</label>
                                        <input value={trailer} onChange={(e) => setTrailer(e.target.value)} type="text" className="form-control custom-input-dark" placeholder="YouTube/Vimeo URL" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label text-info small fw-bold"><Calendar size={14} /> LAUNCH DATE</label>
                                        <input value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} type="text" className="form-control custom-input-dark" placeholder="YYYY-MM-DD" />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label text-info small fw-bold"><Users size={14} /> ACTIVE PLAYERS</label>
                                        <input value={currentPlayers} onChange={(e) => setCurrentPlayers(e.target.value)} type="number" className="form-control custom-input-dark" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label text-info small fw-bold"><BarChart3 size={14} /> TOTAL SALES</label>
                                        <input value={totalSales} onChange={(e) => setTotalSales(e.target.value)} type="number" className="form-control custom-input-dark" />
                                    </div>

                                    <div className="col-md-12 mb-4">
                                        <label className="form-label text-info small fw-bold"><FileText size={14} /> SOURCE DESCRIPTION</label>
                                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control custom-input-dark" rows="4" placeholder="Brief metadata description..."></textarea>
                                    </div>
                                </div>

                                <button type="submit" className="btn-success-neon w-100 py-3 d-flex align-items-center justify-content-center gap-2 shadow-sm">
                                    <PlusCircle size={20} /> DEPLOY TO DATABASE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewGame