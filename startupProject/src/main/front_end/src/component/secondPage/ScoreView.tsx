import React, {useEffect, useState} from 'react';
import './ScoreView.css';
import axios from "axios";
import PartLoading from "./Animation/PartLoading";
// @ts-ignore

export default function ScoreView(props:{ChangeScClick:any, setShowScore, score:number}){
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [showContent, setShowContent] = useState<boolean>(false);
    const [scoreText, setScoreText] = useState<string>('');
    const [scoreDescription, setScoreDescription] = useState<string>('');

    useEffect(() => {
        let currentNumber = 0;
        const interval = setInterval(() => {
            if (currentNumber >= props.score) {
                clearInterval(interval);
            } else {
                currentNumber += 0.01;
                setCount(Number(currentNumber.toFixed(2)));
            }
        }, 1);
        return () => clearInterval(interval);
    }, [props.score]);
    useEffect(() => {
        setLoading(props.score === -1 || props.score === undefined);
        const timeout = setTimeout(() => {
            setShowContent(true);
        }, 1500);
        return () => clearTimeout(timeout);
    }, [props.score]);
    useEffect(() => {
        changeScoreText();
        changeScoreDescription();
    }, [props.score]);

    function changeScoreText() {
        let txt = props.score >= 3.5 ?
            'Good Score~ 🤩' : 3.5 > props.score && props.score >= 2 ?
                'Average Score~  🙂' : 2 > props.score && props.score >= 0.5 ?
                    'Low Score~ 😱' : '☠️ RIP ☠️'
        setScoreText(txt);
    }

    function changeScoreDescription() {
        let txt = props.score >= 3.5 ?
            'just do it like now!' : 3.5 > props.score && props.score >= 2 ?
                "That's a pretty good score~" : 2 > props.score && props.score >= 0.5 ?
                    "I think you're kind of the worst..." : "If it's not an error, you're a stone"
        setScoreDescription(txt);
    }

    return(
        <div className='scoreWrap'>
            {loading ? (
                <PartLoading />
            ) : (
                <>
                    {showContent && (
                        <div className='scoreContent'>
                            <div className='scTx' >
                                <p>{scoreText}</p>
                                <p>{scoreDescription}</p>
                                <p>{count}</p>
                            </div>
                            <button onClick={props.ChangeScClick}>Go back</button>
                            <div className='wave'></div>
                            <div className='wave'></div>
                            <div>
                                <div className='square sq1'></div>
                                <div className='square sq2'></div>
                                <div className='square sq3'></div>
                                <div className='square sq4'></div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}