import React from 'react';

export default function Option({ question, dispatch, answer }) {
    const hasAnswered=answer!==null
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${hasAnswered?index===question.correctOption?'correct':'wrong':""}`}
          disabled={answer!==null}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
