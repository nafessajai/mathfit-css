
/* eslint react/prop-types: "off"*/

import { React, useState, useRef } from 'react';
import Homepage from './Homepage';
import '../assets/App.css';

function App() {
  // initiatize state, the game hasnt started yet
  const [, setStarted] = useState(false);

  const listOfUsers = useRef([]);
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
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if(uname.match(letterNumber)) {
      start.current = true;
      userHighScore.current = 0
      if (localStorage.getItem("users") == null) {
        listOfUsers.current = []
      } else {
        listOfUsers.current = JSON.parse(localStorage.getItem("users")).users
      }
      if (!listOfUsers.current.includes(uname)) {
        listOfUsers.current = [...listOfUsers.current, uname]
        var object = new Object();
        object.users = listOfUsers.current;
        localStorage.setItem("users", JSON.stringify(object))
        var hlist;
        var a = new Object();
        if (localStorage.getItem("userScores") == null) {
          var hs = new Object();
          hs.user = uname;
          hs.score = 0;
          hlist = []
          hlist.push(hs)
          a.userScores = hlist
        } else {
          var h = new Object();
          h.user = uname;
          h.score = 0;
          hlist = JSON.parse(localStorage.getItem("userScores")).userScores
          hlist = [...hlist, h]
          a.userScores = hlist
        }
        localStorage.setItem("userScores", JSON.stringify(a))
      } else {
        const userscore = JSON.parse(localStorage.getItem("userScores")).userScores
        var obj = userscore.filter(i => {
          if (i.user == uname) {
            return i.score
          }
        })
        if (obj[0] != null) {
          userHighScore.current = obj[0].score
        }
      }
    } else { 
      alert("Username must be alphanumeric!")
      setStarted(false)
      start.current = false
      return false; 
    }
  }
  if(!start.current){
    return (
      <div>
        <div className = "center_login">
            <img src={"https://nypost.com/wp-content/uploads/sites/2/2021/10/When-celebrity-faces-change1_.jpg?quality=80&strip=all"} alt="hello" width="500" height="333"/>
            </div>
            <div className = "header_login">
              <h1>Guess the Celebrity</h1>
            </div>
            <div className = "intro_login">
              <p>Do you know more celebrities than your friends? Play to find out!</p>
            </div>
            <form>
                <div className = "loginform">
                  <h2>Login:</h2>
                  <label htmlFor="uname"><b>Username: </b></label>
                  <input id = "uname" type="text" placeholder="Enter Username"  name="uname" required/>   
                </div>
                <div><a className="login" onClick={handleStart}>Login&nbsp;</a></div>
            </form>
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
