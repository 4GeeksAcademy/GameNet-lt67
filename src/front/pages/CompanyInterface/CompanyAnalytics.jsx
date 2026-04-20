import React, { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import { BarChart3, MessageSquare, Heart, Share2, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CompanyAnalytics = () => {
    const { store } = useGlobalReducer();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            let companyId = store.company?.id || store.company?.id_company;

            
            if (!companyId) {
                try {
                    const localData = localStorage.getItem("company_data");
                    if (localData && localData !== "undefined") {
                        const parsed = JSON.parse(localData);
                        companyId = parsed?.id || parsed?.id_company;
                    }
                } catch (err) {
                    console.error("Error parsing local storage", err);
                }
            }

            if (!companyId) {
                console.log("No Company ID available yet.");
                return;
            }

            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const resp = await fetch(`${backendUrl}/api/company/analytics/${companyId}`);
                if (resp.ok) {
                    const data = await resp.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchStats();
    }, [store.company]);

    if (!store.auth_company) return <div className="analytics-wrapper text-center pt-5">Access Denied. Please log in.</div>;
    if (!store.company) return <div className="analytics-wrapper text-center pt-5">Loading Partner Profile...</div>;
    if (!stats) return <div className="analytics-wrapper text-center pt-5">Gathering Data...</div>;

    return (
        <div className="analytics-wrapper">
            <div className="container">
                <div className="mb-4">
                    <Link to="/company/dashboard" className="text-decoration-none text-muted small d-flex align-items-center gap-2 mb-3">
                        <ArrowLeft size={16} /> GO BACK
                    </Link>
                    <h1 className="gn-title text-uppercase">
                        <BarChart3 className="me-2 text-success" size={32} />
                        Analytics for <span className="text-success">PARTNERS</span>
                    </h1>
                </div>

                <div className="row g-4">
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="stat-card-gamenet">
                            <div className="gn-icon-box"><FileText /></div>
                            <div className="gn-label">Total Posts</div>
                            <div className="gn-value">{stats.total_posts}</div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="stat-card-gamenet">
                            <div className="gn-icon-box" style={{ color: '#ff4757', background: 'rgba(255, 71, 87, 0.1)' }}><Heart /></div>
                            <div className="gn-label">Total Likes</div>
                            <div className="gn-value">{stats.total_likes}</div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="stat-card-gamenet">
                            <div className="gn-icon-box" style={{ color: '#70a1ff', background: 'rgba(112, 161, 255, 0.1)' }}><MessageSquare /></div>
                            <div className="gn-label">Comments</div>
                            <div className="gn-value">{stats.total_comments}</div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="stat-card-gamenet">
                            <div className="gn-icon-box" style={{ color: '#eccc68', background: 'rgba(236, 204, 104, 0.1)' }}><Share2 /></div>
                            <div className="gn-label">Shares</div>
                            <div className="gn-value">{stats.total_shares}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyAnalytics;