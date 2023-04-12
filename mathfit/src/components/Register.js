
/* eslint react/prop-types: "off"*/
import { React, useState, useRef } from 'react';
import '../assets/App.css';
import { useNavigate } from 'react-router-dom';

function Register() {
 const [, setStarted] = useState(false);
  const navigate = useNavigate();

  const listOfUsers = useRef([]);
  const listOfPasswords = useRef([]);
  const userHighScore = useRef(0);
  //keep track of the state of the game (started or not)
  const start = useRef(false);

  function handleStart(){
    setStarted(true); //update the state
    var uname = document.getElementById("uname").value;
    var password = document.getElementById("password").value;
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
        var objectpass = new Object(); 
        object.users = listOfUsers.current;
        objectpass.passwords = listOfPasswords.current; 
        localStorage.setItem("users", JSON.stringify(object))
        console.log(localStorage.getItem("users"))
        
        var hlist;
        var passlist;
        var a = new Object();
        var b = new Object(); 

        if (localStorage.getItem("passwords") == null) {
          var pass = new Object(); 
          pass.user = uname; 
          pass.password = password; 
          passlist = []
          passlist.push(pass)
          b.passwords = passlist
        } else {
          var pass2 = new Object(); 
          pass2.user = uname; 
          pass2.password = password; 
          passlist  = JSON.parse(localStorage.getItem("passwords")).passwords
          passlist = [...passlist, pass2]
          b.passwords = passlist
        }
        localStorage.setItem("passwords", JSON.stringify(b))

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
      }
    })
    navigate('/')
  }


  if(!start.current){
    return (


        <div>
        <div className = "center_login">
            
            <form>
              
                <div className = "loginform">

                  <h3>Register</h3>
                  <label htmlFor="firstname"><b>First Name: </b></label>
                  <input id = "firstname" type="text" placeholder="Enter First Name"  name="firstname" required/>  
                  <label htmlFor="uname"><b>Username: </b></label>
                  <input id = "uname" type="text" placeholder="Enter Username"  name="uname" required/>  
                  <label htmlFor="teacher"><b>Teacher Code: </b></label>
                  <input id = "teacher" type="text" placeholder="Enter Teacher Code"  name="teacher" required/>  
                  <label htmlFor="password"><b>Password: </b></label>
                  <input id = "password" type="password" placeholder="Enter Password"  name="password" required/> 
                  <div><a className="register" onClick={handleStart}>REGISTER&nbsp;</a></div> 
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
}

export default Register;
