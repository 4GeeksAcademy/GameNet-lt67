import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Footer = () => {
	const {store, dispatch} = useGlobalReducer()

	return(
	<>
	
	<footer className="footer-gamenet mt-auto border-top border-pink-soft">
        <div className="container py-5">
            <div className="row g-4">
               
                <div className="col-lg-4 col-md-6">
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <div className="footer-logo-box">G</div>
                        <h3 className="brand-title-footer h4 mb-0">GameNet</h3>
                    </div>
                    <p className="text-secondary small pe-lg-5">
                        The ultimate social network for hunters, players, and developers. 
                        Track your progress, rate titles, and connect with the industry core.
                    </p>
                    
                </div>

              
                <div className="col-lg-2 col-md-6 col-6">
                    <h6 className="text-white fw-bold mb-4 text-uppercase small" style={{ letterSpacing: '1px' }}>Platform</h6>
                    <ul className="list-unstyled footer-links">
                        <li><Link to="/">Database</Link></li>
                        <li><Link to="/">Latest Releases</Link></li>
                        <li><Link to="/">Top Rated</Link></li>
                    </ul>
                </div>

                <div className="col-lg-2 col-md-6 col-6">
                    <h6 className="text-white fw-bold mb-4 text-uppercase small" style={{ letterSpacing: '1px' }}>Company</h6>
                    <ul className="list-unstyled footer-links">
                        <li><Link to="/company/login">Partner Access</Link></li>
                        <li><Link to="/login">User Portal</Link></li>
                        <li><Link to="/">Terms of Service</Link></li>
                    </ul>
                </div>

                {/* Newsletter/Status */}
                <div className="col-lg-4 col-md-6">
                    <h6 className="text-white fw-bold mb-4 text-uppercase small" style={{ letterSpacing: '1px' }}>System Status</h6>
                    <div className="status-badge-footer d-flex align-items-center gap-2">
                        <div className="status-dot"></div>
                        <span className="small text-secondary">All systems operational in Colombia Central</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom border-top border-secondary-subtle mt-5 pt-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                <p className="text-secondary small mb-0">
                    &copy; 2026 GameNet Core. Built with <span className="text-pink">♥</span> for the gaming community.
                </p>
                <div className="d-flex gap-4">
                    <span className="text-secondary smaller">v1.0.4-beta</span>
                </div>
            </div>
        </div>
    </footer>
	
	</>	
	);

}