import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";

// Initial state
const initialState = {
  questions: [],
  status: 'loading',  // ['loading', 'error', 'ready', 'active', 'finished']
  index: 0,
  answer: null,
  points: 0,
};
console.log();

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return { ...state, status: 'active' };
    case 'newAnswer':
      const question = state.questions[state.index];
      const correct = action.payload === question.correctOption;
      return { 
        ...state, 
        answer: action.payload, 
        points: correct ? state.points + question.points : state.points 
      };
    case 'nextQuestion':
        return { ...state,index:state.index+1,answer:null };
    case 'finish':
      return{
        ...state,
        status:"finished",
        highscore:
        state.points>state.highscore?state.points:
        state.highscore,
      }
     
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  // Fetch data from API
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
            <Question 
              question={questions[index]} 
              dispatch={dispatch} 
              answer={answer} 
            />
            {answer !== null && <NextButton dispatch={dispatch} index={index} numQuestions={numQuestions} />} 
          </>
        )}
        {status === 'finished' && (
          <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} />
        )}
      </Main>
    </div>
  );
}
