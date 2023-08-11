import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchQuiz, postAnswer, setSelectedAnswer } from '../state/action-creators';
import Message from './Message';

function Quiz(props) {
  const { quiz, fetchQuiz, postAnswer, selectedAnswer } = props;

  useEffect(() => {
    if (!quiz) {
      fetchQuiz();
    }
  
    if (selectedAnswer !== null) {
      handleAnswerSelection(selectedAnswer);
    }
  }, [fetchQuiz, selectedAnswer]);

  const dispatch = useDispatch();

  const handleAnswerSubmit = e => {
    e.preventDefault();
    if (selectedAnswer !== null) {
      const { quiz_id } = quiz; 
      postAnswer(quiz_id, selectedAnswer);
    }
  };
  
  

  const handleAnswerSelection = (answerId) => {
    dispatch(setSelectedAnswer(answerId));
  };

  if (!quiz) {
    return 'Loading next quiz...';
  }

  return (
    <div id="wrapper">
       <Message message={props.infoMessage} />
      <h2>{quiz.question}</h2>
      <div id="quizAnswers">
        {quiz.answers.map(answer => (
          <div className={`answer ${selectedAnswer === answer.answer_id ? 'selected' : ''}`} key={answer.answer_id}>
            {answer.text}
            <button onClick={() => handleAnswerSelection(answer.answer_id)}>
              {selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}
            </button>
          </div>
        ))}
      </div>
      <button
        id="submitAnswerBtn"
        onClick={handleAnswerSubmit}
        disabled={selectedAnswer === null}
      >
        Submit answer
      </button>
    </div>
  );
}

const mapStateToProps = state => ({
  quiz: state.quiz,
  selectedAnswer: state.selectedAnswer,
  infoMessage: state.infoMessage
});

const mapDispatchToProps = {
  fetchQuiz,
  postAnswer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
