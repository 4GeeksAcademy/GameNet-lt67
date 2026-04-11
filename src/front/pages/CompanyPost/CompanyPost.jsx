import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function CompanyPost (){

    const navigate = useNavigate()

    const [companyPost, setCompanyPost] = useState({})

    const { companyPostId } = useParams()

     useEffect(() => async () => {
    try {
      const response = await
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/companypost/" + companyPostId)
      const data = await response.json()
      setCompanyPost(data)

    } catch (error) {
      console.log(error)
    }
  }, [])

    return (
        <>
            <h1>Post Details</h1>
            <ul>
                <li>Company ID: {companyPost.id_company}</li>
                <li>Content Type: {companyPost.message}</li>
                <li>Message: {companyPost.message}</li>
                <li>Image: {companyPost.image}</li>
                <li>Post Date: {companyPost.post_date}</li>

            </ul>
            <button onClick={()=> navigate("/companypost")} className="btn btn-primary">Go back</button>
        </>
    )
}


export default CompanyPost