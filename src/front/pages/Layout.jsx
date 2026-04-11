import { Outlet } from "react-router-dom/dist"
import React from "react"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const token = localStorage.getItem("token");

     
        if (token && !store.user) {
            const fetchMyData = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/me`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        
                        dispatch({ 
                            type: "login_user", 
                            payload: data 
                        });
                    } else {
                        
                        localStorage.removeItem("token");
                        dispatch({ type: "set_auth", payload: false });
                    }
                } catch (error) {
                    console.error("Error recuperando sesión:", error);
                }
            };

            fetchMyData();
        }
    }, [store.user, dispatch]);

    return (
        <ScrollToTop>
            <Navbar />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}