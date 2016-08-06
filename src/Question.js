import React from 'react';

export default function(props){

  let style = {},
      answerStyle = {display: 'none'};

  if (props.submitted) {
    answerStyle = {display: 'inline-block'};
    style = props.correct ? {backgroundColor:'#30C205'} : {backgroundColor:'#C20000'}
  }
    return (
      <div className="hunt-container" style={style}>
        <p className="question">{props.question}</p>
        <input 
        type="text"
        value={props.userGuess} 
        onChange={(e)=>{props.changeGuess(props.ind, e.target.value)}}
        />
        <p style={answerStyle}>The Answer is: {props.answer}!</p>
      </div>
    )
}