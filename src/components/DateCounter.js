import { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case 'dec':
      return { ...state, count: state.count - 1 }
    case 'inc':
      return { ...state, count: state.count + 1 }
    case 'setCount':
      return { ...state, count: action.payload }
    case 'setStep':
      return { ...state, step: action.payload }
    case 'reset':
      return { count: 0, step: 1 }
    default:
      throw new Error("Unknown action")
  }
  // console.log(state, action);
  // if (action.type === "dec") return state - action.payload;
  // if (action.type === "inc") return state + action.payload;
  // if (action.type === "setCount") return action.payload;
  // if (action.type === "reset") return 0; // Reset state to 0
  // return state;
}

function DateCounter() {
  // const [step, setStep] = useState(1);
  const intialState = { count: 0, step: 1 }
  const [state, dispatch] = useReducer(reducer, intialState);
  const { count, step } = state;


  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: step });
  };

  const inc = function () {
    dispatch({ type: "inc", payload: step });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));\
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
    // setStep(1); // Also reset the step to 1
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;
