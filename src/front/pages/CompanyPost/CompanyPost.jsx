import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, Calendar, Hash, MessageSquare,
  Layers, Globe, Share2, Info
} from "lucide-react";

function CompanyPost() {
  const navigate = useNavigate();
  const { companyPostId } = useParams();
  const [companyPost, setCompanyPost] = useState({});

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/post/admin/" + companyPostId);
        const data = await response.json();
        setCompanyPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, [companyPostId]);

  return (
    <div className="admin-page-container py-5 min-vh-100" style={{ backgroundColor: '#0a0b0d' }}>
      <div className="container">

        
        <div className="d-flex align-items-center gap-3 mb-5">
          <button
            onClick={() => navigate("/companypost")}
            className="btn btn-outline-info border-0 p-2 rounded-circle bg-dark-soft"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-white fw-bold mb-0 text-uppercase tracking-tighter">Broadcast Intelligence</h2>
            <p className="text-info small fw-bold mb-0 opacity-75 d-flex align-items-center gap-2">
              <Info size={14} /> ANALYZING POST DATA
            </p>
          </div>
        </div>

        <div className="row g-4">
          
          <div className="col-lg-8 mx-auto">
            <div className="admin-card-wrapper border border-secondary-subtle rounded-4 bg-dark-soft overflow-hidden shadow-lg">

              
              <div className="p-4 border-bottom border-secondary d-flex flex-wrap justify-content-between align-items-center gap-3 bg-black-25">
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2 bg-info-subtle rounded-3">
                    <Hash className="text-info" size={20} />
                  </div>
                  <div>
                    <span className="text-white-50 d-block x-small fw-bold">POST ID</span>
                    <span className="text-white fw-bold">#{companyPostId}</span>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2 bg-secondary-subtle rounded-3">
                    <Calendar className="text-secondary" size={20} />
                  </div>
                  <div>
                    <span className="text-white-50 d-block x-small fw-bold">PUBLISHED ON</span>
                    <span className="text-white fw-bold">{companyPost?.timestamp || "N/A"}</span>
                  </div>
                </div>
              </div>

            
              <div className="post-detail-media" style={{ maxHeight: '450px', overflow: 'hidden', backgroundColor: '#000' }}>
                {companyPost?.content?.image ? (
                  <img
                    src={companyPost.content.image}
                    alt="Broadcast Media"
                    className="w-100 h-100 object-fit-contain"
                  />
                ) : (
                  <div className="p-5 text-center text-secondary opacity-25">
                    <Globe size={100} strokeWidth={1} />
                    <p className="mt-3 fw-bold">NO MEDIA ATTACHED</p>
                  </div>
                )}
              </div>

              
              <div className="p-4 p-lg-5">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <span className="badge rounded-pill bg-info text-dark px-3 py-2 fw-bold text-uppercase">
                    <Layers size={14} className="me-1" /> {companyPost?.content?.type || "Post"}
                  </span>
                  <span className="badge rounded-pill border border-secondary text-secondary px-3 py-2 fw-bold text-uppercase">
                    Studio ID: {companyPost?.company?.id_company}
                  </span>
                </div>

                <div className="message-container bg-black-25 p-4 rounded-4 border border-secondary-subtle">
                  <div className="d-flex gap-3 text-white-50 mb-3">
                    <MessageSquare size={18} className="text-info" />
                    <span className="small fw-bold text-uppercase tracking-widest">Broadcast Message</span>
                  </div>
                  <p className="text-white fs-5 lh-lg mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                    {companyPost?.content?.text || "The broadcast contains no message content."}
                  </p>
                </div>
              </div>

             
              <div className="p-4 bg-dark border-top border-secondary d-flex justify-content-between align-items-center">
                <button onClick={() => navigate("/companypost")} className="btn btn-link text-info text-decoration-none fw-bold d-flex align-items-center gap-2">
                  <ArrowLeft size={16} /> BACK TO NEWSFEED
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyPost;