import React from 'react';
import Recoder from './Recorder';
import FuncList from './FuncList';

export default function FuncApp(){
    return(
        <div className='funcAppWrap'>
            <FuncList />
            <Recoder />
        </div>
    )
}