import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function Console (){

    const navigate = useNavigate()

    const [console, setConsole] = useState({})

    const { consoleId } = useParams()

     useEffect(() => async () => {
    try {
      const response = await
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/console/" + consoleId)
      const data = await response.json()
      setConsole(data)

    } catch (error) {
      console.log(error)
    }
  }, [])

    return (
        <>
            <h1>Console Details</h1>
            <ul>
                <li>Name: {console.name}</li>
                <li>Price: {console.price}</li>

            </ul>
            <button onClick={()=> navigate("/console")} className="btn btn-primary">Go back</button>
        </>
    )
}


export default Console