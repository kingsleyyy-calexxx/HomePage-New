import React, { useEffect, useState } from 'react'
import '../Styles/WordGame.css';
import { Link } from 'react-router-dom';
const WORDS =['apple','dahlia','ball','elephant','people','dream','football', 'king', 'queen', 'one', 'two', 'ten', 'twelve',
'bread', 'breakfast', 'truck','friend','tree','parrot','lion','cat','dog']
export default function WordGame() {
    const [isplayOn,setIsPlayOn]=useState(false);
    const [inputValue,setInputValue]=useState("");
    const [correctWord,setCorrectWord]=useState('');
    const[ScrambledWord,setScrambledWord]=useState('');
    var[totalScore,setTotalScore]=useState(0);
    var[score,setScore]=useState(0);

    const[message,setMessage]=useState('');

    const handleInputChange=(event)=>{
        console.log(event.target.value)
     setInputValue(event.target.value.toUpperCase());
    };
    
    const selectWord =()=>
    {
       const randomIndex = Math.floor(Math.random() * WORDS.length);
       const tempWord = WORDS[randomIndex];
       return tempWord;
       
    };

    const increaseScore=()=>{

    }

    const handleButtonClick =()=>{
        console.log("clicked");
        setTotalScore(totalScore + 1);
        if(inputValue!=='')
        {
        if(correctWord === inputValue)
        {
            setScore(score + 1);
            setMessage("CORRECT ANSWER");
        }
        else{
            setMessage("WRONG ANSWER");
        }
       }

    };

    const handleStartGame =()=>
    {
        setScore(0);
        setTotalScore(0);
        setIsPlayOn(true);
        setInputValue("");
        setMessage("");
        
        const word= selectWord();
        setCorrectWord(word.toUpperCase());
        setScrambledWord(constructScrambledWord(word));
    };
    const handleNextGame =()=>
    {
        setIsPlayOn(true);
        setInputValue("");
        setMessage("");
        
        const word= selectWord();
        setCorrectWord(word.toUpperCase());
        setScrambledWord(constructScrambledWord(word));
    };
    
    const handleEndGame = () => {
        setIsPlayOn(false);
        setInputValue("");
        setMessage("");
        alert(score + "out of " + totalScore);
    }

    const constructScrambledWord = (word) =>{
      const shuffledArray = word.split('');
      //FISHER-YATES SHUFFLE (REMEMBER KARISH)
      for(let i=shuffledArray.length-1; i>0;i--)
      {
        const j= Math.floor(Math.random()*(i+1));
        [shuffledArray[i],shuffledArray[j]]=[shuffledArray[j],shuffledArray[i]];
    }
    return shuffledArray.join('');
    }

    useEffect(()=>{
        let clearMessage;
        if(message === "WRONG ANSWER")
        {
            const clearMessage=setTimeout(()=>setMessage(""),800);
        }
        return()=>{
            if(clearMessage){
                clearTimeout(clearMessage);
            }
        };
      },[message])

  return (
    <body id='entire'>
    <div id='word'>
        {!!message &&(
           <div id='message'>
            <p>{message}</p>
           </div>
        )}
         <h1>Word Game</h1>
         <div id='content'>
           {isplayOn ?(
             <>
              <div id='board'>
                 {correctWord.split("").map((el,i)=>(
                 <span key={`${el}_${i}`} id='square'>
                  {inputValue[i]} 
                </span>
                 ))}
              </div>
          <p id='word1'>{ScrambledWord}</p> {/* {condition ? valueIf_true: valueIf_false} */}
            <div id='fields'>
               <input type='text' onChange={handleInputChange} value={inputValue}/>
                <button type='button' id='button'onClick={handleButtonClick}>Enter</button>
            </div>
       </>
        ) :(
        <>
            <button id='start' type='button' onClick={handleStartGame}>Start Game</button>
            <Link to="/"><button id='start'>Go Home</button></Link>
        </>
        )}
        
            {
            isplayOn &&(
                <div>
                    <button id='new' type='button' onClick={handleNextGame}>Next Word</button>
                    <button id='new' type='button' onClick={handleEndGame}>End game</button>
                </div>
            )}
    </div>
</div>
<img src='https://img.freepik.com/premium-psd/mockup-wall-childrens-room-with-teddy-bear-white-wall-background_512478-55.jpg?w=2000'></img>
</body>
  )
}
