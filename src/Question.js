import React from 'react';

export default function(props){

  let answeredClass = '';
  let value = (props.hovered || !props.submitted) ? props.userGuess : props.answer;
  let focus = false;

  if (props.submitted) {
    answeredClass = props.correct ? 'full-chest chest' : 'empty-chest chest';
  }

    return (
      <div className="hunt-container">
        <p className="question">{props.question}</p>
        <input
        className={props.submitted && !props.hovered ? 'finished-input': ''}
        id='user-input' 
        readOnly={props.submitted ? true : false}
        type="text"
        onMouseEnter={(e)=>{props.toggleHover(props.ind, true)}}
        onMouseLeave={(e)=>{props.toggleHover(props.ind, false)}}
        value={value} 
        onChange={(e)=>{props.changeGuess(props.ind, e.target.value)}}
        />
          <div className={answeredClass}>
          </div>
      </div>
    )
}