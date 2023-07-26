import React from 'react'
import { NavLink } from 'react-router-dom';


const Footer = () => {

    return (
        <div>
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h6>About</h6>
                            <p className="text-justify">
                                <strong>Yess! Quiz</strong> <i>Earning While Learning </i> is an initiative to
                                help the upcoming students with the quiz. <strong>Yess! Quiz</strong> focuses on
                                providing the most efficient quiz contest and practice as the users want to
                                enjoy quiz. We will help students preparing for PSC, IOT, IOM and so on.
                            </p>
                        </div>
                        <div className="col-xs-6 col-md-3">
                            <h6>Categories</h6>
                            <ul className="footer-links">
                                <li>
                                    <NavLink to="/gk-quiz">General Knowledge</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/psc-quiz"> PSC Quiz </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/iot-quiz">IOT Quiz</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/iom-quiz">IOM Quiz</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xs-6 col-md-3">
                            <h6>Quick Links</h6>
                            <ul className="footer-links">
                                <li>
                                    <NavLink to="/about-us">About Us</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact-us">Contact Us</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/privacy-policy">Privacy Policy</NavLink>gitb
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <p className="copyright-text">
                                Copyright © 2017 All Rights Reserved by
                                <NavLink to="/">Yess! Quiz</NavLink>.
                            </p>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <ul className="social-icons">
                                <li>
                                    <NavLink className="facebook" to="www.facebook.com/YessQuiz">
                                        <i className="fa fa-facebook" />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="twitter" to="www.twitter.com">
                                        <i className="fa fa-twitter" />
                                    </NavLink>
                                </li>
                           </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer;