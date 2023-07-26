import { Button, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';


import AdminNavbar from '../AdminNavbar';


export const CreateQuiz = () => {

    const [errorMessage, setErrorMessage] = useState([]);
    const [counter, setCounter] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [quiz, setQuiz] = useState({
        title: ``, count: 10, category: "Daily Quiz"
    });
    const [Category, SetCategory] = useState([]);


    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setQuiz({ ...quiz, [name]: value });
    }


    const viewcategory = async () => {
        try {
            const res = await fetch('/api/v1/categories', {
                method: "GET",
                headers: {

                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },

            });
            const data = await res.json();

            SetCategory(data);


            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }


        } catch (err) {
            console.log(err);
            //history.push('/login');

        }
    }


   // const createCategory = async (e) => {
    //     e.preventDefault();
    //     const res = await fetch("/api/v1/quiz", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         },
    //         body: JSON.stringify({
    //             ...quiz, title: `Daily Quiz #${counter}`
    //         })
    //     });

    //     const data = await res.json();
    //     // setCounter(counter + 1)

    //     if (res.status === 422 || !data) {
    //         toast.error("Invalid credentials!");
    //         const messages = []
    //         for (let k in data.errors) {
    //             messages.push(data.errors[k])
    //             console.log(data.errors[k]);
    //         }
    //         setErrorMessage(messages)
    //     }

    //     else {
    //         toast.success("You have successfully added quiz!");
    //         //   setTimeout(() => {
    //         //       // history.push('/l');
    //         //   }, 1500)
    //     }
    // }

    useEffect(async () => {
        try {
            const res = await fetch('/api/v1/quizzes', {
                method: "GET",
                headers: {

                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },

            });
            const data = await res.json();

            setCounter(data.length + 1)
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
        }

    }, []);

    useEffect(() => {
        viewcategory();
    }, []);

    const addquiz = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/v1/quiz", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                ...quiz, title: `Daily Quiz #${counter}`
            })
        });

        const data = await res.json();
        // setCounter(counter + 1)

        if (res.status === 422 || !data) {
            toast.error("Invalid credentials!");
            const messages = []
            for (let k in data.errors) {
                messages.push(data.errors[k])
                console.log(data.errors[k]);
            }
            setErrorMessage(messages)
        }

        else {
            toast.success("You have successfully added quiz!");
            //   setTimeout(() => {
            //       // history.push('/l');
            //   }, 1500)
        }
    }

    return (
        <>
            <AdminNavbar />
            <div className="addquizbox d-flex">
                <ToastContainer />
                <div className="row m-auto">
                    <div className="col-md-6 d-flex">
                        <button onClick={addquiz} className="btn btn-danger btn-large mx-auto">Create Daily Quiz</button>
                    </div>
                    <div className="col-md-6 d-flex">
                        {/* <button className="btn btn-warning btn-large mx-auto" onClick={handleShow}>Create Category Quiz</button> */}
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create Category Quiz</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Category </label>

                                <select className="form-select" name="category" value={quiz.category} onChange={handleInputs} required="true" >
                                    <option value="">Choose</option>
                                    {
                                        Category.map((curElem) => {
                                            const { name } = curElem;
                                            return (
                                                <>
                                                    <option value={name}>{name}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Count</label>
                                <input type="text" className="form-control" name="count"
                                    id="exampleInputPassword1" value={quiz.count}
                                    onChange={handleInputs} placeholder="enter start" required="true" />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default CreateQuiz
