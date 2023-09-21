import React, { Component } from 'react';
import '../Styles/Add.css'
import { Link } from 'react-router-dom';

class MathGame extends Component {
  constructor() {
    super();
    this.state = {
      num1: this.getRandomNumber(),
      num2: this.getRandomNumber(),
      correctOption: this.getRandomOption(),
      options: [],
      selectedOption: null,
      message: '',
      score: 0,
      totalScore: 20,
      questionNumber: 1,
      totalQuestions: 20, 
    };
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  getRandomOption() {
    return Math.floor(Math.random() * 4);
  }

  componentDidMount() {
    this.generateOptions();
  }

  generateOptions() {
    const { num1, num2, correctOption } = this.state;
    const options = [];

    for (let i = 0; i < 4; i++) {
      if (i === correctOption) {
        options.push(num1 + num2);
      } else {
        let incorrectOption;
        do {
          incorrectOption = this.getRandomNumber() + this.getRandomNumber();
        } while (options.includes(incorrectOption) || incorrectOption === num1 + num2);
        options.push(incorrectOption);
      }
    }

    this.setState({ options });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      selectedOption,
      correctOption,
      score,
      questionNumber,
      totalQuestions,
    } = this.state;

    if (selectedOption === correctOption) {
      this.setState({ message: 'Correct!', score: score + 1 });
    } else {
      this.setState({ message: 'Incorrect. Try again!'});
    }
    if (questionNumber === totalQuestions) {
      this.setState({ message: 'Game Over' });
      window.location.reload();
    } else {
      this.setState(
        {
          num1: this.getRandomNumber(),
          num2: this.getRandomNumber(),
          correctOption: this.getRandomOption(),
          selectedOption: null,
          message: '',
          questionNumber: questionNumber + 1,
        },
        () => this.generateOptions()
      );
    }
  };

  handleOptionChange = (e) => {
    this.setState({ selectedOption: parseInt(e.target.value, 10) });
  };

  render() {
    const { num1, num2, options, selectedOption, message, score, questionNumber } = this.state;

    return (
      <div className="math-game-container">
        <h1>RandAdd</h1>
        <p>Question {questionNumber}</p>
        <p>Calculate: {num1} + {num2}</p>
        <p>Score: {score}</p>
        <form onSubmit={this.handleSubmit}>
          {options.map((option, index) => (
            <label key={index} className="option-label">
              <input
                type="radio"
                name="options"
                value={index}
                checked={selectedOption === index}
                onChange={this.handleOptionChange}
              />
              {option}
            </label>
          ))}
          <button type="submit" className="check-button">
            Check Answer
          </button>
        </form>
        <Link to='/'><h4>Go To Home</h4></Link>
        <p>{message}</p>
      </div>
    );
  }     
}

export default MathGame;
