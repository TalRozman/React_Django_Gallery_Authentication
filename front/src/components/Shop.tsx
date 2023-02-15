import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../shop.css";


const Navbar = () => {
    return (
        <div>
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
            <br /><br /><br /><br />
                <Outlet />
            </div>
        </div>
    );
};

export default Navbar;