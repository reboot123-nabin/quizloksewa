import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import { useHistory, useParams } from "react-router-dom";
import Header from '../../CommonComponents/Header'
import Resultassesment from './Resultassesment';

export const QuestionSession = () => {

    const [step, setStep] = useState(1)
    const history = useHistory();

    const [isActive, setIsActive] = useState(true);
    const [counter, setCounter] = useState(15);
    // const [item, setItems] = useState([]);
    const [index, setIndex] = useState(0);
    const [quiz, setQuiz] = useState({});
    const [modal, setModal] = useState([]);
    const [answer, setAnswer] = useState("");
    const [correct, setCorrect] = useState(0)
    const { id } = useParams();
    const [option, setOption] = useState([]);
    const [length, setLength] = useState([]);
    const [click, setClick] = useState([]);
    const [result, setResult] = useState([])
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
            // console.log(data);

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
                setQuiz(data);
                setLength(data.questions.length);

                let resumeIndex = 0;
                for (const q of data.questions) {
                    if (q.alreadyAnswered) {

                        resumeIndex++;
                    }
                }
                if (resumeIndex >= data.questions.length) {
                    setStep(2);
                } else if (resumeIndex > 0) {
                    confirmAlert({
                        title:"Quiz resuming!",
                        message: 'Looks like you have already played this quiz. Your quiz will resume from last question answered.',
                        buttons: [
                            {
                                'label': "Okay"
                            }
                        ]

                    })
                }
                setIndex(resumeIndex)
                setOption(randomizeoption(data.questions[resumeIndex].options));

                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                }

            } catch (err) {
                console.log(err);
            }
        }

        setViewQuestion();

    }, [history, id, length]);

    useEffect(() => {
        let intervalId;

        intervalId = setInterval(() => {
            setCounter(prevCounter => {
                if ((prevCounter - 1) <= 0) {
                    clearInterval(intervalId)

                    setTimeout(HandleNextQuestion, 1000);
                }
                return prevCounter - 1;
            });

        }, 1000)

        return () => clearInterval(intervalId);
    }, [])

    const HandleNextQuestion = () => {

        const nextindex = index + 1;
        if (quiz.questions && nextindex in quiz.questions) {
            setIndex(nextindex);
            setOption(randomizeoption(quiz.questions[nextindex].options));
        }
        setCorrect(0)
        setAnswer("")
        setCounter(15)
        setIsActive(isActive => !isActive)
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
            setClick(data)
            console.log(setCorrect)

        }

        setResult([...result, {
            question: quiz.questions[index],
            options: quiz.questions[index].options,
            value: quiz.questions[index].options.find(x => x._id === a),
            correct: data.correct
        }])
        if (length <= index + 1) {
            setStep(2)
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
        // console.log(setAnswer(a))
        confirmAlert({
            title: 'Are you sure you want to lock it?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => submitAnswer(a)
                }, {
                    label: 'No',
                }
            ]
        })

    }

    return (
        <>
            <Header />
            <div className="decorationquiz">
                <div className="container ">
                    {step === 1 && <>
                        <div className="que_text mt-5">

                            <h2 className="mt-2">{index + 1}:)</h2>
                            {
                                quiz.questions && quiz.questions[index].label
                            }

                            <div className="timer">
                                <div className="time_left_txt">Time Left</div>
                                <div className="timer_sec">{counter}</div>
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

                                                <div key={index} className="col-md-6 ">

                                                    <button
                                                        className={`buttonnew ${_id === answer ? (correct === 1 ? 'btn-success' : (correct === -1 ? 'btn-danger' : '')) : ''}`}
                                                        onClick={e => handleClickAnswer(_id)}>{value}</button>

                                                </div>
                                            )
                                        })
                                    }

                                </div>
                                <div className="half-circle">
                                    <h5>{index + 1} of {length}</h5>
                                </div>

                            </div>
                        </div>
                    </>}
                    {step === 2 &&
                        <>
                            <Resultassesment quiz_id={id} />
                        </>
                    }

                </div>

            </div>

        </>
    )
}

export default QuestionSession
