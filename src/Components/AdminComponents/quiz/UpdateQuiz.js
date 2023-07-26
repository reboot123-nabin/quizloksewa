import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory} from 'react-router-dom';
import AdminNavbar from '../AdminNavbar';


export const UpdateQuiz = () => {

    const history = useHistory();

    // const { id } = useParams();
    const [quiz, setQuiz] = useState({
        title: "", difficulty: "", count: "", category: ""
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
            const res = await fetch('/api/v1/quizzes', {
                method: "GET",
                headers: {
                   
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                
            });
            const data = await res.json();
            console.log(data);
            SetCategory(data);


            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            history.push('/login');

        }
    }
    useEffect(() => {
        viewcategory();



    });
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
                ...quiz
            })
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            toast.error("Invalid credentials!");
        }
        else {
            toast.success("You have successfully added question!");
            //   setTimeout(() => {
            //       // history.push('/l');
            //   }, 1500)
        }
    }

    return (
        <>
            <AdminNavbar />
            <div className="addquizbox">
                <ToastContainer />
                <form className="Createformquiz">
                    <h3 className="d-flex justify-content-center createheadline">Create Quiz from here</h3>
                    <hr className="w-50 mx-auto " />
                    <div className="row">

                        <div className="form-group">
                            <label for="exampleInputEmail1">Title</label>
                            <input type="text" className="form-control" name="title"
                                id="exampleInputEmail1" value={quiz.title} onChange={handleInputs}
                                aria-describedby="emailHelp" placeholder="Enter title" required="true" />

                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Difficulty</label>
                            <select className="form-select" name="difficulty" value={quiz.difficulty}
                                onChange={handleInputs} required="true" >
                                <option value="">Choose</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label for="exampleInputPassword1">Count</label>
                            <input type="text" className="form-control" name="count"
                                id="exampleInputPassword1" value={quiz.count}
                                onChange={handleInputs} placeholder="enter start" required="true" />
                        </div>



                        <div className="form-group">
                            <label for="exampleInputPassword1">Category </label>
                            {/* <select className="form-select" 
                        aria-label="Disabled select example" name="category" value={quiz.category}
                         onChange={handleInputs} required="true" >
                   
                        </select> */}
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



                    </div>
                    <button type="submit" className=" mt-3 btn btn-success btn_quiz"
                        onClick={addquiz} >Update Quiz</button>


                </form>

            </div>


        </>
    )
}

export default UpdateQuiz
