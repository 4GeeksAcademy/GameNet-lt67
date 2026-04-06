import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function GameConsoleList (){

    const navigate = useNavigate()
    const [gameconsoles, setGameConsoles] = useState([])

    async function getGameConsoles() {
        try{
            const response = await
            fetch(import.meta.env.VITE_BACKEND_URL + "/api/gameconsole")
            const data = await response.json()
            setGameConsoles(data)
            
        } catch(error){
            console.log(error)
        }
        
    }

    useEffect(() => {
        getGameConsoles()
        console.log("la pagina cargo")
    }, [])

    function deleteGameConsole(id) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/gameconsole/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                getGameConsoles()
            })
            .catch((error) => console.error(error));
    }

    return(
        <>
            <ul>
                {gameconsoles.map((gameconsole) => {
                    return (<li key={gameconsole.id}>
                        Game Name: {gameconsole.game_name} <br />
                        Console: {gameconsole.console_name} <br />
    
                        <button className="btn btn-danger" onClick={()=>deleteGameConsole(gameconsole.id)}>Delete</button>
                    </li>)
                })}
            </ul>
            <button className="btn btn-primary" onClick={()=>navigate('/gameconsole')}>Associate game to console</button>
            <button className="btn btn-primary" onClick={()=>navigate('/')}>Home</button>
        </>
    )
}

export default GameConsoleList