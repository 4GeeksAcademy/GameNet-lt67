import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function Administrator (){

    const navigate = useNavigate()

    const [admin, setAdmin] = useState({})

    const { adminId } = useParams()

     useEffect(() => async () => {
    try {
      const response = await
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/administrator/" + adminId)
      const data = await response.json()
      setAdmin(data)

    } catch (error) {
      console.log(error)
    }
  }, [])

    return (
        <>
            <h1>Admin Details</h1>
            <ul>
                <li>Name: {admin.name}</li>
                <li>Email: {admin.email}</li>

            </ul>
            <button onClick={()=> navigate("/administrator")} className="btn btn-primary">Back home</button>
        </>
    )
}


export default Administrator