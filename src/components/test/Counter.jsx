import {useState} from "react";

export default function Counter () {
    const [count, setCount] = useState(0);
    const [incrementBy, setIncrementBy] = useState(1);

    function increment () {
        setCount(count + incrementBy);
    }
    function decrement() {
        setCount(count - incrementBy);
    }
    function increaseIncrement() {
        setIncrementBy(incrementBy + 1);
    }

    function decreaseIncrement() {
        setIncrementBy(incrementBy - 1);
    }
    return <div>
        Counter value is: {count}<br/>
        <button onClick={increment}>Increment</button><br />
        <button onClick={decrement}>Decrement</button>

        <h1>We are incrementing the value by: {incrementBy} </h1>
        <button onClick={increaseIncrement}>Increase increment by</button>
        <button onClick={decreaseIncrement}>Decrease increment by</button>
        </div>;
}