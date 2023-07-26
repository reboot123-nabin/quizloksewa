import React, { useState } from 'react';
import Header from './Header';
import { confirmAlert } from 'react-confirm-alert';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const Cashout = () => {
    let history = useHistory();
    const [checked, setChecked] = useState()

    const[checked1,setchecked1]=useState()
    const toggleInputBox = (e) => {
        setChecked(e.target.checked)
    }

    const toggleInputBox1 = (e) => {
        setchecked1(e.target.checked)
    }
    const handleChange = () => setChecked(!checked);
    const [ruppe, setRupee] = useState([]);
    const [quiz, setQuiz] = useState(0);
    const SubmitReward = async () => {

        const res = await fetch('/api/v1/top-up/request', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                rupee: ruppe
            })
        });

        const data = await res.json();


        if (!data) {
            toast.error("Something went wrong!");
        }
        else {
            toast.success('Your request has been sent. Please wait for an admin to topup your number.')
            setTimeout(() => {
                history.push('/profile');
            }, 1500)

        }
    }

    const SubmitQuestion = async () => {

        const res = await fetch('/api/v1/quiz/purchase', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                count: quiz
            })
        });

        console.log(quiz, "Quiz data")
        const data = await res.json();


        if (!data) {
            toast.error("Something went wrong!");
        }
        else {
            toast.success('Your quiz has been purchased!')
            setTimeout(() => {
                history.push('/profile');
            }, 1500)

        }
    }

    const submitconfirm = () => {
        confirmAlert({
            title: 'Purchase Qn?',
            message: 'Are you sure you want to purchase question?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => SubmitReward()


                },
                {
                    label: 'No',
                }
            ]
        });
    }

    const submitconfirm2 = () => {
        confirmAlert({
            title: 'Purchase Qn?',
            message: 'Are you sure you want to purchase question?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => SubmitQuestion()
                },
                {
                    label: 'No',
                }
            ]
        });
    }
    return (
        <>
            <Header />
            <ToastContainer />
            {/* <input type="text" defaultValue={ruppe} onChange={(e) => setRupee(e.target.value)} ></input>
            <button className="btn btn-primary" onClick={SubmitReward}/>


            <input type="checkbox" onChange={toggleInputBox} /> Other
      <input type="text" hidden={!checked} /> */}


            <h5 className="text-center">From here on you can Purchase Your Questions</h5>
            <hr className="w-50 mx-auto" />
            <div className="container cashquestion">
                <div className="row">
                    <div className="col-md-6">

                        <button type="button" className="btn btn-primary mt-3 py-4" style={{ marginLeft: '25%' }} data-toggle="modal" data-target="#exampleModal">
                            Purchase Question
                        </button>


                        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">you can purchase questions from here!</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <input type="checkbox" aria-label="Checkbox for following text input" onChange={(e) => setQuiz(10)} />
                                                </div>

                                            </div>
                                            <p className="buyquestion" style={{ marginLeft: '5%' }}>10 questions</p>
                                        </div>

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <input type="checkbox" aria-label="Checkbox for following text input" onChange={(e) => setQuiz(15)} />
                                                </div>

                                            </div>
                                            <p className="buyquestion" style={{ marginLeft: '5%' }} >15 questions</p>
                                        </div>

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <input type="checkbox" aria-label="Checkbox for following text input" onChange={(e) => setQuiz(25)} />
                                                </div>

                                            </div>
                                            <p className="buyquestion" style={{ marginLeft: '5%' }}>25 questions</p>

                                        </div>

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <input type="checkbox" onChange={toggleInputBox} className="checkme" aria-label="Checkbox for following text input" onChange={(e) => setQuiz(25)}/>
                                                </div>

                                            </div>
                                            <p className="buyquestion" style={{ marginLeft: '5%' }}>Others</p>

                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">

                                                <input type="text" className="form-control" defaultValue={quiz} hidden={!checked} onChange={(e) => setQuiz(e.target.value)} ></input>
                                            </div>
                                        </div>



                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={submitconfirm2}>Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="col-md-6">

                        <button type="button" className="btn btn-primary mt-3 py-4" style={{ marginLeft: '10%' }} data-toggle="modal" data-target="#exampleModal1">
                            Top up Mobile
                        </button>

                        <div className="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">you can purchase questions from here!</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <input type="checkbox" onChange={(e) => setRupee(10)} aria-label="Checkbox for following text input" />
                                                </div>

                                            </div>
                                            <p className="buyquestion" style={{ marginLeft: '5%' }}>10 rupees</p>
                                        </div>

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <input type="checkbox" onChange={(e) => setRupee(50)} aria-label="Checkbox for following text input" />
                                                </div>

                                            </div>
                                            <p className="buyquestion" style={{ marginLeft: '5%' }}>50 rupees</p>
                                        </div>

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <input type="checkbox" onChange={(e) => setRupee(100)} aria-label="Checkbox for following text input" />
                                                </div>

                                            </div>
                                            <p className="buyquestion" style={{ marginLeft: '5%' }}>100 rupees</p>

                                        </div>

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <input type="checkbox" onChange={toggleInputBox} className="checkme" aria-label="Checkbox for following text input" />
                                                </div>

                                            </div>
                                            <p className="buyquestion" style={{ marginLeft: '5%' }}>Others</p>

                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label hidden={!checked}>Minimum should be Rs. 10</label>
                                                <input type="text" className="form-control" hidden={!checked} defaultValue={ruppe} onChange={(e) => setRupee(e.target.value)} ></input>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={submitconfirm}>Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        ...
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
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

export default Cashout
