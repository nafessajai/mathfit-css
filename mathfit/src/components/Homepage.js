/* eslint-disable no-unused-vars */
/* eslint react/prop-types: "off"*/

import { React, useState} from 'react';
import Questions from './Questions';
import '../assets/App.css';
import App from './App';
import Leaderboard from './Leaderboard';

function Homepage({userHighScore, username, ghighscore, ghighuser}){
  const [goToGameArith, startGameArith] = useState(false);
  const [goToGameC, startGameC] = useState(false);
  const [goToGameAlg, startGameAlg] = useState(false);
  const [goToCat, setCat] = useState(false);
  const [goToLeaderboard, startLeaderboard] = useState(false);
  const [logOut, setLogOut] = useState(false);

    function handleStartGameArith() {
      startGameArith(true)
    }

    function handleStartGameC() {
      startGameC(true)
    }

    function handleStartGameAlg() {
      startGameAlg(true)
    }

    function handlePickCategories() {
      setCat(true)
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


    if ((goToGameAlg == false && goToGameArith == false && goToGameC == false && goToLeaderboard == false && logOut == false && goToCat == false)) {
      return (
        <div>
          <div className="home-container">
            <div className='title-bar'>
              <img className="bar-logo" src={"https://i.imgur.com/Y16zgk9.png"} alt="hello"/>
              <div className='intro-home'>Train Your Brain. Compete with Friends. Track Your Progress.</div>
            </div>
            <div className = "userOptions">
              <div className = "optionsButton">
                <a className="Submit" onClick={handlePickCategories}>CATEGORIES&nbsp;</a>
              </div>
              <div className = "optionsButton">
                <a className="Submit" onClick={handleStartLeaderboard}>LEADERBOARD&nbsp;</a>
              </div>
              <div className = "optionsButton">
                <div><a className="Submit" onClick={handleLogOut}>LOG OUT&nbsp;</a></div>
              </div>
              <div className = "optionsButton">
                <a className="Submit" onClick={handleDeleteAccount}>DELETE ACCOUNT&nbsp;</a>
              </div>
            </div>
            <div className="scores"> 
              <div className='userscore_header'><p>User High Score: {userHighScore}</p></div>
              <div className='globalscore_header'><p>Global High Score: {String(ghighscore).concat(' (').concat(ghighuser).concat(')')}</p></div>
            </div>      
          </div>
        </div>
        );
    } else {
      if (goToGameArith == true) {
        return (
          <div>
            <Questions userHighScore={userHighScore} username = {username} ghighscore={ghighscore} ghighuser={ghighuser} prompt={"arithmetic"}/>
            </div>
          );
      } else if (goToGameAlg == true) {
        return (
          <div>
            <Questions userHighScore={userHighScore} username = {username} ghighscore={ghighscore} ghighuser={ghighuser} prompt={"algebra"}/>
            </div>
          );
      } else if (goToCat) {
        return (
          <div className="home-container">
            <div className='title-bar'>
              <img className="bar-logo" src={"https://i.imgur.com/Y16zgk9.png"} alt="hello"/>
              <div className='intro-home'>Train Your Brain. Compete with Friends. Track Your Progress.</div>
            </div>
            <div className = "userOptions">
              <div className = "optionsButton">
                <a className="Submit" onClick={handleStartGameArith}>ARITHMETIC&nbsp;</a>
              </div>
              <div className = "optionsButton">
                <a className="Submit" onClick={handleStartGameAlg}>ALGEBRA&nbsp;</a>
              </div>
              <div className = "optionsButton">
                <a className="Submit" onClick={handleLogOut}>GO BACK&nbsp;</a>
              </div>
              <div className = "optionsButton">
                <div><a className="Submit" onClick={handleLogOut}>LOG OUT&nbsp;</a></div>
              </div>
            </div>
            <div className="scores"> 
              <div className='userscore_header'><p>User High Score: {userHighScore}</p></div>
              <div className='globalscore_header'><p>Global High Score: {String(ghighscore).concat(' (').concat(ghighuser).concat(')')}</p></div>
            </div>      
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