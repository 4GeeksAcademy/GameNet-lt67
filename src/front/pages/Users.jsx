import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Users (){

    const navigate = useNavigate()
    const [users, setUsers] = useState([])

    async function getUsers() {
        try{
            const response = await
            fetch(import.meta.env.VITE_BACKEND_URL + "/api/user")
            const data = await response.json()
            setUsers(data)
            
        } catch(error){
            console.log(error)
        }
        
    }

    useEffect(() => {
        getUsers()
        console.log("la pagina cargo")
    }, [])

    function deleteUser(id) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                getUsers()
            })
            .catch((error) => console.error(error));
    }

    return(
        <>
            <ul>
                {users.map((user) => {
                    return (<li key={user.id}>
                        name: {user.nickname} <br />
                        email: {user.email} <br />
                        <button className="btn btn-primary" onClick={()=>{
                            navigate('/update_user/'+user.id)
                            }}>Edit</button>
                        <Link to={"/user/"+user.id} className="btn btn-primary">See details</Link>
                        <button className="btn btn-danger" onClick={()=>deleteUser(user.id)}>Delete</button>
                    </li>)
                })}
            </ul>
            <button className="btn btn-primary" onClick={()=>navigate('/new_user')}>Create a new User</button>
        </>
    )
}

export default Users