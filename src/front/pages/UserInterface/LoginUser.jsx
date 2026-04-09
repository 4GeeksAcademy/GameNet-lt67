import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer";


function LoginUser() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {store, dispatch} = useGlobalReducer()
    const navigate = useNavigate()

    function sendData(e) {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "email": email,
                    "password": password
                }
            )
        }
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/login", requestOptions)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: 'set_auth',
                    payload: true
                })
                localStorage.setItem("auth", true)
                localStorage.setItem("token", data.access_token)
            })

        navigate("/")
    }

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                </div>
                <div className="d-flex mb-3">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <Link to="/user/signup">
                        <button className="btn btn-primary">Create account</button>
                    </Link>
                </div>


            </form>
        </div>
    )
}

export default LoginUser