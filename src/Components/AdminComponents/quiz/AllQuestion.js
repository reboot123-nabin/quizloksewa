import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar';
const AllQuestion = () => {
    const [items, setItems] = useState([]);
    // const [label, setlabel] = useState('');
    // const [category, setcategory] = useState('');
    // const [options,setoption]=useState('');
    // const show=false;
    const setViewPage = async () => {
        try {
            const res = await fetch('/api/v1/questions', {
                method: "GET",
                headers: {
                    //Accept:"application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                //credentials:"include"
            });
            const data = await res.json();
            console.log(data);
            setItems(data.data);
            // setlabel(data.data.label);

            //    setcategory(data.data.category);
            // setoption(data.data.options);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            //history.push('/login');

        }
    }
    useEffect(() => {
        setViewPage();



    }, []);



    return (
        <>

            <AdminNavbar />
            <div className="container questionoutside">
                <h1 className="titlequ">All Questions With Answers</h1>
                <div className="row">
                    <table className="table">

                        <thead className="thead-dark">
                            <tr>
                                <th>Question</th>
                                <th>Category</th>
                                <th>Answer(Options)</th>
                            </tr>
                        </thead>
                        {
                            items.map((curElem) => {
                                const { options, label, category } = curElem;
                                return (
                                    <>


                                        <tbody>
                                            <tr>
                                                <td>  {label}</td>
                                                <td> {category}</td>
                                                <td>  {

                                                    options.map((opElem) => {
                                                        const { value, is_correct } = opElem;
                                                        return (
                                                            <>
                                                                {value},
                                                                {is_correct}
                                                            </>
                                                        )
                                                    })}</td>
                                            </tr>

                                        </tbody>



                                    </>


                                )
                            })
                        }
                    </table>

                </div>


            </div>
        </>
    )
}


export default AllQuestion