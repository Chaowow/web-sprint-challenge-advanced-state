import { SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from "./action-types"
import axios from "axios";

// ❗ You don't need to add extra action creators to achieve MVP
export const moveClockwise = () => ({
  type: MOVE_CLOCKWISE,
});

export const moveCounterClockwise = () => ({
  type: MOVE_COUNTERCLOCKWISE,
});

export function selectAnswer() { }

export function setMessage() { }

export function setQuiz() { }

export function inputChange() { }

export function resetForm() { }

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


export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
