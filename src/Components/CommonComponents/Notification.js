import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Notification = () => {

    const [notification, setNotification] = useState([])

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const res = await fetch('/api/v1/notifications', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                const data = await res.json();


                setNotification(data.data)

                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                }

            } catch (err) {
                console.log(err);
                // history.push('/pr');
            }
        }
        loadNotifications()
    }, [])

    const handleNotificationCount = async (id) => {
        try {
            const res = await fetch(`/api/v1/notification/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            // history.push('/pr');
        }
    }

    return (
        <>
            <div className="notBtn mr-4" href="#">
                <>
                    {/*Number supports double digets and automaticly hides itself when there is nothing between divs */}
                    <div className={notification.filter(x => x.read !== true).length > 0 ? 'number' : 'd-none'}>{notification.filter(x => x.read !== true).length}</div>
                    <div className="icon_div">
                        <FaIcons.FaBell title="Notification" className="m-auto" />
                    </div>
                </>

                {
                    notification.filter(x => x.read !== true).length < 1 ? (
                        <div className="notification-box d-flex">
                            <div className="m-auto">
                                <FaIcons.FaChild className="stick mx-auto mb-2" />
                                <div className="cent">Looks Like you are all caught up!</div>
                            </div>
                        </div>
                    ) : (
                        <div className="notification-box">
                            <div className="display">
                                <div className="cont">
                                    {notification.map((curElem, index) => {
                                        const { title, message, createdAt, _id, read } = curElem;
                                        return (
                                            <div key={index} className={!read ? 'sec new m-2' : 'sec mb-2'}>
                                                <NavLink to="/available-quizes" onClick={() => handleNotificationCount(_id)}>
                                                    <div className="profCont">
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <FaIcons.FaBullhorn style={{ fontSize: "xx-large" }} />
                                                            </div>
                                                            <div className="col-md-10">
                                                                <div className="txt">
                                                                    <strong>{title}</strong>
                                                                    <p>{message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="txt sub">{createdAt}</div>
                                                        <hr />
                                                    </div>
                                                </NavLink>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )

}
export default Notification;