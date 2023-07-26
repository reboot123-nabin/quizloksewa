
import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import { useHistory, useParams } from "react-router-dom";
import Header from '../../CommonComponents/Header'

export const SaveQuiz = () => {


    const history = useHistory();
    // const [item, setItems] = useState([]);
    const [index, setIndex] = useState(0);
    const [quiz, setQuiz] = useState({});
    const [answer, setAnswer] = useState("");
    const [correct, setCorrect] = useState(0)
    const { id } = useParams();
    const [option, setOption] = useState([]);

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
        const setViewQuestion = async () => {
            try {
                const res = await fetch('/api/v1/quiz/' + id, {
                    method: "GET",
                    headers: {

                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await res.json();
                console.log("String", data);
                setQuiz(data);
                setOption(randomizeoption(data.questions[0].options));

                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                }

            } catch (err) {
                console.log(err);
                history.push('/login');

            }
        }
        setViewQuestion();
    }, [history, id]);



    const HandleNextQuestion = () => {

        const nextindex = index + 1;
        if (quiz.questions && nextindex in quiz.questions) {
            setIndex(nextindex);
            setOption(randomizeoption(quiz.questions[nextindex].options));
        }



        console.log(nextindex, "nextindex")
        setCorrect(0)
        setAnswer("")
    }

    const submitAnswer = async (a) => {
        // check for the answer
        let response = await fetch(`/api/v1/quiz/${id}/question/${quiz.questions[index]._id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                answer: a
            })
        });
        let data = await response.json();
        if (response.status === 201) {
            setCorrect(data.correct ? 1 : -1);
        }

        setTimeout(() => {
            HandleNextQuestion()
        }, 3e3)
    }
    const randomizeoption = (array) => {
        var currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const handleClickAnswer = a => {
        setAnswer(a)

        confirmAlert({
            title: 'LOck kiya jaye?',
            message: 'Are you sure mahodaya?' + answer,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => submitAnswer(a)
                }, {
                    label: 'No',
                    onClick: () => console.log('not no')
                }
            ]
        })
    }

    return (
        <>
        <Header />
            <div className="decorationquiz">
                <div className="container ">

                    <div className="que_text mt-5">
                        <h2 className="mt-2">{index + 1}:)</h2>
                        {
                            quiz.questions && quiz.questions[index].label
                        }

                        <div className="timer">
                            <div className="time_left_txt">Time Left</div>
                            <div className="timer_sec">15</div>
                        </div>

                    </div>
                    <div className="time_line"></div>
                    {/* <hr className="w-80 mx-auto " /> */}
                    <div className="outeranswer">
                        <div className="answerway">
                            <div className="row mt-5 ">

                                {
                                    quiz.questions && option.map((curElem, index) => {
                                        const { value, _id } = curElem;
                                        return (
                                            <div key={index} className="col-md-6 " >
                                                <button className={`buttonnew ${_id === answer ? (correct === 1 ? 'btn-success' : (correct === -1 ? 'btn-danger' : '')) : ''}`} onClick={e => handleClickAnswer(_id)}>{value}</button>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className="half-circle">
                                <h5>{index + 1} of 10 </h5>
                            </div>

                        </div>
                    </div>
                    {index + 1}
                </div>
            </div>
        </>
    )
}

export default SaveQuiz
