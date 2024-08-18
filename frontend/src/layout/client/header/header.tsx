import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { customSpace } from "../../../utils";
import './header.css';
import Cookies from 'js-cookie';
import Login from "../../../components/Login/index.tsx";
import Register from "../../../components/Register/index.tsx";


const Header: React.FC = () => {
    const [levels, setLevel] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);




    const token = JSON.parse(Cookies.get('token') || JSON.stringify(''));

    console.log(token);

    useEffect(() => {
        const fetchLevels = async () => {
            try {

                const response = await axios.get('http://localhost:4000/api/level');
                setLevel(response.data);
            } catch {
                throw new Error('loi');
            }
        }
        fetchLevels();

    }, []);
    return (
        <div>
            {showLogin && <Login isHandled={() => setShowLogin(false)} />}
            {showRegister && <Register isHandled={() => setShowRegister(false)} />}

            <header id="header" className="header d-flex align-items-center sticky-top mb-5">
                <div className="container-fluid container-xl position-relative d-flex align-items-center">
                    <Link to="/" className="logo d-flex align-items-center me-auto">

                        <h1 className="sitename">TN Online</h1>
                    </Link>

                    <nav id="navmenu" className="navmenu">
                        <ul>
                            <li><Link to="/" className="active">Trang chủ<br /></Link></li>
                            <li className="dropdown">
                                <Link to="#"><span>Cấp độ đề thi</span> <i className="bi bi-chevron-down toggle-dropdown"></i></Link>
                                <ul>
                                    {
                                        levels.map((level: any, i) => (
                                            <li key={i}><Link to={`/subject/${customSpace(level.name, '-')}?id_level=${level._id}`}>{level.name}</Link></li>
                                        ))
                                    }

                                </ul>
                            </li>

                            <li><Link to="#contact">Liên hệ</Link></li>
                            {
                                token && token.username && token.role == 'admin' && <li><Link to="/admin">Quản trị</Link></li>
                            }





                        </ul>
                        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                    </nav>

                    {
                        token && token.username ? <Link className="btn-getstarted" to="">{token.username}</Link> :
                            <div>

                                <button style={{ border: 'none', marginRight: '10px' }} onClick={() => setShowLogin(true)} className="btn-getstarted">Đăng nhập</button>
                                <span style={{ border: 'none' }} onClick={() => setShowRegister(true)}>Đăng ký</span >

                            </div>
                    }




                </div>
            </header>


        </div>



    )
}
export default Header;