import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewConsole (){
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    function sendData(e) {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "name": name,
                    "price": price
                }
            )
        }
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/console", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
            })
            .catch((error) => console.error(error));

        console.log("sending data")
        navigate("/console")
    }

    return (
        <div>
            <h1 className="">Add a Console</h1>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Console name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Price</label>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
            <button onClick={()=> navigate("/console")} className="btn btn-primary">Go back</button>
        </div>
    )
}

export default NewConsole