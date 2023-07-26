import Header from '../../CommonComponents/Header'
import React, {useEffect, useState} from 'react'
const Leaderboard = () => {
    const [user, setUser] = useState([]);
    const viewuser = async () => {

        try {
            const res = await fetch('/api/v1/list/leaderboard', {
                method: "GET",
                headers: {
                    //Accept:"application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                //credentials:"include"
            });
            const data = await res.json();
            console.log(data.data)
            setUser(data.data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
           
        }

    }
    useEffect(() => {
        viewuser();
    }, [])

    return (
        <div>
            <Header/>
            
     
            <div className="leaderboardback">
            <div><h1>Leaderboard</h1></div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Name</th>
                        <th scope="col">Total Points</th>

                    </tr>
                </thead>
                <tbody>



                    {
                        user.map((curElem, index) => {
                            const { first_name, last_name, points } = curElem;
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{first_name} {last_name}</td>
                                    <td>{points}</td>

                                </tr>
                            )
                        })
                    }


                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Leaderboard
