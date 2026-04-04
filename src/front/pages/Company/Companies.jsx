import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Companies (){
 
    const navigate = useNavigate()
    const [companies, setCompanies] = useState([])

    async function getCompanies() {
        try{
            const response = await
            fetch(import.meta.env.VITE_BACKEND_URL + "/api/company")
            const data = await response.json()
            setCompanies(data)
            
        } catch(error){
            console.log(error)
        }
        
    }

    useEffect(() => {
        getCompanies()
        console.log("la pagina cargo")
    }, [])

    function deleteCompany(id) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/company/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                getCompanies()
            })
            .catch((error) => console.error(error));
    }

    return(
        <>
            <ul>
                {companies.map((company) => {
                    return (<li key={company.id}>
                        name: {company.name} <br />
                        email: {company.email} <br />
                        description: {company.description} <br />
                        website: {company.website_url} <br />
                        logo: {company.logo_img} <br />
                        banner: {company.banner_img} <br />
                        <button className="btn btn-primary" onClick={()=>{
                            navigate('/update_company/'+company.id)
                            }}>Edit</button>
                        <Link to={"/company/"+company.id} className="btn btn-primary">See details</Link>
                        <button className="btn btn-danger" onClick={()=>deleteCompany(company.id)}>Delete</button>
                    </li>)
                })}
            </ul>
            <button className="btn btn-primary" onClick={()=>navigate('/new_company')}>Create a new Company</button>
        </>
    )
}

export default Companies