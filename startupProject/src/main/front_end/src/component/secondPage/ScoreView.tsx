import React, {useEffect, useState} from 'react';
import './ScoreView.css';
import axios from "axios";
// @ts-ignore

export default function ScoreView(props:{setShowScore}){
    const [count, setCount] = useState<number>(0);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        let currentNumber = 0;
        const interval = setInterval(() => {
            if (currentNumber >= score) {
                clearInterval(interval);
            } else {
                currentNumber += 0.1;
                setCount(Number(currentNumber.toFixed(1)));
            }
        }, 35);
        return () => clearInterval(interval);
    }, [score]);

    useEffect(() => {
        axios.post('http://localhost:8080/upload')
            .then(response => setScore(parseFloat(response.data)))
            .catch(error => console.log(error))
    }, [])

    function hideScore(){
        props.setShowScore(false);
    }

    return(
        <div className='scoreWrap'>
            <div className='scoreContent'>
                <div className='scTx'>
                    <p>Good Score~</p>
                    <p>just do it like now!</p>
                    <p>{count}</p>
                </div>
                <button onClick={hideScore}>Try again</button>
                <div className='wave'></div>
                <div className='wave'></div>
                <div>
                    <div className='square sq1'></div>
                    <div className='square sq2'></div>
                    <div className='square sq3'></div>
                    <div className='square sq4'></div>
                </div>
            </div>
        </div>
    )
}