import React, {useEffect, useState} from 'react';
import './ScoreView.css';
import axios from "axios";
import PartLoading from "./Animation/PartLoading";
import TTSView from "./TTSView";
// @ts-ignore

export default function ScoreView(props:{ChangeScClick:any, setShowScore, score:number, STT:string}){
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [showContent, setShowContent] = useState<boolean>(false);
    const [scoreText, setScoreText] = useState<string>('');
    const [scoreDescription, setScoreDescription] = useState<string>('');
    const [bfTop, setBfTop] = useState<number>(100);

    useEffect(()=>{
        const targetTop = Math.round(100 - (count / 5) * 100);
        const interval = setInterval(()=>{
            if(bfTop <= targetTop){
                clearInterval(interval);
            }else{
                setBfTop((prev) => prev - 1);
            }
        }, 1);
        return ()=>clearInterval(interval);
    }, [count]);

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

    const STTStyle = () => {
        let style = {
            color : props.STT[2] === 'O' || props.STT[2] === 'o'  ? 'red' : 'black'
        }
        return style;
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
                            </div>
                            <div className='flexWrap'>
                                <div className='scWrap'>
                                    <p>Got</p>
                                    <p>{count}</p>
                                    <p>Points</p>
                                    <div className='backFill'></div>
                                    <div className='backFill2' style={{ top: `${bfTop}%` }}></div>
                                </div>
                                <div className='sttWrap'>
                                    <div className='textBox'>
                                        <p className='sttp sp1'>You say</p>
                                        <p className='sttp sp2' style={STTStyle()}>
                                            {props.STT}
                                        </p>
                                        <p className='sttp sp3'>Are you satisfied?</p>
                                        <TTSView selectedSc={props.STT} />
                                    </div>
                                    <div className='wave'></div>
                                    <div className='wave'></div>
                                </div>
                            </div>
                            <button className='gobackBtn' onClick={props.ChangeScClick}>Go back</button>
                            <div className='bgCir cir1'></div>
                            <div className='bgCir cir2'></div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}