import React from 'react';

export default function StartScreen({numQuestions,dispatch}) {  // Corrected component name
  return (
    <div className='start'>
      <h2>Welcome to React Quiz!!</h2>
      <h3>{numQuestions} Questions to test your mastery</h3> {/* Corrected typo */}
      <button className='btn btn-ui' onClick={()=>dispatch({type:"start"})}>Start</button>
    </div>
  );
}
