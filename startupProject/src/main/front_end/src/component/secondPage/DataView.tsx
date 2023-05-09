import React, {useEffect, useState} from 'react';
import './DataView.css';
import Recorder from './Recorder';
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;

export default function DataView(props:{scClick:number[], ChangeScClick:any, data:{ id?: number, script?: string }[]}){
    const [hover, setHover] = useState(0);
    const [xclick, setxclick] = useState(0);

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
    return(
        <div className='viewWrap'>
            <div className='view'>
                <div className='xWrap' onMouseOver={handleXicon} onMouseDown={handleXicon} onClick={props.ChangeScClick}>
                    <span className='x1' style={xStyle()}></span>
                    <span className='x2' style={xStyle()}></span>
                </div>
                <Recorder/>
            </div>
        </div>
    )
}