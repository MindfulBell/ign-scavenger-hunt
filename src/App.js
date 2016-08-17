import React, { Component } from 'react';
import './style/App.css';
import Question from './Question.js';
import $ from 'jquery';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      finished: false,
      submitted: false, 
      score: 0, 
      collapsed: true, 
      onPage: false,
      hunts: []
    }

    this.changeGuess = this.changeGuess.bind(this);
    this.checkAnswers = this.checkAnswers.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.choppedUrl = this.choppedUrl.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.toggleFinish = this.toggleFinish.bind(this)
  }

  componentDidMount(){

    //hook up to a user to get xp or whatever?

    $.ajax({
      url: `http://apis.ign.com/slotter/v3/slotters/loot-hunt/_published`,
      dataType: 'jsonp',
      data: {
        format: 'js'
      },
      success: (resp)=>{
        let items = resp.version.items,
            storageGuesses = sessionStorage.guesses ? JSON.parse(sessionStorage.guesses) : undefined;

        let hunts = items.map((item, ind)=>{
              let hunt = {
                    ind,
                    link: item.url.match(/www.*/)[0],
                    q: item.title,
                    a: item.description,
                    correct: false,
                    hovered: false,
                    userGuess: ""
                  }
              if (storageGuesses !== undefined && storageGuesses[ind].userGuess.length) {
                hunt.userGuess = storageGuesses[ind].userGuess;
              }

              return hunt;
            });
        this.setState({hunts});

        items.forEach((item)=>{
          if (this.choppedUrl(item.url) === this.choppedUrl(window.location.href)) {
            console.log(this.choppedUrl(item.url))
            this.setState({onPage: true})
          }
        })

      },
      error: (a,b,c)=>{
        console.log(a,b,c)
      }
    })
  }

  choppedUrl(string){
    return string.match(/www[^?]*/)[0];
  }

  changeGuess(key, value){
    let hunts = this.state.hunts.map((hunt, ind) => {
      if (key === ind) {
        hunt.userGuess = value;
      }
        return hunt;
    });
    let guessesForStorage = hunts.map((hunt)=>{
      return {ind: hunt.ind, userGuess: hunt.userGuess}
    })
    this.setState({hunts})
    sessionStorage.setItem("guesses", JSON.stringify(guessesForStorage))
    // update local storage with the user's answer
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

  toggleCollapse(){
    this.setState({collapsed: !this.state.collapsed})
  }

  toggleHover(key, hoverState){
    let hunts = this.state.hunts.map((hunt, ind) => {
      if (key === ind) {
        hunt.hovered = hoverState
      }
        return hunt;
    });
    this.setState({hunts})
  }

  toggleFinish(){
    this.setState({finished: true})
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
          toggleHover={this.toggleHover}
          hovered={hunt.hovered}
          />
        )
    });

    let ignLogo = <div className='icon logo'></div>
    let chest = <div className='icon chest'></div>
    let iconToShow = this.state.collapsed ? ignLogo : chest;
    let header = <div className='header'>{iconToShow}<p>Scavenger Hunt!</p></div>;


    return (
      <div className={this.state.finished ? 'hide' : ''}>
        <div className={this.state.collapsed ? 'App collapsed' : 'App'}>
          <div className={this.state.onPage ? 'title on-page' : 'title'} onClick={this.toggleCollapse}>
          {header}
          </div>
          <div className={this.state.collapsed ? 'form-holder collapsed' : 'form-holder'}>
          <div className='form-background'>
          </div>
            {hunts}
            <div 
              className={this.state.submitted ? 'submit-button submitted' : 'submit-button'}
              onClick={this.checkAnswers}>
              {this.state.submitted ? <p>Gained {this.state.score*5} XP!</p> : <p>Submit</p>}
            </div>
            <div className='xp-bar'></div>
            <div 
              onClick={this.toggleFinish}
              className={this.state.submitted ? 'show-finish' : ''}>
              {this.state.submitted ? <p> X </p> : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


