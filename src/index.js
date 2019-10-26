import React,{Component} from 'react';
import ReactDOM from 'react-dom'; 
import './assets/style.css';
import quizService from './quizService';
import QuestionBox from './component/QuestionBox';
import Result from './component/Result';


class QuizBee extends Component {
  state={
    questionBank:[],
    qsd:[],
    score:0,
    responses:0
  };

  getQuestions= () => {
    quizService().then(question => {
      this.setState({
        
       questionBank:question  
      });
    });
  };


  getQdata= () => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
 


  computeAnswer=(answer, correctAnswer) => {
    if(answer===correctAnswer){
this.setState({
  score:this.state.score+1
});
    }
    this.setState({
      responses: this.state.responses < 5? this.state.responses + 1 :5
    });
  }

playAgain=()=>{
  this.getQuestions();
  this.setState({
    score:0,
    responses:0
  })
}
componentDidMount()
{
  this.getQuestions();
  this.getQdata();
  }

  render()
  {
    return (
      <div className="container">
      <div className="title">QuizBee</div>
     
      {this.state.questionBank.length > 0 && this.state.responses <5 && this.state.questionBank.map(
        ({question,answers, correct, questionId}) => (
          <QuestionBox 
          question={question} 
          options={answers} 
          key={questionId}
          selected={answer => this.computeAnswer(answer,correct)}
          />

         
        )
      
      )}
      {this.state.responses=== 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />):null}
      </div>
    );
  }
}

ReactDOM.render(<QuizBee />, document.getElementById("root"));