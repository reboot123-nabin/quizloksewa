import React, { useEffect } from 'react'
import { useState } from 'react';


const Resultassesment = (props) => {

  const [assessment_data, setAssementData] = useState({})

  useEffect(async () => {
    const fetchAssessment = async () => {
      try {
        const res = await fetch(`/api/v1/quiz/${props.quiz_id}/result-assessment`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setAssementData(data.data)
        console.log(data.data)

        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }

      } catch (err) {
        console.log(err);

      }
    }
    fetchAssessment();
  }, [props.quiz_id]);


  return (
    <>
      <div className="background">

        <div className="row py-5 px-4">
          <div className="col-md-8 mx-auto">

            <div className="bg-white shadow rounded overflow-hidden">


              <div className="px-4 py-3">
                <div className="right">
                  <div className="info">
                    <h2 className="borderbottom">Result Assesment</h2>
                    <div className="info_data mt-5">
                      <div className="data">
                        <h5>Result</h5>
                        {assessment_data?.answers?.filter(a => a.correct)?.length / assessment_data?.quiz?.questions?.length * 100}%
                      </div>
                      <div className="data">
                        <h5>Total</h5>
                        {assessment_data?.answers?.filter(a => a.correct)?.length} of {assessment_data?.quiz?.questions?.length}
                      </div>
                    </div>
                  </div>


                  <div className="projects">
                    <h2 className="borderbottom">Check Answers</h2>
                    <table class="table table-hover table-condensed" data-toggle="table" id="resultTable">
                      <thead class="thead-inverse">
                        <tr>
                          <th data-sortable="true">Question</th>
                          <th>Your Answer</th>
                          <th>Correct Answer</th>

                        </tr>
                      </thead>

                      <tbody>
                        {assessment_data?.quiz?.questions?.map(question => (
                          <tr key={question._id}>
                            <td>{question.label}</td>
                            <td>{question.options.filter(o => {
                              const my = assessment_data?.answers?.filter(a => a.question === question._id)?.map(a => a.answer)
                              return my?.indexOf(o._id) !== -1
                            }).map(ans => <span key={ans._id} className={ans.is_correct ? 'text-success' : 'text-danger'}>{ans.value}</span>)}</td>
                            <td>{question.options.filter(o => o.is_correct).map(a => <span key={a._id}>{a.value}</span>)}</td>
                          </tr>
                        ))}
                      </tbody>

                    </table>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>




      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Your Answers</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Hello, below is some text in a div that should start scrolling if the height of the modal exceeds the browser.
              <p><div id="scrollbox">
                <br />
                <div class="form-floating mb-3">
                  <label type="email" class="form-control btn btn-primary" id="floatingInput" placeholder="name@example.com" />

                </div>
                <br />
                <div class="form-floating mb-3">
                  <label type="email" class="form-control btn btn-danger" id="floatingInput" placeholder="name@example.com" />

                </div>
                <br />s
              </div>
              </p>
            </div>

          </div>
        </div>
      </div>


      {/* {
        assessment_data.map((opElem) => {
          const { questions } = opElem;
          return (
            <>
              {questions.map((curElem) => {

                const { label, category, options } = curElem;
                return (
                  <>
                    {label}
                    {category}


                  </>
                )
              })}

            </>
          )
        })
      } */}







      {/* <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Your Answers</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Hello, below is some text in a div that should start scrolling if the height of
                                        the modal exceeds the browser.
                                        <p>
                                            <div id="scrollbox">
                                                {
                                                    result.map(({question : {label}, options, value : {value}, correct }, elemIndex) => {
                                                        console.log({correct})
                                                        return (
                                                            <div key={elemIndex} className="container">
                                                                <div className="row">
                                                                    <br/>

                                                                    <h5 className="labelques">{label}</h5>
                                                                    <br/>
                                                                    <br/>
                                                                    <div className="changehero">

                                                                        <div>
                                                                            <div className="form-floating mb-3">
                                                                                <label type="email"
                                                                                       className={`form-control btn ${correct ? 'btn-success' : 'btn-danger'}`}
                                                                                       id="floatingInput"
                                                                                       placeholder="name@example.com">  {value}</label>
                                                                            </div>
                                                                            <br/>
                                                                            <br/>
                                                                        </div>

                                                                        <br/>
                                                                        <br/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }


                                            </div>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div> */}


    </>
  )
}

export default Resultassesment
