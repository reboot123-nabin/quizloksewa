import React from 'react'
import { Navbar, Nav, Container, NavLink } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import Notification from './Notification';
import '../Utils/Notification.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useHistory } from 'react-router';

const UserNavbar = () => {

    const history = useHistory()
    const logout = ()=>{
        localStorage.removeItem('token');
        history.push('/')
    }
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

    return (
        <>
      
            <Navbar bg="light" expand="lg">

                <Container>
                    <NavLink to="/profile">
                        <Navbar.Brand href="#home">
                            <img
                                src="/logo512.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav style={{ position: "absolute", right: "7.5%" }}>
                            <Notification />
                            <div onClick={handleLogout} className="icon_div">
                                <FaIcons.FaSignOutAlt title="Log out" className="m-auto" />
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default UserNavbar;