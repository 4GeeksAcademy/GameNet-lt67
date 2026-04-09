import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

function GameFavoriteList (){

    const { userId } = useParams()
    const navigate = useNavigate()
    const [gameFavorites, setGameFavorites] = useState([])

    async function getGameFavorites() {
        if (!userId) return
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/favorites/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setGameFavorites(data)
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

    useEffect(() => {
        getGameFavorites();
    }, [userId])


    function deleteGameFavorites(gameId) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/favorites/" + userId +"/"+ gameId, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                getGameFavorites()
            })
            .catch((error) => console.error(error));
    }

    return(
       
        <div className="container mt-4">
            <h2>User Favorites {userId}</h2>
            <ul>
                {gameFavorites.map((fav) => (
                    <li key={fav.id}>
                        {fav.game_name} - {fav.user_name}
                        <button 
                            className="btn btn-danger btn-sm ms-2" 
                            onClick={() => deleteGameFavorites(fav.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <button className="btn btn-primary" onClick={()=>navigate('/game/favorites')}>Associate game to user</button>
            <button className="btn btn-primary" onClick={()=>navigate('/')}>Home</button>
        </div>
    )
}

export default GameFavoriteList