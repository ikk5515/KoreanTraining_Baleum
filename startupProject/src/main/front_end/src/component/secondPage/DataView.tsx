import React, {useEffect, useState} from 'react';
import './DataView.css';
import Recorder from './Recorder';

export default function DataView(props:{scClick:number[], ChangeScClick:any, data:{ id?: number, script?: string }[]}){
    const [hover, setHover] = useState(0);
    const [xclick, setxclick] = useState(0);

//     // test!!! ---------------------------------------------------
//     const testData = [
//         "오늘하루 고생많았어요. 내일봐요~!"
//     ]
// // test!!! ---------------------------------------------------

    const handleXicon = () => {
        const value = hover ? 0 : 1;
        setHover(value);
    }

    const xStyle = () => {
        let style = {
            transition : '0.5s',
            backgroundColor : hover ? 'black' : 'white',
        }
        return style;
    }

    function findeClickSc(e:number):boolean{
        if(e === 1) return true;
        return false;
    }
    // @ts-ignore
    const selectedSc:string = props.data[props.scClick.findIndex(findeClickSc)].script;

    return(
        <div className='viewWrap'>
            <div className='view'>
                <div className='xWrap' onMouseOver={handleXicon} onMouseDown={handleXicon} onClick={props.ChangeScClick}>
                    <span className='x1' style={xStyle()}></span>
                    <span className='x2' style={xStyle()}></span>
                </div>
                <div className='scDataView'>
                    <span>Let's Do it!</span>
                    <div className='scTxt'>
                        <p>{selectedSc}</p>
                        <p>[ 발음 텍스트 ]</p>
                    </div>
                </div>
                <Recorder scClick={props.scClick} ChangeScClick={props.ChangeScClick} data={props.data} selectedSc={selectedSc}/>
                <div className='se'></div>
                <div className='ce1'></div>
{/*
                <div className='ce2'></div>
*/}
            </div>
        </div>
    )
}