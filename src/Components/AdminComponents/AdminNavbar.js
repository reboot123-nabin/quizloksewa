import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { NavLink, useHistory } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';
import '../Utils/css/style.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function AdminNavbar() {

    const history = useHistory()
    const logout = () => {
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
            <div className="sidenavigation">
                <div className="sidenavigation1">
                    <nav className="admin-nav" id="sidebar">
                        <div className="sidebar-header">
                            <NavLink to="/admin-dashboard" style={{textDecoration:"none", color:"blue"}}>
                                <h3>Yess Quiz</h3>
                            </NavLink>
                        </div>

                        <ul className="list-unstyled components">
                            {/* <p>Poject Overview</p>
                            <li >
                                <NavLink to="#homeSubmenu" data-toggle="collapse" aria-expanded="false" >Authentication</NavLink>
                            </li> */}
                            <li>
                                <NavLink to="/add-question">Add Question</NavLink>
                            </li>
{/* 
                            <li>
                                <NavLink to="#homeSubmenu" data-toggle="collapse" aria-expanded="false" >About</NavLink>
                            </li>
                            <li>
                                <NavLink to="#pageSubmenu" data-toggle="collapse" aria-expanded="false" >Pages</NavLink>
                                <ul className="collapse list-unstyled" id="pageSubmenu">
                                    <li>
                                        <NavLink to="#">Page 1</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="#">Page 2</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="#">Page 3</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink to="#">Portfolio</NavLink>
                            </li> */}
                            <li>
                                <NavLink to="#" onClick={handleLogout}>Sign out <BiLogIn /></NavLink>
                            </li>
                        </ul>

                    </nav>

                    <div id="content">

                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">

                                <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <i className="fas fa-align-justify"></i>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="nav navbar-nav ml-auto">
                                        {/* <li className="nav-item active">
                                            <NavLink className="nav-link" to="/admin-table">Overview</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/">Category</NavLink>
                                        </li> 
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/view-quiz">View Quiz</NavLink>
                                        </li> */}
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/table-quiz">Quizzes</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/create-quiz">Create quiz</NavLink>
                                        </li>
                                        <li>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                    </div>
                </div>
            </div>

        </>

    )
}

export default AdminNavbar;
