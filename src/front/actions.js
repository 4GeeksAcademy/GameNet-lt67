export const getPosts = async (dispatch) => {
    try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const token = localStorage.getItem("token"); 

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        };

        
        if (token && token !== "undefined") {
            options.headers["Authorization"] = `Bearer ${token}`;
        }

        
        const response = await fetch(`${baseUrl}/api/feed`, options);
        
        if (response.ok) {
            const data = await response.json();
            dispatch({
                type: 'set_posts',
                payload: data
            });
        } else {
            console.error("Failed to fetch feed:", response.status);
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};