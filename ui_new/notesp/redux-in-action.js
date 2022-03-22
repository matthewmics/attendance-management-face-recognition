import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, setCounter } from "../actions";

export const App = () => {
  const counter = useSelector((state) => state.counter);
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter {counter}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(setCounter(5))}>set counter</button>
      {isLogged ? <h3>Valuable information here!</h3> : ""}
    </div>
  );
};
