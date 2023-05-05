import React, {useRef, useState} from 'react';
import FuncList from './FuncList';
import BgElement from '../firstPage/BgElement';
import './FuncApp.css'
import DataView from './DataView';


export default function FuncApp(){

    const [click, setClick] = useState([0, 0, 0, 0, 0]);
    const hSetting = useRef<HTMLDivElement>(null);

    function ChangeClick(index : number){
        click[index] = click[index] ? 0 : 1;
        for(let i=0; i<click.length; i++){
            if(i !== index){
                click[i] = 0;
            }
        }
        console.log(click);
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