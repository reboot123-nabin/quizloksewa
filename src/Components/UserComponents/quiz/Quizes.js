import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import Header from '../../CommonComponents/Header';

export const Quizes = () => {

    const history = useHistory()
    const [title, setTitle] = useState([]);

    //Check if logged in
    if (!localStorage.getItem('token')) history.push('/login')

    useEffect(() => {
        const setViewQuiz = async () => {
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

                setTitle(data);
                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                }

            } catch (err) {
                console.log(err);
            }
        }
        setViewQuiz();
    }, []);
    return (
        <>

            <Header />
            <div className="table-quiz">
                <table className="table">

                    <thead className="thead-dark">
                        <tr>
                            <th className="preview2">Quiz</th>
                            <th>status</th>
                            <th className="preview">ViewQuiz</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            title.map((curElem, index) => {
                                const { title, _id, attempts, completed } = curElem;
                                return (
                                    <tr key={index}>
                                        <td className="preview2">  <div className="card cardt">{title}</div>  </td>
                                       
                                        <td >
                                            {(completed === true) ? 'completed' : (attempts.length > 0) ? 'ongoing' : (attempts.length == 0)?'new':'Invalid'}
                                        </td>

                                        <td className="preview">
                                            <NavLink className="btn btn-primary " to={`/quiz/${_id}`}>Play Quiz</NavLink>
                                        </td>

                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Quizes
