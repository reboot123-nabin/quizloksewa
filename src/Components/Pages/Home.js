import React from 'react';
import Header from '../CommonComponents/Header';
import Footer from '../CommonComponents/Footer';

function Home() {
    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-sm-7">
                        <img src="./images/home1.png" alt="Home Quiz" className="img-fluid mt-4" width="100%" />
                    </div>
                    <div className="col-sm-5 m-auto">
                        <h2 className="text-center text-primary mt-5">Play and Win!</h2>
                        <h6 className="text-center text-success" >We Never Lose. We Either Win Or Learn.</h6>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Home
