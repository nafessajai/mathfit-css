/* eslint react/prop-types: "off"*/

import { React, useState, useRef } from 'react';
import Homepage from './Homepage';
import '../assets/App.css';
import questionsList from '../assets/questions.json'

function Leaderboard({userHighScore, username, ghighscore, ghighuser}) {
    const leaderboard = useRef([]);
    const [goHome, setGoHome] = useState(false);

    const userscores = JSON.parse(localStorage.getItem("userScores")).userScores

    function handleGoHome() {
        setGoHome(true)
      }

    function getTop10() {
        var userScoresList = []
        userscores.sort((a, b) => parseInt(b.score) - parseInt(a.score));
        for (var x = 0; x < Math.min(10, userscores.length); x++) {
            userScoresList.push(userscores[x])
        }

        leaderboard.current = userScoresList
        return leaderboard.current
    }

    function generateLeaderboard() {
        getTop10()
        let table = []
        for (let x = 0; x < leaderboard.current.length; x++) {
            let children = []
            children.push(<td key={"num".concat(String(x+1))}>{String(x+1)}</td>)
            children.push(<td key={"user".concat(String(x+1))}>{leaderboard.current[x].user}</td>)
            children.push(<td key={"score".concat(String(x+1))}>{String(leaderboard.current[x].score)}</td>)

            table.push(<tr key={"parent".concat(String(x+1))}>{children}</tr>)
        }
        return table
    }

    if (goHome === false) {
        return (
            <div>
                <div className='rectangle'></div>
                <div className='welcome_header'><p>Welcome {username}</p></div>
                <div className='userscore_header'><p>User High Score: {userHighScore}</p></div>
                <div className='globalscore_header'><p>Global High Score: {String(ghighscore).concat(' (').concat(ghighuser).concat(')')}</p></div>

                <div><button type="submit" onClick={handleGoHome}>Home</button></div>

                <div className = "optionsButton_home">
                <a className="Submit" onClick={handleGoHome}>Home&nbsp;</a>
                </div>

                <h1 className = "leaderboard_header">Leaderboard</h1>
                    <div className="table-wrapper">                   
                        <table className='fl-table'>
                            <thead>
                        <tr>
                            <th key="rank">Rank</th>
                            <th key="user">Username</th>
                            <th key="score">Score</th>
                        </tr>
                            </thead>
                        <tbody>
                        {generateLeaderboard()}
                        </tbody>
                        </table>

                    </div>

            </div>
        )
    } else {
        return(
            <div>
                <Homepage  questionslist={questionsList} userHighScore={userHighScore} username = {username} ghighscore={ghighscore} ghighuser={ghighuser}/>
            </div>
        )
    }
}

export default Leaderboard