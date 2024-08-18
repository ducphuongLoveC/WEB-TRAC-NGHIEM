import React from "react";
import { Link } from "react-router-dom";
import './Home.css';
import Banner from "../../layout/client/Banner/index.tsx";

const Home: React.FC = () => {
    
    return (
        <div>
            <Banner></Banner>
            <section id="portfolio" className="portfolio section">

                <div className="container section-title" data-aos="fade-up">
                    <h2>Danh mục đề thi</h2>
                    <p>Dưới đây là các môn thi và các đề theo từng cấp độ lớp học</p>
                </div>

                <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">

                    <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                        <div className="portfolio-content h-100">
                            <img src="img/toan.jpg" className="img-fluid" alt="" />
                            <div className="portfolio-info">
                                <h4>Toán</h4>
                                <p> Đề thi toán  </p>
                                <Link to="img/toan.jpg" title="App 1" data-gallery="portfolio-gallery-app" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></Link>
                                <Link to="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
                        <div className="portfolio-content h-100">
                            <img src="img/tienganh.jpg" className="img-fluid" alt="" />
                            <div className="portfolio-info">
                                <h4>Tiếng Anh</h4>
                                <p>Đề thi tiếng anh</p>
                                <Link to="img/tienganh.jpg" title="Product 1" data-gallery="portfolio-gallery-product" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></Link>
                                <Link to="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
                        <div className="portfolio-content h-100">
                            <img src="img/tiengviet.png" className="img-fluid" alt="" />
                            <div className="portfolio-info">
                                <h4>Tiếng Việt</h4>
                                <p>Đề thi tiếng việt</p>
                                <Link to="img/tiengviet.png" title="Product 1" data-gallery="portfolio-gallery-product" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></Link>
                                <Link to="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></Link>
                            </div>
                        </div>
                    </div>

                </div>


            </section>
        </div>

    )
}
export default Home;
