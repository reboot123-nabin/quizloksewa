import React, { useEffect, useState } from 'react'
import { SocialIcon } from 'react-social-icons';
// import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Header from '../CommonComponents/Header';

const Profile = () => {
    // Fist of all check wheter an authentic user is accessing the page
    let history = useHistory();

    if (localStorage.getItem('token') === null) {
        history.push('/');
    }

    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');

    const [profileImage, setProfileImage] = useState('');

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


    useEffect(() => {
        UseProfile();
        uploadImage();
    }, []);
    return (
        <>
            <Header />
            {/* <ToastContainer /> */}
            <div className="background">

                <div className="row py-5 px-4">
                    <div className="col-md-5 mx-auto">

                        <div className="bg-white shadow rounded overflow-hidden">
                            <div className="px-4 pt-0 pb-5 cover">
                                <div className="media align-items-start profile-head">
                                    <div className="profile mr-3">
                                        <img src={profileImage} alt="User Profile" width="180" className="rounded mb-2 img-thumbnail" />
                                    </div>

                                    <div className="media-body mb-5 text-white">

                                        <div className="details">
                                            <h4 className="mt-0 mb-0">{email}</h4>

                                            {/* <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2"></i>New York</p> */}
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="bg-light p-4 d-flex justify-content text-center port profileedit">
                                <h2 >User Portfolio</h2>
                                <div className="px-4 d-flex">
                                    <a href={"/editprofile"} className="btn btn-success mt-2 profileinfo ">Edit profile</a>
                                </div>
                            </div>

                            <div className="px-4 py-3">
                                <div className="right">
                                    <div className="info">
                                        <h3>INFORMATION</h3>
                                        <div className="info_data">
                                            <div className="data">
                                                <h4>FirstName</h4>
                                                <h5>{first_name}</h5>
                                            </div>
                                            <div className="data">
                                                <h4>LastName</h4>
                                                <h5>{last_name}</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="projects">

                                        <div className="projects_data">
                                            <div className="data">
                                                <h4>Phone</h4>
                                                <p>{phone}</p>
                                            </div>
                                            <div className="data">
                                                <h4>Gender</h4>
                                                <h5>{gender}</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="projects">
                                        <h3>Profession</h3>
                                        <div className="projects_data">
                                            <div className="data">
                                                <h4>UserType</h4>
                                               
                                            </div>
                                           
                                        </div>
                                    </div>

                                    <div className="social_media">
                                        <ul>
                                            <li><SocialIcon url="https://google.com/jaketrent" /></li>
                                            <li><SocialIcon url="https://facebook.com/jaketrent" /></li>
                                            <li><SocialIcon url="https://twitter.com/jaketrent" /></li>
                                        </ul>
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

export default Profile
