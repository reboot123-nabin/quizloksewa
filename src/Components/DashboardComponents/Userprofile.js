import React, { useEffect, useState } from 'react'

// import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Header from '../CommonComponents/Header';

import { ToastContainer, toast } from 'react-toastify';
import ProfileImage from './ProfileImage';
import UserNavigations from './UserNavigations';
const Userprofile = () => {
    let history = useHistory();

    if (localStorage.getItem('token') === null) {
        history.push('/');
    }

    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');

    const [id, setid] = useState('');
    const [email2, setEmail2] = useState('');
    const [first_name2, setFirst_name2] = useState('');
    const [last_name2, setLast_name2] = useState('');
    const [phone2, setPhone2] = useState('');


    const [profileImage, setProfileImage] = useState('');

    // const [email2, setEmail2] = useState('');
    // const [first_name2, setFirst_name2] = useState('');
    // const [last_name2, setLast_name2] = useState('');

    // const [profileImage2, setProfileImage2] = useState('');
    const UseProfile = async () => {
        try {
            const res = await fetch('api/v1/user/profile', {
                method: "GET",
                headers: {

                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                //credentials:"include"
            });
            const data = await res.json();

            setEmail(data.email);
            setFirst_name(data.first_name);
            setLast_name(data.last_name);
            setPhone(data.phone);
            setGender(data.gender);
            setProfileImage(data.profileImage);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            // history.push('/pr');
        }
    }


    //for user image upload

    const uploadImage = async () => {
        try {
            const res = await fetch('api/v1/user/profile/picture', {
                method: "GET",
                headers: {

                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                //credentials:"include"
            });
            const data = await res.json();


            setProfileImage(data.profileImage);


            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            // history.push('/pr');

        }
    }
    const ComponentDidMount = async () => {
        try {
            const res = await fetch('api/v1/user/profile', {
                method: "GET",
                headers: {
                    //Accept:"application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                //credentials:"include"
            });
            const data = await res.json();
            console.log(data);
            console.log(data.email);

            setid(data.profileImage);
            setFirst_name2(data.first_name);
            setLast_name2(data.last_name);
            setEmail2(data.email);
            setPhone2(data.phone);



            if (!res.status === 200) {

                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            // history.push('/login');

        }
    }



    const EditFunction = async () => {


        const res = await fetch('/api/v1/user/profile/update', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`


            },
            body: JSON.stringify({
                first_name, last_name, email, phone, gender, profileImage

            })
        });

        const data = await res.json();
        setProfileImage(data.profileImage);
        window.location.reload();
        if (!data) {
            toast.error("Something went wrong!");
        }
        else {
            toast.success('Your profile has been edited!')


        }
    }
    useEffect(() => {
        UseProfile();

        ComponentDidMount();
    }, [])

    return (
        <>
            <Header />
            <div className="container userprofile">
                <ToastContainer />
                <div className="main-body">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <ProfileImage first_name2={first_name2} last_name2={last_name2} id={id} email2={email2} phone2={phone2} />
                                </div>
                            </div>
                            <div className="card mt-2">
                                <div className="card-body">
                                    <UserNavigations />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    {/* <div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Email</h6>
								</div>
								<div className="col-sm-9 text-secondary">
								<input type="text" className="form-control" placeholder="first_name" name="" value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
								</div>
							</div> */}
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">FirstName</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="text" className="form-control" placeholder="first_name" name="" value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">LastName</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="text" className="form-control" placeholder="last_name" name="" value={last_name} onChange={(e) => setLast_name(e.target.value)} />
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-sm-3"></div>
                                        <div class="col-sm-9 text-secondary">

                                            <button type="button" class="btn btn-primary px-4" onClick={EditFunction} >EDIT PROFILE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="d-flex align-items-center mb-3">User Status</h5>
                                            <p>Yess quiz</p>
                                            <div class="progress mb-3" style={{ height: '5px' }}>
                                                <div class="progress-bar bg-primary" role="progressbar" style={{ width: '80%' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Userprofile
