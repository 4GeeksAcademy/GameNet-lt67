import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function Company (){

    const navigate = useNavigate()

    const [company, setCompany] = useState({})

    const { companyId } = useParams()

     useEffect(() => async () => {
    try {
      const response = await
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/company/" + companyId)
      const data = await response.json()
      setCompany(data)

    } catch (error) {
      console.log(error)
    }
  }, [])

    return (
        <>
            <h1>Company Details</h1>
            <ul>
                <li>Name: {company.name}</li>
                <li>Email: {company.email}</li>
                <li>Description: {company.description}</li>
                <li>Website: {company.website_url}</li>
                <li>Logo: {company.logo_img}</li>
                <li>Banner: {company.banner_img}</li>

            </ul>
            <button onClick={()=> navigate("/company")} className="btn btn-primary">Go back</button>
        </>
    )
}


export default Company