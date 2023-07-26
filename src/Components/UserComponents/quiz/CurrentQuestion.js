
const CurrentQuestion = (props) => {
    return (
        <>
        </>
        // <div className="container ">

        //     <div className="que_text mt-5">
        //         <h2 className="mt-2">{props.index + 1})</h2>
        //         {
        //             quiz.questions && quiz.questions[props.index].label
        //         }

        //         <div className="timer">
        //             <div className="time_left_txt">Time Left</div>
        //             <div className="timer_sec">15</div>
        //         </div>

        //     </div>
        //     <div className="time_line"></div>
        //     {/* <hr className="w-80 mx-auto " /> */}
        //     <div className="outeranswer">
        //         <div className="answerway">
        //             <div className="row mt-5 ">
        //                 {
        //                     quiz.questions && option.map((curElem, index) => {
        //                         const { value, _id } = curElem;
        //                         return (
        //                             <div key={props.index} className="col-md-6 " >
        //                                 <button className={`buttonnew ${_id === answer ? (correct === 1 ? 'btn-success' : (correct === -1 ? 'btn-danger' : '')) : ''}`} onClick={e => handleClickAnswer(_id)}>{value}</button>
        //                             </div>
        //                         )
        //                     })
        //                 }
        //             </div>
        //             <div className="half-circle">
        //                 <h5>{props.index + 1} of {total} </h5>
        //             </div>
        //         </div>
        //     </div>
        //     {props.index + 1}
        // </div>
    )
}
export default CurrentQuestion;