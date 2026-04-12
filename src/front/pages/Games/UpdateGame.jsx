import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
    Edit, Save, ArrowLeft, Gamepad2, 
    Image as ImageIcon, Calendar, Users, 
    TrendingUp, FileText, Building2, Link as LinkIcon 
} from "lucide-react";

function UpdateGame() {
    const { gameId } = useParams()
    const navigate = useNavigate()

    const [companyId, setCompanyId] = useState(0)
    const [name, setName] = useState('')
    const [trailer, setTrailer] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [totalSales, setTotalSales] = useState(0)
    const [currentPlayers, setCurrentPlayers] = useState(0)
    const [description, setDescription] = useState('')
    const [coverImg, setCoverImg] = useState('')

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/" + gameId)
            .then(response => response.json())
            .then(data => {
                setCompanyId(data.id_company)
                setName(data.name)
                setTrailer(data.trailer_url)
                setReleaseDate(data.release_date)
                setTotalSales(data.total_sales)
                setCurrentPlayers(data.current_players)
                setDescription(data.description)
                setCoverImg(data.cover_img)
            })
            .catch((error) => console.log(error))
    }, [gameId])

    function sendData(e) {
        e.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id_company": companyId,
                "name": name,
                "trailer_url": trailer,
                "release_date": releaseDate,
                "total_sales": totalSales,
                "current_players": currentPlayers,
                "description": description,
                "cover_img": coverImg
            })
        }
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/" + gameId, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        navigate("/game")
    }

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
                            <h2 className="brand-title h3 mb-0 text-white fw-bold">OVERRIDE GAME DATA</h2>
                            <p className="text-purple-neon small fw-bold mb-0 d-flex align-items-center gap-2">
                                <Edit size={14} /> MODIFYING ENTRY: #{gameId}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Preview Column */}
                    <div className="col-lg-4">
                        <div className="admin-card-wrapper p-4 border border-secondary rounded-4 bg-dark-soft text-center h-100">
                            <h6 className="text-purple-neon fw-bold mb-3 uppercase small">Live Preview</h6>
                            <div className="preview-image-container mb-3">
                                {coverImg ? (
                                    <img src={coverImg} alt="Preview" className="img-fluid rounded-3 shadow-lg border border-secondary" style={{ maxHeight: '300px', objectFit: 'cover' }} />
                                ) : (
                                    <div className="placeholder-preview rounded-3 d-flex align-items-center justify-content-center border border-dashed border-secondary text-secondary" style={{ height: '300px' }}>
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                            </div>
                            <h4 className="text-white fw-bold mb-1">{name || "Untitled Game"}</h4>
                            <span className="badge bg-purple-neon-transparent text-purple-neon">CID: {companyId}</span>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="col-lg-8">
                        <div className="admin-card-wrapper p-4 border border-purple-neon rounded-4 bg-dark-soft shadow-lg">
                            <form onSubmit={sendData}>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label text-purple-neon small fw-bold"><Building2 size={14}/> COMPANY ID</label>
                                        <input value={companyId} onChange={(e) => setCompanyId(e.target.value)} type="number" className="form-control custom-input-dark-purple" />
                                    </div>
                                    <div className="col-md-8 mb-3">
                                        <label className="form-label text-purple-neon small fw-bold"><Gamepad2 size={14}/> GAME NAME</label>
                                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control custom-input-dark-purple" required />
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <label className="form-label text-purple-neon small fw-bold"><ImageIcon size={14}/> COVER IMAGE URL</label>
                                        <input value={coverImg} onChange={(e) => setCoverImg(e.target.value)} type="text" className="form-control custom-input-dark-purple" />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label text-purple-neon small fw-bold"><LinkIcon size={14}/> TRAILER URL</label>
                                        <input value={trailer} onChange={(e) => setTrailer(e.target.value)} type="text" className="form-control custom-input-dark-purple" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label text-purple-neon small fw-bold"><Calendar size={14}/> RELEASE DATE</label>
                                        <input value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} type="text" className="form-control custom-input-dark-purple" />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label text-purple-neon small fw-bold"><Users size={14}/> CURRENT PLAYERS</label>
                                        <input value={currentPlayers} onChange={(e) => setCurrentPlayers(e.target.value)} type="number" className="form-control custom-input-dark-purple" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label text-purple-neon small fw-bold"><TrendingUp size={14}/> TOTAL SALES</label>
                                        <input value={totalSales} onChange={(e) => setTotalSales(e.target.value)} type="number" className="form-control custom-input-dark-purple" />
                                    </div>

                                    <div className="col-md-12 mb-4">
                                        <label className="form-label text-purple-neon small fw-bold"><FileText size={14}/> DESCRIPTION</label>
                                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control custom-input-dark-purple" rows="3"></textarea>
                                    </div>
                                </div>

                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn-purple-action w-100 py-3 d-flex align-items-center justify-content-center gap-2">
                                        <Save size={20} /> SYNC CHANGES
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateGame;