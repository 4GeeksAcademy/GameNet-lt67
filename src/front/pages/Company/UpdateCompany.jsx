import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate,  useParams } from "react-router-dom";


function UpdateCompany() {
    const { companyId } = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [website, setWebsite] = useState('')
    const [logo, setLogo] = useState('')
    const [banner, setBanner] = useState('')


    useEffect(()=>{
            fetch(import.meta.env.VITE_BACKEND_URL + "/api/company/"+companyId)
            .then(response=> response.json())
            .then(data=> {
                setName(data.name)
                setEmail(data.email)
                setDescription(data.description)
                setWebsite(data.website_url)
                setLogo(data.logo_img)
                setBanner(data.banner_img)
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
                    "email": email,
                    "description": description,
                    "website_url": website,
                    "logo_img": logo,
                    "banner_img": banner
                
                }
            )
        }
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/company/" + companyId, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
            })
            .catch((error) => console.error(error));

        
        navigate("/company")
    }

    return (
        <div>
            <h1 className="">Edit your Company</h1>
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
                    <label htmlFor="InputDescription" className="form-label">Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputWebsite" className="form-label">Website URL</label>
                    <input value={website} onChange={(e) => setWebsite(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputLogo" className="form-label">Logo</label>
                    <input value={logo} onChange={(e) => setLogo(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputBanner" className="form-label">Banner</label>
                    <input value={banner} onChange={(e) => setBanner(e.target.value)} type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
            <button onClick={()=> navigate("/company")} className="btn btn-primary">Go back</button>
        </div>
    )
}

export default UpdateCompany