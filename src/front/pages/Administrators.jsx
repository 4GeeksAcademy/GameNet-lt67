import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Administrators (){

    const navigate = useNavigate()
    const [admins, setAdmins] = useState([])

    async function getAdmins() {
        try{
            const response = await
            fetch(import.meta.env.VITE_BACKEND_URL + "/api/administrator")
            const data = await response.json()
            setAdmins(data)
            
        } catch(error){
            console.log(error)
        }
        
    }

    useEffect(() => {
        getAdmins()
        console.log("la pagina cargo")
    }, [])

    function deleteAdmin(id) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/administrator/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                getAdmins()
            })
            .catch((error) => console.error(error));
    }

    return(
        <>
            <ul>
                {admins.map((admin) => {
                    return (<li key={admin.id}>
                        name: {admin.name} <br />
                        email: {admin.email} <br />
                        <button className="btn btn-primary" onClick={()=>{
                            navigate('/update_administrator/'+admin.id)
                            }}>Edit</button>
                        <Link to={"/administrator/"+admin.id} className="btn btn-primary">See details</Link>
                        <button className="btn btn-danger" onClick={()=>deleteAdmin(admin.id)}>Delete</button>
                    </li>)
                })}
            </ul>
            <button className="btn btn-primary" onClick={()=>navigate('/new_administrator')}>Create a new Admin</button>
        </>
    )
}

export default Administrators