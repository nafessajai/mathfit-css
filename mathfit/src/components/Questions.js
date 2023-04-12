/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-control-regex */
/* eslint react/prop-types: "off"*/

import { React, useState, useRef, useEffect} from 'react';

import axios from "axios"


function Questions({userHighScore, username, ghighscore, ghighuser, prompt}){
    const start = useRef(true);
    const globalhighuser = useRef(ghighuser);
    const highscore = useRef(String(userHighScore)); 
    const globalhighscore = useRef(String(ghighscore)); 
    const [currQuestion, setCounterQ] = useState(1); 
    const [ counter, setCounter] = useState(0);
    const [correct, setCorrect] = useState(false); 
    const [incorrect, setIncorrect] = useState(false); 
    const [rend, setRender] = useState(false);
    const [temp, setTemp] = useState(false);
    let question = useRef("");
    const MY_KEY = "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";
    // pick a question

    // async function generateQuestion() {
    //     const openai = new OpenAIApi(configuration);
    //     const completion = await openai.createCompletion({
    //       model: "text-davinci-003",
    //       prompt: "write a math algebra question with 4 multiple choice answers and one being correct for 8th graders and put it in the form of a JSON with 6 fields {question, option1, option2, option3, option4, correct, explanation}",
    //       max_tokens: 1024,
    //       n: 1,
    //       stop: null,
    //       temperature: 0.7
    //     });
    //     setQuestion(completion.data.choices[0].text)
    //     console.log(completion.data.choices[0].text);
    //   }
    useEffect(() => {

        async function runner() {
            await generateQuestion();
            setRender(true);
        }
        runner();
      }, [temp]);

      async function generateQuestion() {
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/completions",
                {
                  prompt: `write a math ${prompt} question for middle school students under 15 with 4 multiple choice answers and one being correct and put it in the form of a JSON with 6 fields {question, option1, option2, option3, option4, correct, explanation}, with double quotations around keys and values of json entries. The correct field value should be the correct key {option1, option2, option3, option4} and not the value itself`,
                  model: "text-davinci-002",
                  max_tokens: 4000,
                  n: 1,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${MY_KEY}`,
                  },
                }
              );

              // Preserve newlines, etc. - use valid JSON
            //  let s = response.data.choices[0].text.replace(/\\n/g, "\\n")
            //  .replace(/\\'/g, "\\'")
            //  .replace(/\\"/g, '\\"')
            //  .replace(/\\&/g, "\\&")
            //  .replace(/\\r/g, "\\r")
            //  .replace(/\\t/g, "\\t")
            //  .replace(/\\b/g, "\\b")
            //  .replace(/\\f/g, "\\f");
            
            //   // Remove non-printable and other non-valid JSON characters
            //   s = s.replace(/[\u0000-\u0019]+/g,"");
            //   let o = JSON.parse(s);

            //   console.log(s)
            console.log(response.data.choices[0].text)
            let output = response.data.choices[0].text.split('{')[1]
            // .replace(/\\n/g, "\\n")
            // .replace(/\\'/g, "\\'")
            // .replace(/\\"/g, '\\"')
            // .replace(/\\&/g, "\\&")
            // .replace(/\\r/g, "\\r")
            // .replace(/\\t/g, "\\t")
            // .replace(/\\b/g, "\\b")
            // .replace(/\\f/g, "\\f")
            // .replace(/[\u0000-\u0019]+/g,"");
            
            output = "{" + output;
            console.log(output)
            let jsonout = JSON.parse(JSON.parse(JSON.stringify(output)))
            question.current = jsonout  //.question;
            console.log(question.current.question);
            return;
        } catch (error) {
            console.log(error);
        }
      }

function handleSubmit(e){
    setCorrect(false); 
    setIncorrect(false); 
    e.preventDefault();
    if (document.getElementById(question.current.correct).checked) {
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
    if (correct) {
        setCorrect(false); 
        setRender(false);
        setTemp(!temp);
    }
    
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
function questionRender() {
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
        <div className="home-container">
            <div className="scores"> 
                <div className='currscore_header1'><p>Current Score: {counter}</p></div>
                <div className='userscore_header1'><p>User High Score: {highscore.current}</p></div>
                <div className='globalscore_header1'><p>Global High Score: {String(globalhighscore.current).concat(' (').concat(globalhighuser.current).concat(')')}</p></div>
            </div>  

            <div className = "questionimg">
            <form>
                <div className='q-box'>
                    <div className='question_header'><h1>Question {currQuestion}</h1></div>
                    <div className='question_text'><p>{question.current.question}</p></div>
                    <div>
                        <div className='choice1'>
                            <input
                            className="design"
                            type="radio"
                            id="option1"
                            name="option"
                            value={question.current.option1}
                            />
                            <label className="text">
                            {question.current.option1}
                            </label></div>

                            <div className='choice2'>
                            <input
                            className="design"
                            type="radio"
                            id="option2"
                            name="option"
                            value={question.current.option2}
                            />
                            <label className="text">
                            {question.current.option2}
                            </label></div>
                            <div className='choice3'>
                            <input
                            className="design"
                            type="radio"
                            id="option3"
                            name="option"
                            value={question.current.option3}
                            />
                            <label className="text">
                            {question.current.option3}
                            </label></div>
                            <div className='choice4'>
                            <input
                            className="design"
                            type="radio"
                            id="option4"
                            name="option"
                            value={question.current.option4}
                            />
                            <label className="text">
                            {question.current.option4}
                            </label></div>
                    </div>
                </div>

            </form>
            <div className = "optionsButton_question">
                <a className="Submit" onClick={handleSubmit}>SUBMIT&nbsp;</a>
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
return rend ? <div>{ questionRender() }</div> : <div>Loading...</div>;
} 


export default Questions;