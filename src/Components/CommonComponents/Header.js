import { React, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Notification from './Notification';
import { RewardPoints } from './RewardPoints';
import * as FaIcons from 'react-icons/fa'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import '../Utils/css/Notification.css'

const Header = () => {


    const history = useHistory()
    const [points, setPoints] = useState('')

    const handleLogout = () => {
        confirmAlert({
            title: 'Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => logout()
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    }

    const logout = () => {
        localStorage.removeItem('token');
        history.push('/');
    }


    useEffect(() => {
        const loadPoints = async () => {
            try {
                const res = await fetch('/api/v1/user/profile', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                const data = await res.json();
                setPoints(data.points)

                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                }

            } catch (err) {
                console.log(err);
                // history.push('/pr');
            }
        }
        loadPoints()
    }, [])


    return (
        <>
            <nav className="header-nav bg-light">
                <NavLink className='logo' to="/">
                    <img
                        src="/logo512.png"
                        width="30"
                        height="30"
                        // className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    <strong > Yess! Quiz </strong>
                </NavLink>
                <div style={{ flex: 3 }}></div>
                <label htmlFor="checkbox" id="icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </label>

                {
                    localStorage.getItem('token') ? (

                        <>
                            <Notification />
                            <RewardPoints points={points} />
                            <NavLink to="/profile">
                                <div className="icon_div mx-3">
                                    <FaIcons.FaUserAlt title="Go to Profile" className="m-auto" />
                                </div>
                            </NavLink>
                            <div onClick={handleLogout} className="icon_div">
                                <FaIcons.FaSignOutAlt title="Log out" className="m-auto" />
                            </div>
                        </>

                    ) : (

                        <ul className="header-ul pt-3">
                            <li>
                                <NavLink to="/" activeClassName="selected">HOME </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about-us">ABOUT</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact-us">CONTACT</NavLink>
                            </li>
                            <li>
                                <NavLink to="/login">LOGIN</NavLink>
                            </li>
                            <li>
                                <NavLink to="/registration">REGISTER</NavLink>
                            </li>
                        </ul >


                    )
                }

            </nav >
        </>
    )
}

export default Header;