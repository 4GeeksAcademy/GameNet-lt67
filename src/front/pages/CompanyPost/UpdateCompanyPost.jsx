import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function UpdateCompanyPost() {
    const { companyPostId } = useParams()
    const navigate = useNavigate()

    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')
    const [postDate, setPostDate] = useState('')


    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/companypost/" + companyPostId)
            .then(response => response.json())
            .then(data => {
                setMessage(data.message)
                setImage(data.image)
                setPostDate(data.post_date)
            })
            .catch((error) => console.log(error))
    }, [])

    function sendData(e) {
        e.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "message": message,
                    "image": image,
                    "post_date": postDate
                }
            )
        }
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/companypost/" + companyPostId, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
            })
            .catch((error) => console.error(error));


        navigate("/companypost")
    }

    return (
        <div>
            <h1 className="">Edit your Post</h1>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Post Message</label>
                    <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Image</label>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Post Date</label>
                    <input value={postDate} onChange={(e) => setPostDate(e.target.value)} type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
            <button onClick={() => navigate("/companypost")} className="btn btn-primary">Go back</button>
        </div>
    )
}

export default UpdateCompanyPost