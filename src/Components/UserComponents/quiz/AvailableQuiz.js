
import React, { useState } from 'react'
// import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom';
// import Header from '../../CommonComponents/Header'

export const AvailableQuiz = () => {
    const [step, setStep] = useState(1)



    const goToNext = (e) => {
        
        setStep(2)
    }

    return (
        <>
               {step === 1 && <>
                <button className="btn btn-primary availablequiz" onClick={goToNext}>AvailableQuiz</button>

               </>
                }
               {step===2 &&<>
                <button className="btn btn-primary availablequiz">DailyQuiz</button>
                <NavLink className="btn btn-primary availablequiz" to={'/available-quizes'} >CategoryQuiz</NavLink>


               </>
                }
                

        </>
    )
}

export default AvailableQuiz