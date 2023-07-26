import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../CommonComponents/Header';

const EditProfile = () => {

    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const history = useHistory();
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
            setEmail(data.email);

            setFirst_name(data.first_name);
            setLast_name(data.last_name);
            setPhone(data.phone);
            setGender(data.gender);




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

    

        if (!data) {
            toast.error("Something went wrong!");
        }
        else {
            toast.success('Your profile has been edited!')
            setTimeout(() => {
                history.push('/profile');
            }, 1500)

        }
    }
    useEffect(() => {

        ComponentDidMount();

    }, []);

    return (
        <>
        <Header />
            <div className="outline">
                <ToastContainer />
                <div className="box">
                    <div className="arrange">

                        <div className="file22">

                            <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} id="file" name="profileImage" />
                            <img className="profilecircle" style={{width:'50px', height:'50px'}} type="file" src={profileImage} alt="Edit Profile" />
                            <label className="labelprofile" style={{ width: "45px", height: "30px" }} for="file">edit</label>
                        </div>

                        <div className="below">
                            <div className="input-wrap">
                                <span className="detailsone">First_Name</span>

                                <input type="text" placeholder="first_name" name="" value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
                            </div>
                            <div className="input-wrap">
                                <span className="detailsone">Last_Name</span>
                                <input type="text" placeholder="last_name" name="" value={last_name} onChange={(e) => setLast_name(e.target.value)} />
                            </div>
                            {/* <input type="email" placeholder="email" name="" value={email} onChange={(e)=>setEmail(e.target.value)}/> */}
                            {/* <input type="text" placeholder="Phone" name="" value={phone} onChange={(e)=>setPhone(e.target.value)}/> */}
                            <div className="input-wrap">
                                <span className="detailsone">Gender</span>
                                <input type="text" name="gender" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                            </div>

                            <div className="input-wrap">
                                <span className="detailsone">UserType</span>
                                <input type="text" placeholder="usertype" name="" />
                            </div>
                        </div>



                        <button
                            name="done" onClick={EditFunction} id="done" >EDIT PROFILE</button>

                    </div>
                </div>
            </div>

        </>
    )
}

export default EditProfile
