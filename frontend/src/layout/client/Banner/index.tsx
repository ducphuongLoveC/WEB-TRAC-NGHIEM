import React from "react";
import { Link } from "react-router-dom";
const Banner: React.FC = () => {
    return (
        <section id="hero" className="hero section">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                        <h1>Về trang web TN Online</h1>
                        <p> Đây là trang web về các đề thi trắc nghiệm đa dạng các <br></br> môn học dành cho nhiều học sinh từ lớp 1 đến 12</p>
                        <div className="d-flex">
                            <Link to="#about" className="btn-get-started">Thi thử ngay</Link>
                            <Link to="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox btn-watch-video d-flex align-items-center"></Link>
                        </div>
                    </div>
                    <div className="col-lg-6 order-1 order-lg-2 hero-img">
                        <img src="img/cuti.png" className="img-fluid animated" alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Banner;