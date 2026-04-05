import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function CompanyPosts (){
 
    const navigate = useNavigate()
    const [companyPosts, setCompanyPosts] = useState([])

    async function getCompanyPosts() {
        try{
            const response = await
            fetch(import.meta.env.VITE_BACKEND_URL + "/api/companypost")
            const data = await response.json()
            setCompanyPosts(data)
            
        } catch(error){
            console.log(error)
        }
        
    }

    useEffect(() => {
        getCompanyPosts()
    }, [])

    function deleteCompanyPost(id) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/companypost/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                getCompanyPosts()
            })
            .catch((error) => console.error(error));
    }

    return(
        <>
            <ul>
                {companyPosts.map((post) => {
                    return (<li key={post.id}>
                        Company ID: {post.id_company} <br />
                        message: {post.message} <br />
                        image: {post.image} <br />
                        post date: {post.post_date} <br />
                        <button className="btn btn-primary" onClick={()=>{
                            navigate('/update_companypost/'+post.id)
                            }}>Edit</button>
                        <Link to={"/companypost/"+post.id} className="btn btn-primary">See details</Link>
                        <button className="btn btn-danger" onClick={()=>deleteCompanyPost(post.id)}>Delete</button>
                    </li>)
                })}
            </ul>
            <button className="btn btn-primary" onClick={()=>navigate('/new_companypost')}>Create a new Company Post</button>
        </>
    )
}

export default CompanyPosts