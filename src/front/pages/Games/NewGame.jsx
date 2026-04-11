import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, PlusCircle, ArrowLeft, Gamepad2 } from "lucide-react";

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
        if (!searchQuery) return;
        setIsSearching(true);
        const apiKey = import.meta.env.VITE_RAWG_API_KEY;

        try {
            const response = await fetch(`https://api.rawg.io/api/games?search=${searchQuery}&key=${apiKey}&page_size=5`);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error("Error RAWG:", error);
        } finally {
            setIsSearching(false);
        }
    };

    // Función para autocompletar el formulario
    const selectGame = async (game) => {
        setName(game.name);
        setCoverImg(game.background_image);
        setReleaseDate(game.released);
        setSearchResults([]); // Limpiar resultados
        setSearchQuery('');
        
        // Opcional: Buscar descripción detallada
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
        <div className="container py-5 text-white">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="gamenet-card-title m-0">Create New Game</h1>
                <button onClick={() => navigate("/game")} className="btn gamenet-btn-ghost d-flex align-items-center gap-2">
                    <ArrowLeft size={18} /> Back
                </button>
            </div>

            <div className="row g-5">
  
                <div className="col-lg-5">
                    <div className="game-detail-container p-4">
                        <h4 className="mb-4 d-flex align-items-center gap-2">
                            <Gamepad2 className="text-info" /> Search a Game
                        </h4>
                        <form onSubmit={handleRawgSearch} className="d-flex gap-2 mb-4">
                            <input 
                                type="text" 
                                className="form-control bg-dark text-white border-secondary"
                                placeholder="E.g. Halo, Zelda..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-info text-white shadow-sm">
                                <Search size={18} />
                            </button>
                        </form>

                        <div className="list-group">
                            {searchResults.map(game => (
                                <button 
                                    key={game.id} 
                                    className="list-group-item list-group-item-action bg-dark text-white border-secondary d-flex align-items-center gap-3"
                                    onClick={() => selectGame(game)}
                                >
                                    <img src={game.background_image} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px' }} />
                                    <span className="small">{game.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-lg-7">
                    <form className="game-detail-container p-4" onSubmit={sendData}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label text-secondary small">Company ID</label>
                                <input value={companyId} onChange={(e) => setCompanyId(e.target.value)} type="number" className="form-control bg-dark text-white border-secondary" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label text-secondary small">Game Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control bg-dark text-white border-secondary" required />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label className="form-label text-secondary small">Cover Image URL</label>
                                <input value={coverImg} onChange={(e) => setCoverImg(e.target.value)} type="text" className="form-control bg-dark text-white border-secondary" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label text-secondary small">Trailer URL</label>
                                <input value={trailer} onChange={(e) => setTrailer(e.target.value)} type="text" className="form-control bg-dark text-white border-secondary" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label text-secondary small">Release Date</label>
                                <input value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} type="text" className="form-control bg-dark text-white border-secondary" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label text-secondary small">Current Players</label>
                                <input value={currentPlayers} onChange={(e) => setCurrentPlayers(e.target.value)} type="number" className="form-control bg-dark text-white border-secondary" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label text-secondary small">Total Sales</label>
                                <input value={totalSales} onChange={(e) => setTotalSales(e.target.value)} type="number" className="form-control bg-dark text-white border-secondary" />
                            </div>
                            <div className="col-md-12 mb-4">
                                <label className="form-label text-secondary small">Description</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control bg-dark text-white border-secondary" rows="3"></textarea>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 py-3 fw-bold shadow-lg d-flex align-items-center justify-content-center gap-2">
                            <PlusCircle size={20} /> Add Game to Database
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewGame;