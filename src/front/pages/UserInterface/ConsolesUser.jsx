import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function ConsolesUser (){

    const navigate = useNavigate()
    const [consoles, setConsoles] = useState([])

    async function getConsoles() {
        try{
            const response = await
            fetch(import.meta.env.VITE_BACKEND_URL + "/api/console")
            const data = await response.json()
            setConsoles(data)
            
        } catch(error){
            console.log(error)
        }
        
    }

    useEffect(() => {
        getConsoles()
    }, [])

    function addFavorites(id) {
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/console/favorites" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
            })
            .catch((error) => console.error(error));
    }


    function removeFavorites(id) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/console/favorites" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
            })
            .catch((error) => console.error(error));
    }


    return(
        <>
            <ul>
                {consoles.map((console) => {
                    return (<li key={console.id}>
                        name: {console.name} <br />
                        price: {console.price} <br />

                        <button className="btn btn-danger" onClick={()=>deleteConsole(console.id)}>Add to Favorites</button>
                    </li>)
                })}
            </ul>
            <button className="btn btn-primary" onClick={()=>navigate('/new_console')}>Add a Console</button>
        </>
    )
}

export default ConsolesUser