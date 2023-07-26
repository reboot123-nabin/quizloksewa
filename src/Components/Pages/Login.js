import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useHistory } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import Header from '../CommonComponents/Header';


const Login = () => {
    const history = useHistory();
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/v1/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            })
        });


        const data = await res.json();
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Email address is invalid')
        }
        if (res.status === 422 || !data) {
            toast.error("Invalid credentials!");
        }
        else {
            toast.success("You have successfully login!");
            localStorage.setItem('token', data.token)

            if (data.user.userType === "admin") {
                setTimeout(() => {
                    history.push('/admin-dashboard');
                }, 1500)
            } else {
                setTimeout(() => {
                    history.push('/profile');
                }, 1500)
            }
        }
    }

    return (
        <>
            <Header />

            
            <section>
                <ToastContainer className="mt-5" />
                <div className="imgBx">
                    <img src="./images/mylogin.jpg" alt="Login Page" />
                </div> {/* End of imgBx */}
                <div className="contentBx">
                    <div className="formBx">
                        <h2>Login</h2>
                        <form onSubmit={submitLogin}>
                            <div className="inputBx">
                                <span>Email/Mobile Number</span>
                                <input type="text" name="email" placeholder="Email or mobile number" required defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>{/* End of Email/Number */}
                            <div className="inputBx">
                                <span>Password</span>
                                <input type="password" name="password" placeholder="••••••••" required defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>{/**End of Password */}
                            <div className="remember text-center my-3">
                                <NavLink to="/reset-password">Forgot password?</NavLink>
                            </div>{/**End of Forgot Password */}

                            <div className="inputBx">
                                <input type="submit" value="Sign in" />
                            </div>{/**End of Login button */}
                        </form>

                        <div className="text-center inputBx pt-3">
                            <small>Don't have an account? <strong><NavLink to="registration">Sign Up</NavLink></strong></small>
                        </div>{/**Ebd if Signup */}

                        <h3 className="text-center">Login with:</h3>
                        <ul className="sci text-center">
                            <li><SocialIcon url="https://google.com/jaketrent" /></li>
                            <li><SocialIcon url="https://facebook.com/jaketrent" /></li>
                            <li><SocialIcon url="https://twitter.com/jaketrent" /></li>
                        </ul>
                    </div>
                </div>
            </section>
     
        </>
    )
}

export default Login
