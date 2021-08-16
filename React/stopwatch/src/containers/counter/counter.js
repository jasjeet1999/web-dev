import { useState } from "react";

function Counter(){
    const[count1, setCount1] = useState(0);
    const[count2, setCount2] = useState(0);
    return(
        <div>
            <h1>{count1 + "," + count2}</h1>
            <button onClick = {() =>setCount1(0)}>Reset1</button>
            <button onClick = {() => setCount1(count1 + 1)}>+1</button>
            <button onClick = {() => setCount1(count1 - 1)}>-1</button>

        </div>
    )
}
export default Counter;