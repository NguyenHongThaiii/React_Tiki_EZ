import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

function CounterFeature(props) {
  const count = useSelector((state) => state.count);
  // const [stateElement,setState] = useState(count)
  // console.log(stateElement);
  console.log(count);
  const dispatch = useDispatch();
  const handelIncrease = () => {
    const action = increase(123); //trong () là payload
    console.log(action);
    dispatch(action);
  };
  const handelDecrease = () => {
    const action = decrease(); //trong () là payload
    console.log(action);
    dispatch(action);
  };
  return (
    <div>
      Counter Feature: {count}
      <div>
        <button onClick={handelIncrease}>Increase</button>
        <button onClick={handelDecrease}>Decrease</button>
      </div>
    </div>
  );
}
// const count = useSelector((state) => state.count);
// const count2 = (state) => state.count;
export default CounterFeature;
