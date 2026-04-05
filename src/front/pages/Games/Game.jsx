import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function Game (){

    const navigate = useNavigate()

    const [game, setGame] = useState({})

    const { gameId } = useParams()

     useEffect(() => async () => {
    try {
      const response = await
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/" + gameId)
      const data = await response.json()
      setGame(data)

    } catch (error) {
      console.log(error)
    }
  }, [])

    return (
        <>
            <h1>Game Details</h1>
            <ul>
                <li>Company ID: {game.id_company}</li>
                <li>Name: {game.name}</li>
                <li>Trailer: {game.trailer_url}</li>
                <li>Release Date: {game.release_date}</li>
                <li>Total Sales: {game.total_sales}</li>
                <li>Current Players: {game.current_players}</li>
                <li>Description: {game.description}</li>
                <li>Cover: {game.cover_img}</li>

            </ul>
            <button onClick={()=> navigate("/game")} className="btn btn-primary">Go back</button>
        </>
    )
}


export default Game