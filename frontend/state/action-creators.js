import { 
  SET_QUIZ_INTO_STATE, 
  SET_SELECTED_ANSWER, 
  SET_INFO_MESSAGE, 
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  RESET_FORM, 
  INPUT_CHANGE } from "./action-types"
import axios from "axios";

// ❗ You don't need to add extra action creators to achieve MVP
export const moveClockwise = () => ({
  type: MOVE_CLOCKWISE,
});

export const moveCounterClockwise = () => ({
  type: MOVE_COUNTERCLOCKWISE,
});

export const selectAnswer = () => ({
  type: SET_SELECTED_ANSWER
 })

export const setMessage = () => ({
  type: SET_INFO_MESSAGE
 })

export const setQuiz = () => ({
  type: SET_QUIZ_INTO_STATE
 })

export const inputChange = (fieldName, payload) => ({
  type: INPUT_CHANGE,
  fieldName,
  payload,
});


export const resetForm = () => ({
  type: RESET_FORM
 })

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state

    dispatch({ type: SET_QUIZ_INTO_STATE, payload: null });

    axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {
      dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data })})
    .catch(err => console.error(err));
  };
}

export function postAnswer( quizId, answerId) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post('http://localhost:9000/api/quiz/answer', { quiz_id: quizId, answer_id: answerId} )
    .then(res => {
      dispatch({ type: SET_SELECTED_ANSWER, payload: null });
      dispatch({ type: SET_INFO_MESSAGE, payload: res.data.message});
      dispatch(fetchQuiz());
    })
    .catch(err => console.error(err.res));
  };
}

export function setSelectedAnswer(answerId) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: answerId,
  };
}


export function postQuiz(questionText, trueAnswerText, falseAnswerText) {
  return function (dispatch) {
    console.log('postQuiz action creator dispatched');
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post('http://localhost:9000/api/quiz/new', { 
    question_text: questionText, 
    true_answer_text: trueAnswerText, 
    false_answer_text: falseAnswerText })
    .then( res => {
      console.log('Successful API response:', res.data);
      dispatch({ type: SET_INFO_MESSAGE, payload: `Congrats: "${questionText}" is a great question!` })
      dispatch({ type: RESET_FORM })
    })
    .catch(err => console.log(err.message));
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
