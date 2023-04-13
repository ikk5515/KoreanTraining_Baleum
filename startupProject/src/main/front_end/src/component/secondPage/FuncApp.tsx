import React from 'react';
import Recoder from './Recorder';
import FuncList from './FuncList';
import './FuncApp.css'
import DataView from './DataView';

export default function FuncApp(){
    return(
        <div className='funcAppWrap'>
            <FuncList />
            <DataView/>
        </div>
    )
}