import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import { PostCard } from "../components/PostCard.jsx";
import { Sidebar } from "../components/Sidebar.jsx";
import { Sparkles } from 'lucide-react';
import { getPosts } from "../actions.js";


export const Home = () => {

	const navigate = useNavigate()
	const { store, dispatch } = useGlobalReducer()
	const [filter, setFilter] = useState("all")

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		getPosts(dispatch)
	}, [])

	const filteredPosts = filter === "all"
		? store.posts
		: store.posts.filter(post => post.content.type === filter);

	return (
		<>
			{store.auth ?
				<div className="main-layout">

					<div className="container py-4">
						<div className="row g-4">


							<main className="col-12 col-lg-8">
								<div className="d-flex flex-column gap-4">


									<div className="welcome-banner p-4 rounded-4 position-relative overflow-hidden">
										<div className="position-relative z-1">
											<div className="d-flex align-items-center gap-2 mb-2">
												<Sparkles className="sparkle-icon" size={20} />
												<h2 className="h4 fw-bold m-0">Welcome to GameNet</h2>
											</div>
											<p className="text-secondary m-0">
												Stay updated with the latest game releases, updates, and announcements from your favorite gaming companies.
											</p>
										</div>

										<div className="banner-overlay"></div>
									</div>


									<div className="filter-tabs d-flex gap-2 pb-2">
										<button
											className={`btn ${filter === "all" ? "btn-gradient" : "btn-outline-custom"}`}
											onClick={() => setFilter("all")}
										>
											All Posts
										</button>

										<button
											className={`btn ${filter === "release" ? "btn-gradient" : "btn-outline-custom"}`}
											onClick={() => setFilter("release")}
										>
											Releases
										</button>

										<button
											className={`btn ${filter === "update" ? "btn-gradient" : "btn-outline-custom"}`}
											onClick={() => setFilter("update")}
										>
											Updates
										</button>

										<button
											className={`btn ${filter === "event" ? "btn-gradient" : "btn-outline-custom"}`}
											onClick={() => setFilter("event")}
										>
											Events
										</button>

										<button
											className={`btn ${filter === "announcement" ? "btn-gradient" : "btn-outline-custom"}`}
											onClick={() => setFilter("announcement")}
										>
											Announcements
										</button>
									</div>


									<div className="d-flex flex-column gap-4">
										{filteredPosts.map((post) => (
											<PostCard
												data={post.id}
												key={post.id}
												id={post.id}
												company={post.company}
												content={post.content}
												timestamp={post.timestamp}
												stats={post.stats}
												user_liked={post.user_liked}
											/>
										))}
									</div>


									<div className="d-flex justify-content-center py-3">
										<button className="btn btn-load-more">
											Load More Posts
										</button>
									</div>
								</div>
							</main>


							<aside className="col-12 col-lg-4">
								<div className="sticky-sidebar">
									<Sidebar />
								</div>
							</aside>

						</div>
					</div>
				</div>
				: navigate("/login")}
		</>
	);
}; 