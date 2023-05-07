/* eslint-disable */
import React, {useState, useEffect} from 'react';
import FuncList from './FuncList';
import BgElement from '../firstPage/BgElement';
import './FuncApp.css'
import DataView from './DataView';
import {useLocation} from "react-router-dom";

export default function FuncApp(){
    const location = useLocation();
    const hover = location.state.value;
    const [hoverState, setHoverState] = useState<number[]>([]);
    const [click, setClick] = useState<number[]>([]);

    useEffect(() => {
        if (hover) {
            setHoverState(hover);
        }
    }, []);

    useEffect(() => {
        setClick(hoverState);
    }, [click]);

    function ChangeClick(index : number){
        click[index] = click[index] ? 0 : 1;
        for(let i=0; i<click.length; i++){
            if(i !== index){
                click[i] = 0;
            }
        }
        setClick([...click]);
    }

    // @ts-ignore
    return(
        <div className='funcAppWrap'>
            <FuncList click={click} ChangeClick={ChangeClick}/>
            {/*<DataView/>*/}
            <BgElement height={'500px'} display={'none'}/>
        </div>
    )
}