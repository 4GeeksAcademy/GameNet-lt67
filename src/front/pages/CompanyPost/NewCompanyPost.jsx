import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewCompanyPost() {
    const navigate = useNavigate()

    const [companyId, setCompanyId] = useState(0)
    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')
    const [postDate, setPostDate] = useState('')

    function sendData(e) {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "id_company": companyId,
                    "message": message,
                    "image": image,
                    "post_date": postDate
                }
            )
        }
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/companypost", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
            })
            .catch((error) => console.error(error));

        navigate("/companypost")
    }

    return (
        <div>
            <h1 className="">Create Post</h1>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Company ID</label>
                    <input value={companyId} onChange={(e) => setCompanyId(e.target.value)} type="number" className="form-control" />
                </div>
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
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
            <button onClick={() => navigate("/companypost")} className="btn btn-primary">Go back</button>
        </div>
    )
}

export default NewCompanyPost