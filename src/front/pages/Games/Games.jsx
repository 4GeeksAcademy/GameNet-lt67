import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Games (){
 
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    async function getGames() {
        try{
            const response = await
            fetch(import.meta.env.VITE_BACKEND_URL + "/api/game")
            const data = await response.json()
            setGames(data)
            
        } catch(error){
            console.log(error)
        }
        
    }

    useEffect(() => {
        getGames()
        console.log("la pagina cargo")
    }, [])

    function deleteGame(id) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                getGames()
            })
            .catch((error) => console.error(error));
    }

    return(
        <>
            <ul>
                {games.map((game) => {
                    return (<li key={game.id}>
                        Company ID: {game.id_company} <br />
                        name: {game.name} <br />
                        trailer: {game.trailer_url} <br />
                        release date: {game.release_date} <br />
                        total sales: {game.total_sales} <br />
                        current players: {game.current_players} <br />
                        description: {game.description} <br />
                        cover img: {game.cover_img} <br />
                        <button className="btn btn-primary" onClick={()=>{
                            navigate('/update_game/'+game.id)
                            }}>Edit</button>
                        <Link to={"/game/"+game.id} className="btn btn-primary">See details</Link>
                        <button className="btn btn-danger" onClick={()=>deleteGame(game.id)}>Delete</button>
                    </li>)
                })}
            </ul>
            <button className="btn btn-primary" onClick={()=>navigate('/new_game')}>Create a new Game</button>
        </>
    )
}

export default Games