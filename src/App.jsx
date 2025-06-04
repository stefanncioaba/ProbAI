import React, { useState } from 'react'
import './App.css'
import { aiResponse } from './gemini';


const App = () => {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  const handleGetPrompt = async() => {
    const prompt = document.getElementById("promptval").value;
    if (isVisible) {
      setIsVisible(false);
    } 

    setResponse('');
    setQuestion('');

    const aiResp = await aiResponse(prompt);
    const modifiedResp = aiResp.replace(
      /(FINAL ANSWER:\s*)([\d.,]+%)/i,
      '<div class="final-answer">$2</div>'
    );

    setIsVisible(true);
    setQuestion(prompt);
    let i = 0;
    const speed = 15;
    const typeWriter = () => {
      if (i <= modifiedResp.length) {
        setResponse(modifiedResp.slice(0, i));
        i++;
        setTimeout(typeWriter, speed);
      }
    };
    typeWriter();
 
  }
  
  return (
    <>
    <div className="mainblock">
      <h1>Ask Any <br/>Probability Question</h1>
      <p id="subTitle">Predict Anything, Anywhere, Instantly</p>
      <div className="searchblock">
        <input 
        type="text"
        id="promptval" 
        placeholder='Enter a probability question..'
        ></input>
        <button onClick={handleGetPrompt}>➤</button>
      </div>
      {isVisible && <div className="fullAnswer">
          <h2>{question}</h2>
          <div id="responseBlock"
          dangerouslySetInnerHTML={{ __html: response }}
          ></div>
      </div>}
      
    </div>
    </>  
  )
}

export default App
