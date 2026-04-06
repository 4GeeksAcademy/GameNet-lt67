import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Consoles (){

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

    function deleteConsole(id) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/console/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                getConsoles()
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
                        <button className="btn btn-primary" onClick={()=>{
                            navigate('/update_console/'+console.id)
                            }}>Edit</button>
                        <Link to={"/console/"+console.id} className="btn btn-primary">See details</Link>
                        <button className="btn btn-danger" onClick={()=>deleteConsole(console.id)}>Delete</button>
                    </li>)
                })}
            </ul>
            <button className="btn btn-primary" onClick={()=>navigate('/new_console')}>Add a Console</button>
        </>
    )
}

export default Consoles