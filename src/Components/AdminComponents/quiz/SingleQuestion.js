
import React, { useEffect, useState } from 'react'

import { useParams } from "react-router-dom";
import AdminNavbar from '../AdminNavbar';

export const SingleQuestion = () => {
    // const[title,setTitle]=useState('');
    // const[difficulty,setDifficulty]=useState('');
    // const[category,setCategory]=useState('');
    // const[count,setCount]=useState('');
    const [singlequiz, setsinglequiz] = useState([]);


    const { id } = useParams();
    
    useEffect(() => {
        const setSingleQuestion = async () => {
            try {
                const res = await fetch('/api/v1/quiz/' + id, {
                    method: "GET",
                    headers: {
                        //Accept:"application/json",
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
    
                });
                const data = await res.json();
                setsinglequiz(data.questions);
                // setTitle(data.questions);
                // setDifficulty(data.difficulty);
                // setCategory(data.category);
                // setCount(data.count);
                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                }
    
            } catch (err) {
                console.log(err);
                //history.push('/login');
            }
        }
        setSingleQuestion()
    }, [id]);
    return (
        <>
            <AdminNavbar />

            <div className="single-quiz">
            </div>

            <div className="table-box">
                <div className="table-row table-head">
                    <div className="table-cell first-cell">
                        <p>Quiz Title</p>
                    </div>
                    <div className="table-cell">
                        <p>Options</p>
                    </div>
                    <div className="table-cell last-cell">
                        <p>Correct Answer</p>
                    </div>
                </div>
                {
                    singlequiz.map((curElem) => {
                        const { label, options } = curElem;
                        return (

                            <>
                                <div className="table-row">

                                    <div className="table-cell first-cell hover">
                                        <p>{label} </p>
                                    </div>
                                    <div className="table-cell second-cell hover">
                                        {options.map((opElem) => {
                                            const { value } = opElem;
                                            return (
                                                <>
                                                    <p>{value}</p>
                                                </>
                                            )
                                        })}
                                    </div>
                                    <div className="table-cell last-cell hover">
                                        {options.filter(x => x.is_correct).map((opElem) => {
                                            const { value } = opElem;
                                            return (
                                                <>
                                                    <p>{value}</p>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default SingleQuestion
