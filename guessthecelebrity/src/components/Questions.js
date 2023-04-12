/* eslint react/prop-types: "off"*/

import { React, useState, useRef } from 'react';

function Questions({ questionslist, userHighScore, username, ghighscore, ghighuser}){
    const start = useRef(true);
    const globalhighuser = useRef(ghighuser);
    const highscore = useRef(String(userHighScore)); 
    const globalhighscore = useRef(String(ghighscore)); 
    const [currQuestion, setCounterQ] = useState(1); 
    const [ counter, setCounter] = useState(0);
    const [correct, setCorrect] = useState(false); 
    const [incorrect, setIncorrect] = useState(false); 
    // pick a question
    const question = questionslist[Math.floor(Math.random() * 11)];

function handleSubmit(e){
    setCorrect(false); 
    setIncorrect(false); 
    e.preventDefault();
    if (document.getElementById(question.correct).checked) {
        setCounter(counter +1);
        if (counter > parseInt(highscore.current)) {
            highscore.current = counter
        }
        if (counter > parseInt(globalhighscore.current)) {
            globalhighscore.current = counter
            globalhighuser.current = username
        }
        if (currQuestion + 1 <= 20) {
            setCounterQ(currQuestion +1);
        } else {
            start.current = false; 
        }
        setCorrect(true); 
    } else {
        if (currQuestion + 1 <= 20) {
            setCounterQ(currQuestion +1);
        } else {
            start.current = false; 
        }
        setIncorrect(true); 
    }
}

function handleSubmitAfter(e){
    setCorrect(false); 
    setIncorrect(false); 
    e.preventDefault();
    if (counter > parseInt(highscore.current)) {
        highscore.current = counter
        const userscores = JSON.parse(localStorage.getItem("userScores")).userScores
        for (var i = 0; i < userscores.length; i++) { 
            if (userscores[i].user == username) {
                userscores[i].score = highscore.current
            }
        }
        var a = new Object();
        a.userScores = userscores;
        localStorage.setItem("userScores", JSON.stringify(a))

    }
    if (counter > parseInt(globalhighscore.current)) {
        globalhighscore.current = counter
        globalhighuser.current = username
    }

}

if (!start.current) {
    if (counter > parseInt(highscore.current)) {
        highscore.current = counter
        const userscores = JSON.parse(localStorage.getItem("userScores")).userScores
        for (var i = 0; i < userscores.length; i++) { 
            if (userscores[i].user == username) {
                userscores[i].score = highscore.current
            }
        }
        var a = new Object();
        a.userScores = userscores;
        localStorage.setItem("userScores", JSON.stringify(a))

    }
    if (counter > parseInt(globalhighscore.current)) {
        globalhighuser.current = username
        globalhighscore.current = counter
    }
    return (
        <div>
        <div className = "gameover">
            <h1>GAME OVER</h1>
        </div>
        <div className='rectangle'></div>
        <div className='currscore_header'><p>Current Score: {counter}</p></div>
        <div className='welcome_header'><p>Welcome {username}</p></div>
        <div className='userscore_header'><p>User High Score: {highscore.current}</p></div>
        <div className='globalscore_header'><p>Global High Score: {String(globalhighscore.current).concat(' (').concat(globalhighuser.current).concat(')')}</p></div>
        
        <div><a className="returnHome" href="">Home&nbsp;</a></div>
        </div>
    );
} else {
    if (correct == false && incorrect == false) {
    return (
        <div>

            <div className='rectangle'></div>
            <div className='currscore_header'><p>Current Score: {counter}</p></div>
            <div className='welcome_header'><p>Welcome {username}</p></div>
            <div className='userscore_header'><p>User High Score: {highscore.current}</p></div>
            <div className='globalscore_header'><p>Global High Score: {String(globalhighscore.current).concat(' (').concat(globalhighuser.current).concat(')')}</p></div>

            <div className = "questionimg">
            <div className='question_header'><h1>Question {currQuestion}</h1></div>
            <div className='center_image'><img src={question.img} alt="hello" width="300" height="300" /></div>
            <form>
                <div className='question_text'><p>Who is he/she?</p></div>
                <div>
                    <div className='choice1'>
                        <input
                        className="design"
                        type="radio"
                        id="ans1"
                        name="ans"
                        value={question.option1}
                        />
                        <label className="text">
                        {question.option1}
                        </label></div>

                        <div className='choice2'>
                        <input
                        className="design"
                        type="radio"
                        id="ans2"
                        name="ans"
                        value={question.option2}
                        />
                        <label className="text">
                        {question.option2}
                        </label></div>
                        <div className='choice3'>
                        <input
                        className="design"
                        type="radio"
                        id="ans3"
                        name="ans"
                        value={question.option3}
                        />
                        <label className="text">
                        {question.option3}
                        </label></div>
                        <div className='choice4'>
                        <input
                        className="design"
                        type="radio"
                        id="ans4"
                        name="ans"
                        value={question.option4}
                        />
                        <label className="text">
                        {question.option4}
                        </label></div>
                </div>
 

            </form>
            <div className = "optionsButton_question">
                <a className="Submit" onClick={handleSubmit}>Submit&nbsp;</a>
            </div>
        </div>
</div>

    );
    }
    else if (correct) {
        return (
            <div className="center">
                <div >
                    <div className='status_header'><h3>Correct</h3></div>
                    <img src="https://www.pngitem.com/pimgs/m/509-5099446_correct-icon-png-transparent-png.png" alt="hello" width="400" height="400" />
                </div>
                <div className = "optionsButton_afterquestion">
                <a className="Submit" onClick={handleSubmitAfter}>Next Question&nbsp;</a>
                </div>
            </div>
        );
    } else if (incorrect) {
        return (
            <div className="center">
                <div >
                    <div className='in_status_header'><h3>Incorrect</h3></div>
                    <img src="https://cdn0.iconfinder.com/data/icons/shift-free/32/Incorrect_Symbol-512.png" alt="hello" width="400" height="400" />
                </div>
                <div className = "optionsButton_afterquestion">
                <a className="Submit" onClick={handleSubmitAfter}>Next Question&nbsp;</a>
                </div>
                
            </div>
            
        );
    }
}
} 


export default Questions;