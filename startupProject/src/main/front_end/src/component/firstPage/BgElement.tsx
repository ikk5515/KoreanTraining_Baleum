import React from "react";
import './BgElement.css';

type styleV = {
    height: string;
    display: string;
}

export default function BgElement({height, display}: styleV){
    return(
        <div className='bge' >
            <div className='dot1 dot'></div>
            <div className='dot2 dot' style={{display : display}}></div>
            <div className='dot3 dot'></div>
            <div className='rain1 rain' style={{height : height}}></div>
            <div className='rain2 rain'></div>
            <div className='rain3 rain'></div>
        </div>
    )
}