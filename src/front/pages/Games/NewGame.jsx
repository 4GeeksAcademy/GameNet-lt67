import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewGame() {
    const navigate = useNavigate()

    const [companyId, setCompanyId] = useState(0)
    const [name, setName] = useState('')
    const [trailer, setTrailer] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [totalSales, setTotalSales] = useState(0)
    const [currentPlayers, setCurrentPlayers] = useState(0)
    const [description, setDescription] = useState('')
    const [coverImg, setCoverImg] = useState('')


    function sendData(e) {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "id_company": companyId,
                    "name": name,
                    "trailer_url": trailer,
                    "release_date": releaseDate,
                    "total_sales": totalSales,
                    "current_players": currentPlayers,
                    "description": description,
                    "cover_img": coverImg
                }
            )
        }
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
            })
            .catch((error) => console.error(error));

        navigate("/game")
    }

    return (
        <div>
            <h1 className="">Create Game</h1>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Company ID</label>
                    <input value={companyId} onChange={(e) => setCompanyId(e.target.value)} type="number" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Game name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Trailer</label>
                    <input value={trailer} onChange={(e) => setTrailer(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Release Date</label>
                    <input value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Current Players</label>
                    <input value={currentPlayers} onChange={(e) => setCurrentPlayers(e.target.value)} type="number" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Total Sales</label>
                    <input value={totalSales} onChange={(e) => setTotalSales(e.target.value)} type="number" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Cover IMG</label>
                    <input value={coverImg} onChange={(e) => setCoverImg(e.target.value)} type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
            <button onClick={() => navigate("/game")} className="btn btn-primary">Go back</button>
        </div>
    )
}

export default NewGame