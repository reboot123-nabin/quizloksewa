import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar';
import { confirmAlert } from 'react-confirm-alert';
import { Scrollbars } from 'react-custom-scrollbars-2';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useEffect } from 'react';


const Userdetails = () => {

    const [text, setText] = useState("Pending");
    const [color, setColor] = useState("");

    const history = useHistory();

    const [Active, setActive] = useState('');
    const [topup, setTopup] = useState([]);
    const [total, setTotal] = useState('');
    const [recent_users, setRecentUsers] = useState([]);
    const [totalQuiz, setTotalQuiz] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [rewardUser, setRewardUser] = useState([])

    const setViewPage = async () => {
        try {
            const res = await fetch('/api/v1/user/active', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await res.json();
            console.log(data.data.activeUsers, "Active users")
            setActive(data.data.activeUsers)
            setTotal(data.data.total)
            console.log(data.data.recent_users)
            setRecentUsers(data.data.recent_users)


            // for(var i = 0; i< data.length; i++){
            // setLastLogin(data.data);

            // // 	console.log(data[i].last_login);
            // // }

            // console.log(data.data.last_login);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
        }
    }
    const setViewTopUp = async () => {
        try {
            const res = await fetch('/api/v1/list/topup', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await res.json();
            setTopup(data.data);
            setTotalQuiz(data.quiz_played)
            setTotalAmount(data.topupRequest)
            setRewardUser(data.reward_users)



            // for(var i = 0; i< data.length; i++){
            // setLastLogin(data.data);

            // // 	console.log(data[i].last_login);
            // // }

            // console.log(data.data.last_login);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        setViewPage();
        setViewTopUp();
    }, []);

    const buttonchange = () => {
        handletopup();
    }
    const handletopup = () => {
        confirmAlert({
            title: 'Topup request',
            message: 'Are you sure you want to topup?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setText("done")
                        setColor("green")
                    }
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    }
    return (
        <>
            <AdminNavbar />



            <div className="userstastics">
                <div className="cardBox">
                    <div className="card">
                        <div>
                            <div className="numbers">{total}</div>
                            <div className="cardName">Total registered user</div>
                        </div>
                        <div className="iconBox">
                            <i class="fa fa-user-plus"></i>
                        </div>
                    </div>

                    <div className="card">
                        <div>
                            <div className="numbers">{Active}</div>
                            <div className="cardName">Active user</div>
                        </div>
                        <div className="iconBox">
                            <i class="fa fa-eye"></i>
                        </div>
                    </div>

                    <div className="card">
                        <div>
                            <div className="numbers">{totalQuiz}</div>
                            <div className="cardName">Quiz Played</div>
                        </div>
                        <div className="iconBox">
                            <i class="fa fa-check-circle"></i>
                        </div>
                    </div>



                    <div className="card">
                        <div>
                            <div className="numbers">{totalAmount}</div>
                            <div className="cardName">Topup Request</div>
                        </div>
                        <div className="iconBox">
                            <i class="fa fa-arrow-up"></i>
                        </div>
                    </div>

                </div>
                {/* <details */}


                <div className="details">
                    <div className="recentOrders">
                        <div className="cardHeader">
                            <h4>Topup Request</h4>
                            <NavLink to="/viewuserdetails" className="detailBtN">View All</NavLink>
                        </div>
                        <table class="table table-hover table-condensed" data-toggle="table" id="resultTable">
                            <thead class="thead-inverse">
                                <tr>
                                    <th data-sortable="true">Name</th>
                                    <th>Amount</th>
                                    <th>Phone number</th>
                                    <th>Status</th>

                                </tr>
                            </thead>

                            <tbody>
                                {topup.map(topupReq => <tr key={topupReq._id}>
                                    <td>{topupReq?.user?.first_name} {topupReq?.user?.last_name}</td>
                                    <td>{topupReq.amount}</td>
                                    <td>{topupReq?.user?.phone}</td>

                                    <td><button className="status pending" onClick={buttonchange}
                                        style={{ background: color }}>{text}  {topupReq.status}</button></td>
                                </tr>)}
                            </tbody>

                        </table>

                    </div>

                    {/* recent customers */}
                    <div className="recentCustomers">
                        <div className="cardHeader">
                            <h5>Recent registered users</h5>
                        </div>
                        <table>
                            <tbody>
                                {recent_users?.map((curElem) => {
                                    return (
                                        <tr key={curElem._id}>
                                            <td width="60px">
                                                <div className="imgBx">
                                                    <img src="./images/black.jpg" alt="user" />
                                                </div>
                                            </td>
                                            <td>
                                                <h4><span>{curElem.first_name} {curElem.last_name}</span></h4>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>

                    <div className="recentCustomers">
                        <div className="cardHeader">
                            <h5>Most Reward Holder</h5>

                        </div>
                        <table>
                            <tbody>
                                {rewardUser?.map(user => (
                                    <tr key={user._id}>
                                        <td width="60px"><div className="imgBx">
                                            <img src="./images/black.jpg" alt="user" /></div></td>
                                        <td><h4>{user.first_name} {user.last_name}<br /><span className="text-success">{user.points}</span></h4></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Userdetails
