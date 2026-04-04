import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewCompany (){
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [description, setDescription] = useState('')
    const [website, setWebsite] = useState('')
    const [logo, setLogo] = useState('')
    const [banner, setBanner] = useState('')
    

    function sendData(e) {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "name": name,
                    "email": email,
                    "password": password,
                    "description": description,
                    "website_url": website,
                    "logo_img": logo,
                    "banner_img": banner
                }
            )
        }
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/company", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
            })
            .catch((error) => console.error(error));

        navigate("/company")
    }

    return (
        <div>
            <h1 className="">Create your Company</h1>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Company name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Website URL</label>
                    <input value={website} onChange={(e) => setWebsite(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Logo</label>
                    <input value={logo} onChange={(e) => setLogo(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Banner</label>
                    <input value={banner} onChange={(e) => setBanner(e.target.value)} type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
            <button onClick={()=> navigate("/company")} className="btn btn-primary">Go back</button>
        </div>
    )
}

export default NewCompany