import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

function ConsoleFavoritesList (){

    const { userId } = useParams()
    const navigate = useNavigate()
    const [consoleFavorites, setConsoleFavorites] = useState([])

    async function getConsoleFavorites() {
        if (!userId) return
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/console/favorites/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setConsoleFavorites(data)
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

    useEffect(() => {
        getConsoleFavorites();
    }, [userId])


    function deleteConsoleFavorites(consoleId) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/console/favorites/" + userId +"/"+ consoleId, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                getConsoleFavorites()
            })
            .catch((error) => console.error(error));
    }

    return(
       
        <div className="container mt-4">
            <h2>User Favorites {userId}</h2>
            <ul>
                {consoleFavorites.map((fav) => (
                    <li key={fav.id}>
                        {fav.console_name} - {fav.user_name}
                        <button 
                            className="btn btn-danger btn-sm ms-2" 
                            onClick={() => deleteConsoleFavorites(fav.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <button className="btn btn-primary" onClick={()=>navigate('/console/favorites')}>Associate console to user</button>
            <button className="btn btn-primary" onClick={()=>navigate('/')}>Home</button>
        </div>
    )
}

export default ConsoleFavoritesList