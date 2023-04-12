/* eslint react/prop-types: "off"*/

import { React, useState, useRef } from 'react';
import Homepage from './Homepage';
import '../assets/App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  // initiatize state, the game hasnt started yet
  const [, setStarted] = useState(false);
  const navigate = useNavigate();

 // const listOfUsers = useRef([]);
 // const listOfPasswords = useRef([]);
  const userHighScore = useRef(0);
  //keep track of the state of the game (started or not)
  const start = useRef(false);

  function globalHighFinder() {
    var scorelist = JSON.parse(localStorage.getItem("userScores")).userScores
    var max_score = 0
    for (var i = 0; i < scorelist.length; i++) { 
      if (scorelist[i].score > max_score) {
        max_score = scorelist[i].score
      }
    }
    return max_score
  }

  function globalHighFinderUser() {
    var scorelist = JSON.parse(localStorage.getItem("userScores")).userScores
    var max_score = 0
    var curr_user = "";
    for (var i = 0; i < scorelist.length; i++) { 
      if (scorelist[i].score > max_score) {
        curr_user = scorelist[i].user
        max_score = scorelist[i].score
      }
    }
    return curr_user
  }

  function handleStart(){
    setStarted(true); //update the state
    var uname = document.getElementById("uname").value;
    var password = document.getElementById("password").value;
      
    
  //  console.log(localStorage.getItem("passwords"))
    const userpassword = JSON.parse(localStorage.getItem("passwords")).passwords
    console.log(userpassword)
    var obj1 = userpassword.filter(i => {
      if (i.user == uname && i.password != password) {
        alert("Incorrect Password")
        setStarted(false)
        start.current = false
        console.log(obj1)
        return false; 
      } else {
        start.current = true;
      }
    })
  }
  /* <div className = "intro_login">
              <p>Train Your Brain. Play Now!</p>
            </div> 
            <div login-img>
              <img src={"https://i.imgur.com/51NSSPl.png"} alt="hello" width="200" height="200"/>
            </div>*/
  if(!start.current){
    return (
      <div>
        <div className = "center_login">
            
            <form>
              
                <div className = "loginform">
                  
                  <img className="login-logo" src={"https://i.imgur.com/Y16zgk9.png"} alt="hello"/>
                  <h2>Login</h2>
                  <label className="login-title" htmlFor="uname"><b>Username: </b></label>
                  <input id = "uname" type="text" placeholder="Enter Username"  name="uname" required/>   
                  <label className="login-title" htmlFor="password"><b>Password: </b></label>
                  <input id = "password" type="password" placeholder="Enter Password"  name="uname" required/>
                  <div><a className="login" onClick={handleStart}>LOGIN&nbsp;</a></div> 
                  <div><a className="register" onClick={() => navigate('/register')}>REGISTER&nbsp;</a></div> 
                </div>
                
            </form>
            
            <div login-img>
              <img className="login-graphic"src={"https://img.freepik.com/free-vector/tiny-students-with-huge-sign-pi-flat-vector-illustration-boy-girl-studying-math-algebra-school-college-holding-ruler-using-laptop-geometric-figures-background-education-concept_74855-23227.jpg?w=2000&t=st=1680904007~exp=1680904607~hmac=67f6724d157567543bf74eb74bb3c99b9d62317e594726017aeaf077afe6a293"} alt="hello"/>
            </div>
            <div className="subline">Train Your Brain. Play Now!</div>
        </div>
      </div>
      );
  }
return (
  <div>
    <Homepage  userHighScore={userHighScore.current} username = {document.getElementById("uname").value} ghighscore={globalHighFinder()} ghighuser={globalHighFinderUser()}/>
  </div>
);

}

export default App;