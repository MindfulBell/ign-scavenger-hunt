import React, { Component } from 'react';
import './style/App.css';
import Question from './Question.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {submitted: false, score: 0}
    this.changeGuess = this.changeGuess.bind(this);
    this.checkAnswers = this.checkAnswers.bind(this);
  }

  componentWillMount(){
    // some ajax call here to slotter to get the questions
    let data = [{userGuess: "", q: "What score did Pokemon Go get on IGN?", a: "7" , correct: false }, 
                {userGuess: "", q: "What was the second Con of the Battleborn Review?", a: "It's not Overwatch" , correct: false }, 
                {userGuess: "", q: "What game was this week's Beyond 20 questions?", a: "Metroid" , correct: false }, 
                {userGuess: "", q: "What is 5 + 5?", a: "10" , correct: false }, 
                {userGuess: "", q: "How are you?", a: "Good", correct: false }]

    this.setState({hunts: data})
  }

  changeGuess(key, value){
    let hunts = this.state.hunts.map((hunt, ind) => {
      if (key === ind) {
        hunt.userGuess = value;
      }
        return hunt;
    });
    this.setState({hunts})
  }

  checkAnswers(){
    let score = 0;
    let answeredHunts = this.state.hunts.map((hunt, ind) => {
      if (hunt.userGuess.toLowerCase() === hunt.a.toLowerCase()) {
        hunt.correct = true;
        score++;
      }
      return hunt;
    })
    this.setState({submitted: true, score, hunts: answeredHunts})
  }

  compareAnswer(user, actual){

  }

  render() {
    // build an array of Questions here each with unique props
    let hunts = this.state.hunts.map((hunt, ind)=>{
      return (
        <Question 
          key={ind}
          ind={ind}
          question={hunt.q}
          answer={hunt.a} 
          userGuess={hunt.userGuess}
          changeGuess={this.changeGuess}
          correct={hunt.correct}
          submitted={this.state.submitted}
          />
        )
    });

    let scoreStyle = this.state.submitted ? {display: 'inline-block'} : {};

    return (
      <div className="App">
        <div className='title'> 
          <h2>IGN Loot Get</h2> 
        </div>
        <div className='form-holder'>
          {hunts}
          <div 
            className='submit-button' 
            onClick={this.checkAnswers}>Submit</div>
            <div className='user-score' style={scoreStyle}>{`You gained ${this.state.score*5} XP!`}
            </div>
        </div>
      </div>
    );
  }
}

export default App;


