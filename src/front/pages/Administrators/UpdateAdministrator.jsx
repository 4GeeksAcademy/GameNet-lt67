import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate,  useParams } from "react-router-dom";


function UpdateAdministrator() {
    const { adminId } = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    useEffect(()=>{
            fetch(import.meta.env.VITE_BACKEND_URL + "/api/administrator/"+adminId)
            .then(response=> response.json())
            .then(data=> {
                setName(data.name)
                setEmail(data.email)
                setPassword(data.password)
            })
            .catch((error) => console.log(error))
    },[])

    function sendData(e) {
        e.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "name": name,
                    "email": email
                }
            )
        }
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/administrator/" + adminId, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
            })
            .catch((error) => console.error(error));

        
        navigate("/administrator")
    }

    return (
        <div>
            <h1 className="">Edit your account</h1>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Your name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
            <button onClick={()=> navigate("/administrator")} className="btn btn-primary">Back home</button>
        </div>
    )
}

export default UpdateAdministrator
