
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import Header from '../../CommonComponents/Header'

export const Categories = () => {
    const history = useHistory();
    // const[items,setItems]=useState({items:"",difficulty:"",category:"",count:""});
    const [title, setTitle] = useState([]);

    const createCategoryQuiz = async (_id) => {
        try {
            const response = await fetch(`/api/v1/category/${_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            const categoryQuiz = await response.json();
            const cat_quiz_id = categoryQuiz.quiz._id
            console.log(categoryQuiz.quiz._id, "categoryquiz");

            history.push(`/quiz/${cat_quiz_id}`)
        }
        catch {

        }
    }


    useEffect(() => {
        const setViewCategory = async () => {
            try {
                const res = await fetch('/api/v1/categories', {
                    method: "GET",
                    headers: {
                        //Accept:"application/json",
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    //credentials:"include"
                });
                const data = await res.json();

                setTitle(data);
                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                }
            } catch (err) {
                console.log(err);
                history.push('/login');
            }
        }
        setViewCategory();
    }, [history]);


    return (
        <>
            <Header />
            <div className="table-quiz">
                <div className="jumbotron">Choose a category to play quiz</div>
                <div className="d-flex">

                    {
                        title.map((curElem) => {
                            const { _id, name } = curElem;
                            return (
                                <>
                                    <button className="btn btn-large btn-success m-auto mb-5" onClick={() => createCategoryQuiz(_id)}>{name}</button>
                                    {/* <td className="preview"> <NavLink className="btn btn-primary " to={'/category-single/' + _id}>Preview</NavLink></td> */}
                                </>
                            )
                        })
                    }

                </div>



            </div>

        </>
    )
}

export default Categories