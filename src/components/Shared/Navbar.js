import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div>
            <div className="navbar bg-base-100 shadow-lg lg:md:px-12">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>Paid Total:</li>
                            <li><button className="btn btn-primary" onClick={() => logout()}>Logout</button></li>
                        </ul>
                    </div>
                    <h2 className="font-semibold normal-case text-2xl">Power Hack</h2>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Paid Total: </a></li>       
                        <li><button className="btn btn-primary" onClick={() => logout()}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;