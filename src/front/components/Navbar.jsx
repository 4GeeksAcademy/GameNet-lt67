import { Link } from "react-router-dom";
import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<>
		{store.auth? 
		<nav className="navbar navbar-expand-lg custom-header sticky-top p-0">
			<div className="container" style={{ height: '70px' }}>
				{/* Logo Section con Glow */}
				<a className="navbar-brand d-flex align-items-center gap-3 m-0" href="#">
					<div className="logo-box-wrapper">
						<div className="logo-glow"></div>
						<div className="logo-box">
							<span className="logo-letter">G</span>
						</div>
					</div>
					<span className="brand-title">GameNet</span>
				</a>

				{/* Buscador Estilizado */}
				<div className="search-bar-wrapper d-none d-md-flex flex-fill mx-lg-5 mx-3">
					<Search size={18} className="search-icon" />
					<input
						type="text"
						className="form-control custom-input w-100"
						placeholder="Search games, companies, updates..."
					/>
				</div>

				{/* Botones de Iconos */}
				<div className="d-flex align-items-center gap-2">
					<button className="btn-icon">
						<Bell size={22} />
						<span className="notification-badge"></span>
					</button>
					<button className="btn-icon">
						<User size={22} />
					</button>
				</div>
			</div>
		</nav>
		:null}
		</>
	);
};