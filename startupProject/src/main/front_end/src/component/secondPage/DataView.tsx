import React from 'react';
import './DataView.css';
import Recorder from './Recorder';
import SubDataList from "./SubDataList";

export default function DataView(){

    return(
        <div className='viewWrap'>
            <div className='view'>
                <Recorder/>
            </div>
        </div>
    )
}