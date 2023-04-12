/* eslint react/prop-types: "off"*/

import { React, useState} from 'react';
import Questions from './Questions';
import '../assets/App.css';
import App from './App';
import questionsList from '../assets/questions.json'
import Leaderboard from './Leaderboard';

function Homepage({userHighScore, username, ghighscore, ghighuser}){
  const [goToGame, startGame] = useState(false);
  const [goToLeaderboard, startLeaderboard] = useState(false);
  const [logOut, setLogOut] = useState(false);

    function handleStartGame() {
      startGame(true)
    }

    function handleStartLeaderboard() {
      startLeaderboard(true)
    }

    function handleLogOut() {
      setLogOut(true)
    }

    function handleDeleteAccount() {
      const userscore = JSON.parse(localStorage.getItem("userScores")).userScores
      var updatedScores = userscore.filter(i => {
        if (i.user != username) {
          return i
        }
      })
      var object = new Object();
      object.userScores = updatedScores
      localStorage.setItem("userScores", JSON.stringify(object))

      const users = JSON.parse(localStorage.getItem("users")).users
      var updatedUsers = users.filter(i => {
        if (i !== String(username)) {
          return i
        }
      })
      var object1 = new Object();
      object1.users = updatedUsers
      localStorage.setItem("users", JSON.stringify(object1))
      setLogOut(true)
    }


    if (goToGame == false && goToLeaderboard == false && logOut == false) {
      return (
        <div>
              <div className = "userOptions">
              
                <div className = "handleLogOut">
                <div><a className="Submit" onClick={handleLogOut}>Log Out&nbsp;</a></div>
                </div>
                <div className = "optionsButton">
                <a className="Submit" onClick={handleDeleteAccount}>Delete Account&nbsp;</a>
                </div>

                <div className = "optionsButton_play">
                <a className="Submit" onClick={handleStartGame}>Play!&nbsp;</a>
                </div>

                <div className = "optionsButton_leaderboard">
                <a className="Submit" onClick={handleStartLeaderboard}>Leaderboard&nbsp;</a>
                </div>
                
            </div>
          <div>          
            
            <div className = "center">
              <img src={"https://nypost.com/wp-content/uploads/sites/2/2021/10/When-celebrity-faces-change1_.jpg?quality=80&strip=all"} alt="hello" width="500" height="333"/>
              </div>

              <div className='rectangle'></div>
              <div className='welcome_header'><p>Welcome {username}</p></div>
              <div className='userscore_header'><p>User High Score: {userHighScore}</p></div>
              <div className='globalscore_header'><p>Global High Score: {String(ghighscore).concat(' (').concat(ghighuser).concat(')')}</p></div>

              <div className = "header">
                <h1 className='about-border'>Guess the Celebrity</h1>
              </div>
              <div className = "intro">
                <p>Do you know more celebrities than your friends? Play to find out!</p>
              </div>
              
              
              </div>

          </div>
        );
    } else {
      if (goToGame == true) {
        return (
          <div>
            <Questions  questionslist={questionsList} userHighScore={userHighScore} username = {username} ghighscore={ghighscore} ghighuser={ghighuser}/>
            </div>
          );
      } else if (goToLeaderboard == true) {
        return (
          <div>
            <Leaderboard userHighScore={userHighScore} username = {username} ghighscore={ghighscore} ghighuser={ghighuser}/>
          </div>
        )
      } else if (logOut == true) {
        return (
          <div><App/></div>
        )
      }
    }
}

export default Homepage;