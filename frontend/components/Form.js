import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Form(props) {
  const { newQuestion, newTrueAnswer, newFalseAnswer, inputChange, postQuiz } = props;

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Check if all input fields have values more than one character in length
    const isValid = newQuestion.trim().length > 1 && newTrueAnswer.trim().length > 1 && newFalseAnswer.trim().length > 1;
    setIsButtonDisabled(!isValid);
  }, [newQuestion, newTrueAnswer, newFalseAnswer]);

  const onChange = evt => {
    const { id, value } = evt.target;
    inputChange(id, value);
  };

  const onSubmit = evt => {
    evt.preventDefault();
    console.log('Submitting form:', newQuestion, newTrueAnswer, newFalseAnswer);
    postQuiz(newQuestion, newTrueAnswer, newFalseAnswer);
  };
  

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={newFalseAnswer} />
      <button id="submitNewQuizBtn" disabled={isButtonDisabled}>Submit new quiz</button>
    </form>
  );
}

const mapStateToProps = state => ({
  newQuestion: state.form.newQuestion,
  newTrueAnswer: state.form.newTrueAnswer,
  newFalseAnswer: state.form.newFalseAnswer,
});

export default connect(mapStateToProps, actionCreators)(Form);
