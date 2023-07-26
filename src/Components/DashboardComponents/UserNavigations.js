import React from 'react'
import { NavLink } from 'react-router-dom'

const UserNavigations = () => {
    return (
        <div>
            <NavLink className="mt-3 user_navigations" to="/available-quizes"> Play Daily QUiz </NavLink><br /> <br />
            <NavLink  className="mt-3 user_navigations" to="/categories">Play Category Quizzes</NavLink> 
        </div>
    )
}

export default UserNavigations
