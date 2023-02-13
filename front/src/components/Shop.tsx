import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../shop.css";


const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div>
            {/* <div className="w3-sidebar w3-light-grey w3-bar-block" style={{width:"25%",height:'100%'}}>
                <h3 className="w3-bar-item">Menu</h3>
                <Link to={'./diary'}>diary</Link>
                <Link to={'./bread'}>bread</Link>
                <Link to={'./fruits'}>fruits</Link>
                <Link to={'./vegetables'}>vegetables</Link>
                <a href="#" className="w3-bar-item w3-button">Link 1</a>
                <a href="#" className="w3-bar-item w3-button">Link 2</a>
                <a href="#" className="w3-bar-item w3-button">Link 3</a>
            </div> */}
            <div className={`side-navbar open`}>
                <ul>
                    <li>
                        <Link to={'./diary'}>diary</Link>
                    </li>
                    <li>
                        <Link to={'./bread'}>bread</Link>
                    </li>
                    <li>
                        <Link to={'./fruits'}>fruits</Link>
                    </li>
                    <li>
                        <Link to={'./vegetables'}>vegetables</Link>
                    </li>
                </ul>
            </div>
            <div className="main">
                <Outlet />
            </div>
        </div>
    );
};

export default Navbar;