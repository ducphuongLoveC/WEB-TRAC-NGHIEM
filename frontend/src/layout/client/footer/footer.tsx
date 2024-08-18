import React from "react";
import { Link } from "react-router-dom";

import './footer.css';
const Footer: React.FC = () => {
  return (
      <footer id="footer" className="footer mt-5">
      <div className="container">
        <div className="copyright text-center">
          <p>
            © <span>Bản quyền từ</span> <strong className="px-1 sitename">Juno</strong> 
          </p>
        </div>
        <div className="social-links d-flex justify-content-center">
          <a href=""><i className="bi bi-twitter-x"></i></a>
          <a href="https://www.facebook.com/Juno.Tempest.203"><i className="bi bi-facebook"></i></a>
          <a href=""><i className="bi bi-instagram"></i></a>
          <a href=""><i className="bi bi-linkedin"></i></a>
        </div>
        <div className="credits">
          <p>Cảm ơn bạn đã ghé thăm trang web của chúng tôi, chúc bạn một ngày tràn ngập niềm vui nhaaaa!</p>
        </div>
      </div>
    </footer>   
  );
};

export default Footer;
