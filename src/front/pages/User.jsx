import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function User (){

    const navigate = useNavigate()

    const [user, setUser] = useState({})

    const { userId } = useParams()

     useEffect(() => async () => {
    try {
      const response = await
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/" + userId)
      const data = await response.json()
      setUser(data)

    } catch (error) {
      console.log(error)
    }
  }, [])

    return (
        <>
            <h1>User Details</h1>
            <ul>
                <li>Nickname: {user.nickname}</li>
                <li>Email: {user.email}</li>

            </ul>
            <button onClick={()=> navigate("/user")} className="btn btn-primary">Back home</button>
        </>
    )
}


export default User