import React from 'react'
import { useState } from 'react';
import AdminNavbar from '../AdminNavbar'
import { ToastContainer, toast } from 'react-toastify';
export const AddQuestion = () => {

    const [errorMessage, setErrorMessage] = useState([]);
    const [error, setError] = useState({});

    const [question, setQuestion] = useState({
        label: "", category: "", difficulty: "Medium"
    });
    const [option1, setOption1] = useState({
        value: '', is_correct: 0
    });
    const [option2, setOption2] = useState({
        value: '', is_correct: 0
    });
    const [option3, setOption3] = useState({
        value: '', is_correct: 0
    });
    const [option4, setOption4] = useState({
        value: '', is_correct: 0
    });


    const handleTick = () => {

    }

    const handleInputs = (e) => {
        setQuestion({
            ...question,
            [e.target.name]: e.target.value
        })
    }

    const addquestion = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/v1/question", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...question,
                options: [option1, option2, option3, option4]
            })
        });
        const data = await res.json();

        if (res.status === 422 || !data) {
            toast.error("Invalid credentials!");
            const messages = [];
            setError(data.errors);
            console.log({ e: data.errors })
            for (let k in data.errors) {
                messages.push(data.errors[k])
                console.log(data.errors[k]);
            }
            setErrorMessage(messages)

        }

        else {
            toast.success("You have successfully added question!");
            setTimeout(() => {
                window.location.reload(false)
            }, 1500)
        }
    }
    return (
        <>
            <AdminNavbar />
            <div className="question_area">
                <ToastContainer />

                <h3 className="d-flex justify-content-center addtitlequestion">Add your question here</h3>
                <hr className="w-50 mx-auto " />

                <form className="add_quiz">

                    <div className="container">
                        <div className="row">
                            <div className="form-group ">
                                <label for="exampleInputEmail1">Title</label>
                                <input type="text" className="form-control " id="exampleInputEmail1" name="label" aria-describedby="emailHelp"
                                    placeholder="Enter title" value={question.label} onChange={handleInputs} required="true" />
                                <div className="errorMessage text-danger">
                                    {error?.label}
                                </div>
                            </div>

                            <div className="form-group ">
                                <label for="exampleInputPassword1">Category</label>
                                <input type="text" className="form-control " id="exampleInputEmail1" name="category"
                                    aria-describedby="emailHelp" placeholder="Enter title" value={question.category} onChange={handleInputs} required="true" />
                                <div className="errorMessage text-danger">
                                    {error?.category}
                                </div>
                            </div>

                            <div className="form-group">
                                <h6>Tick mark the correct option:</h6>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label for="exampleInputPassword1">Option 1</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="exampleInputEmail1"
                                                aria-describedby="emailHelp" name="option1" placeholder="Enter title"
                                                value={option1.value}
                                                onChange={e => setOption1({ ...option1, value: e.target.value })} required="true" />
                                            <div className="input-group-append">
                                                <div className="input-group-text p-0">
                                                    <label className="px-2 py-2 mb-0" style={{cursor : 'pointer'}}>
                                                        <input style={{width : 20}} type="radio" name="options" value="1" id="flexCheckChecked"
                                                            onChange={e => setOption1({ ...option1, is_correct: e.target.checked })} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <label for="exampleInputPassword1">Option 2</label>

                                        <div className="input-group">
                                            <input type="text" className="form-control" id="exampleInputEmail1"
                                                aria-describedby="emailHelp" name="option2" placeholder="Enter title"
                                                value={option2.value}
                                                onChange={e => setOption2({ ...option2, value: e.target.value })} required="true" />
                                            <div className="input-group-append">
                                                <div className="input-group-text p-0">
                                                    <label className="px-2 py-2 mb-0" style={{cursor : 'pointer'}}>
                                                        <input style={{width : 20}} type="radio" name="options" value="1" id="flexCheckChecked2"
                                                            onChange={e => setOption2({ ...option2, is_correct: e.target.checked })} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-6">

                                        <label for="exampleInputPassword1">Option 3</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                name="option3" placeholder="Enter title" value={option3.value}
                                                onChange={e => setOption3({ ...option3, value: e.target.value })} required="true" />
                                            <div className="input-group-append">
                                                <div className="input-group-text p-0">
                                                    <label className="px-2 py-2 mb-0" style={{cursor : 'pointer'}}>
                                                        <input style={{width : 20}} type="radio" name="options" value="" id="flexCheckChecked3"
                                                            onChange={e => setOption3({ ...option3, is_correct: e.target.checked })} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <label for="exampleInputPassword1">Option 4</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                name="option4" placeholder="Enter title" value={option4.value}
                                                onChange={e => setOption4({ ...option4, value: e.target.value })} required="true" />
                                            <div className="input-group-append">
                                                <div className="input-group-text p-0">
                                                    <label className="px-2 py-2 mb-0" style={{cursor : 'pointer'}}>
                                                        <input style={{width : 20}} type="radio" name="options" value="" id="flexCheckChecked4"
                                                            onChange={e => setOption4({ ...option4, is_correct: e.target.checked })} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="errorMessage text-danger">
                                    {error?.options}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className=" mt-3 btn btn-success btn_quiz"
                        onClick={addquestion} >Add Question</button>
                </form>



            </div>
        </>
    )
}

export default AddQuestion;