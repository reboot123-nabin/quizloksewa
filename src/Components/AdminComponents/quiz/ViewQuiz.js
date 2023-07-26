
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';


import AdminNavbar from '../AdminNavbar';

export const ViewQuiz = () => {

    const history = useHistory();

    const [items, setItems] = useState([]);
    const [title, setTitle] = useState('');
    const [difficulty, setdifficulty] = useState('');
    const [category, setcategory] = useState('');
    const [count, setcount] = useState('');

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


            setTitle(data.title);
            console.log(data.title);
            setdifficulty(data.difficulty);
            console.log(data.difficulty);
            setcategory(data.category);
            setcount(data.count);


            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            history.push('/login');

        }
    }


    const setViewPage = async () => {
        try {
            const res = await fetch('/api/v1/questions', {
                method: "GET",
                headers: {

                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },

            });
            const data = await res.json();
            console.log(data);
            setItems(data.data);

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
        setViewPage();
        setViewQuiz();

    });


    return (
        <>
            <AdminNavbar />
            <div className="container viewone">
                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <div className="row mt-5 gx-3">

                            <div className="col-md-12 col-lg-6 col-11 mx-auto mt-lg-0 mt-md-5">
                                <div className="right_side p-3 shadow bg-white">

                                    <div className="price_indiv d-flex justify-content-between">
                                        <p>Title</p>
                                        <p><span id="product_total_amt">{title}</span></p>
                                    </div>
                                    <div className="price_indiv d-flex justify-content-between">
                                        <p>Start</p>
                                        <p><span id="shipping_charge"></span></p>
                                    </div>
                                    <div className="price_indiv d-flex justify-content-between">
                                        <p>End</p>
                                        <p><span id="shipping_charge">{count}</span></p>
                                    </div>
                                    <div className="price_indiv d-flex justify-content-between">
                                        <p>Difficulty</p>
                                        <p><span id="shipping_charge">{difficulty}</span></p>
                                    </div>
                                    <div className="price_indiv d-flex justify-content-between">
                                        <p>Category</p>
                                        <p><span id="shipping_charge">{category}</span></p>
                                    </div>

                                </div>

                                <div className="discount_code mt-3 shadow">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5>Assigned question</h5>
                                            <label className="form-control">Question</label>


                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div className="col-md-12 col-lg-6 col-11 mx-auto main_cart mb-lg-0 mb-5 shadow">
                                <div className="card">
                                    <h5>Question List</h5>
                                    <label className="form-control">Question</label>



                                    <div className="col-md-7 col-11 mx-auto ">

                                        <table class="table addadmintable">

                                            <thead class="thead-dark">
                                                <tr>
                                                    <th>Question</th>
                                                    <th>Category</th>

                                                </tr>
                                            </thead>
                                            {
                                                items.map((curElem) => {
                                                    const { label } = curElem;
                                                    return (
                                                        <>


                                                            <tbody>
                                                                <tr>


                                                                    <td>  {label}</td>
                                                                    <td><button type="submit">Submit</button></td>
                                                                </tr>

                                                            </tbody>



                                                        </>


                                                    )
                                                })
                                            }
                                        </table>

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

export default ViewQuiz
