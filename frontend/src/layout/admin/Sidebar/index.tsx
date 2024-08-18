import React from 'react';
import { FaFlask, FaBullseye, FaClipboardList, FaChartPie, FaAsterisk } from 'react-icons/fa';
import { MdCheckCircle, MdCheck } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { routesAdmin } from '../../../config/routeConfig.ts';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="user-profile">
        <div className="display-avatar animated-avatar">
          <img className="profile-img img-lg rounded-circle" width={100} src="https://www.pngarts.com/files/5/User-Avatar-PNG-Free-Download.png" alt="profile" />
        </div>
        <div className="info-wrapper">
          <p className="user-name">Allen Clerk</p>
          
        </div>
      </div>
      <ul className="navigation-menu">
        <li className="nav-category-divider">MAIN</li>
        <li>
          <Link to="">
            <span className="link-title">Dashboard</span>
          </Link>
        </li>
        <li className="has-submenu">
          <Link to="">
            <span className="link-title">Đề thi</span>
            <i className='bx bx-notepad link-icon'></i>
          </Link>
          <ul className="navigation-submenu">
            <li>
              <Link to={`/admin/${routesAdmin.tests}`}>Quản lí đề thi</Link>
              <li>
              <Link to={`/admin/${routesAdmin.viewsTests}`}>Thống kê đề thi</Link>
            </li>
            </li>
          </ul>
        </li>
        <li className="has-submenu">
          <Link to="">
            <span className="link-title">UI Elements</span>
            <FaBullseye className="link-icon" />
          </Link>
          <ul className="navigation-submenu">
            <li>
              <Link to="">Buttons</Link>
            </li>
            <li>
              <Link to="">Tables</Link>
            </li>
            <li>
              <Link to="">Typography</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="">
            <span className="link-title">Forms</span>
            <FaClipboardList className="link-icon" />
          </Link>
        </li>
        <li>
          <Link to="">
            <span className="link-title">Charts</span>
            <FaChartPie className="link-icon" />
          </Link>
        </li>
        <li>
          <Link to="">
            <span className="link-title">Icons</span>
          </Link>
        </li>
        <li className="nav-category-divider">DOCS</li>
        <li>
          <Link to="">
            <span className="link-title">Documentation</span>
            <FaAsterisk className="link-icon" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
