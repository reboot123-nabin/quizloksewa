import React, { useState, useEffect } from 'react';
import AdminNavbar from '../AdminNavbar';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useHistory } from "react-router-dom";
const Viewalluserdetails = () => {
    const history = useHistory();

    const [text, setText] = useState("Pending");
    const [color, setColor] = useState("");
    const [user, setUser] = useState([]);
    const [topup, setTopup] = useState([]);
    const setViewPage = async () => {
        try {
            const res = await fetch('/api/v1/users/all', {
                method: "GET",
                headers: {

                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },

            });
            const data = await res.json();
            console.log(data.data);
            setUser(data.data);

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
            console.log(data.data);
            setTopup(data.data);


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
    const [value, setValue] = useState();

    function onChange(e) {
        if (!e.target.validity.patternMismatch) {
            setValue(e.target.value);
        }
    }
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

    useEffect(() => {
        setViewPage();
        setViewTopUp();
    }, []);
    return (
        <>
            <AdminNavbar />

            <div className="viewuseralldetails">
                <div className="container viewuserdetails">

                    <div className="recentOrders">
                        <div className="cardHeader">
                            <h4>Topup Request</h4>

                        </div>
                       
                        {/* {
                            user.map((curElem) => {
                                const { first_name, last_name, email, phone } = curElem;
                                return (
                                    <>


                                        {first_name}
                                        {last_name}
                                        {email}
                                        {phone}



                                    </>


                                )
                            })
                        }

                        {
                            topup.map((opElem) => {
                                const { point } = opElem;
                                return (
                                    <>


                                        {point}




                                    </>


                                )
                            })
                        }
                       */}
                        <p class="scroll">
                            <table class="table table-hover table-condensed" data-toggle="table" id="resultTable">
                                <thead class="thead-inverse">
                                    <tr>
                                        <th data-sortable="true">Name</th>
                                        <th>Amount</th>
                                        <th>Status</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {topup.map(topupReq => <tr key={topupReq._id}>
                                        <td>{topupReq?.user?.first_name} {topupReq?.user?.last_name}</td>
                                        <td>{topupReq.amount}</td>
                                       
                                        <td><button className="status pending" onClick={buttonchange} 
                                style={{background:color}}>{text}  {topupReq.status}</button></td>
                                    </tr>)}
                                </tbody>

                            </table>

                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Viewalluserdetails
