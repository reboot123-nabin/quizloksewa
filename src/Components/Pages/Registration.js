import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Countries } from '../Utils/country-code';
import { NavLink } from 'react-router-dom';
import Header from '../CommonComponents/Header';

const Registration = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        first_name: "", last_name: "", email: "", verification_code: "", country_code: "+977", phone: "", gender: "", password: "", confirmpassword: ""
    });
    
    const [step, setStep] = useState(1)

    const verifyNumberForm = (e) => {
        if (user.phone === "") {
            return toast.error("Please enter your number.")
        }
        fetch("/api/v1/code/SMS", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                phone: user.country_code + user.phone
            })
        }).then(r => r.json()).then((response) => {
            if (response.status === 'SUCCESS') {
                setStep(2)
            } else {
                toast.error(response.message)
            }
        }).catch(err => toast.error(err.message))
    }

    const verifyNumber = (e) => {
        if (user.verification_code.length !== 4) {
            setUser({ ...user, verification_code: "" })
            return toast.error("Code must a 4-digit number.")
        }
        fetch("/api/v1/code/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                phone: user.country_code + user.phone,
                code: user.verification_code
            })
        }).then(r => r.json()).then((response) => {
            if (response.status === 'SUCCESS') {
                setStep(3)
            } else {
                toast.error(response.message)
            }
        }).catch(err => toast.error(err.message))
    }

    const goToNext = (e) => {
        if (user.first_name === "") {
            return toast.error("Please enter your first name.")
        }
        if (user.last_name === "") {
            return toast.error("Please enter your last name.")
        }
        setStep(4)
    }

    const goToRegister = (e) => {

    
        if (user.email === "") {
            return toast.error("Please enter a valid email address.")
        }
        else if(!/\S+@\S+\.\S+/.test(user.email)){
            toast.error("invalid email")
        }
        if (user.password.length < 8) {
            return toast.error("Password must be 8 characters long.")
        }
        if (user.password !== user.confirmpassword) {
            return toast.error("Your passwords do not match.")
        }
        PostData(e)
    }

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();
        const res = await fetch("api/v1/register", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...user, phone: user.country_code + user.phone
            })
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            toast.error("Invalid credentials!");
        }
        else {
            toast.success("You have successfully registered!");
            setTimeout(() => {
                history.push('/login');
            }, 1500)
        }
    }

    return (
        <>
            <Header />
            <section>
                <ToastContainer className="mt-5" />
                <div className="imgBx">
                    <img src="./images/mylogin.jpg" alt="hamrologin" />
                </div>
                <div className="contentBx">
                    <div className="formBx">
                        <h2>Register</h2>
                        <form onSubmit={e => e.preventDefault()}>
                            {step === 1 && <>
                                <div className="inputBx">
                                    <span>Coutry code:</span>
                                    <select onChange={handleInputs} name="country_code" className="form-control" style={{ height: "43px", borderRadius: "20px" }}>
                                        {Countries.map(Country => {
                                            return <option value={Country.dial_code} defaultValue={Country.selected} selected={Country.selected}> {Country.code}{Country.dial_code} </option>
                                        })}
                                    </select>
                                </div>
                                <div className="inputBx">
                                    <span>Mobile number:</span>
                                    <input type="number" name="phone" autoFocus={true} placeholder="9#########" onChange={handleInputs} />
                                </div>

                                <div className="inputBx">
                                    <input className="my-3" type="submit" value="Next" onClick={verifyNumberForm} />
                                </div>
                            </>}

                            {step === 2 && <>
                                <small>We sent you a verification code at <strong>{user.country_code + user.phone}</strong>, please enter the code.</small>
                                <div className="inputBx mt-3">
                                    <input type="text" value={user.verification_code} autoFocus={true} name="verification_code" placeholder="Verification code" onChange={handleInputs} />
                                </div>

                                <div className="inputBx">
                                    <input className="my-3" type="submit" value="Verify" onClick={verifyNumber} />
                                </div>
                            </>}

                            {step === 3 && <>
                                <div className="inputBx">
                                    <span>First Name:</span>
                                    <input type="text" autoFocus={true} name="first_name" placeholder="Your First Name" onChange={handleInputs} />
                                </div>
                                <div className="inputBx">
                                    <span>Last Name:</span>
                                    <input type="text" name="last_name" placeholder="Your Last Name" onChange={handleInputs} />
                                </div>

                                <div className="inputBx">
                                    <input type="submit" className="my-3" value="Next" onClick={goToNext} />
                                </div>
                            </>}

                            {step === 4 && <>
                                <div className="inputBx">
                                    <span>Email:</span>
                                    <input type="email" name="email" autoFocus={true} placeholder="example@example.com" onChange={handleInputs} />
                                </div>
                                <div className="inputBx">
                                    <span>Password:</span>
                                    <input type="password" name="password" placeholder="••••••••" onChange={handleInputs} />
                                </div>
                                <div className="inputBx">
                                    <span>Confirm Password:</span>
                                    <input name="confirmpassword" type="password" placeholder="••••••••" onChange={handleInputs} />
                                </div>

                                <div className="inputBx">
                                    <input type="submit" value="Register" className="my-3" onClick={goToRegister} />
                                </div>
                            </>}

                            <div className="inputBx text-center">
                                <p>Already have an account? <NavLink to="/login">Sign In</NavLink></p>
                            </div>
                        </form>
                    </div>

                </div>


                {/* 
                <div className="Mycontainer">
                    <div className="title">Registration</div>
                    <p>It's Quick And Easy.</p><hr />
                    <form method="POST" action="">
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">First Name</span>
                                <input className="form-control" type="text" placeholder="Enter your firstname"
                                    name="first_name" id="first_name" autoComplete="off"
                                    value={user.first_name} onChange={handleInputs} required />
                            </div>
                            <div className="input-box">
                                <span className="details">Last Name</span>
                                <input className="form-control" type="text" placeholder="Enter your lastname"
                                    name="last_name" id="last_name" autoComplete="off"
                                    value={user.last_name} onChange={handleInputs} required />
                            </div>

                            <div className="input-box">
                                <span className="details">Email</span>
                                <input className="form-control" type="text" placeholder="Enter your email"
                                    name="email" id="username" autoComplete="off"
                                    value={user.email} onChange={handleInputs} required />
                            </div>


                            <div className="input-box">
                                <span className="details">Password</span>
                                <input className="form-control" type="password" placeholder="enter your password"
                                    name="password" id="password" autoComplete="off"
                                    value={user.password} onChange={handleInputs} />
                            </div>

                            <div className="input-box">
                                <span className="details">Confirm Password</span>
                                <input className="form-control" type="password" placeholder="enter your confirm password"
                                />
                            </div>
                        </div>
                        <div className="Registerbutton">
                            <button type="submit" onClick={PostData}> Create My Account </button>
                            <p className="mt-3"><small >Already have an account? <a href="login">Sign In</a> </small></p>
                        </div>
                    </form>
                </div> */}
            </section>
        </>

    )
}

export default Registration