
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AdminNavbar from '../AdminNavbar';
import { useHistory } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export const TableQuiz = () => {

    const history = useHistory();
    const [title, setTitle] = useState([]);

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
                console.log(data._id);
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
        setViewQuiz();
    }, [history]);

    const deletequiz = async (id) => {

        confirmAlert({
            title: 'Delete quiz?',
            message: 'Are you sure you want to delete this quiz?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const res = await fetch("/api/v1/quiz/" + id, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": 'application/json',
                                'Accept': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                        });

                        if (res.status) {
                            toast.success("You have successfully deleted question!");
                              setTimeout(() => {
                                  window.location.reload(false)
                              }, 1500)
                        }
                        else {
                            toast.error("Delete failed");
                        }
                    }
                },
                {
                    label: 'Cancel',
                }
            ]
        });

    }
    return (
        <>
            <AdminNavbar />
            <ToastContainer />
            <div className="table-quiz">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th className="preview2">Quiz Title</th>
                            <th className="preview">ViewQuestion</th>
                            <th>Delete</th>
                            <th>Update</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            title.map((curElem) => {
                                const { _id, title } = curElem;
                                return (
                                    <>
                                        <tr>
                                            <td className="preview2">
                                                <div className="">{title}</div>
                                            </td>

                                            <td className="preview">
                                                <NavLink className="btn btn-success "
                                                    to={'/single-question/' + _id}>Preview</NavLink>
                                            </td>
                                            <td className="preview">
                                                <button className="btn btn-danger" onClick={() => deletequiz(_id)}>Delete</button>
                                            </td>
                                            <td className="preview">
                                                <NavLink className="btn btn-primary "
                                                    to={'/update-quiz/' + _id}>Update</NavLink>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>


        </>
    )
}

export default TableQuiz
