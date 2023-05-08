import React from 'react';
import './DataView.css';
import Recorder from './Recorder';

export default function DataView(){

    return(
        <div className='viewWrap'>
            <div className='view'>
                <Recorder/>
            </div>
        </div>
    )
}