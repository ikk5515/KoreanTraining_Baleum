/* eslint-disable */
import React, { useState } from 'react';
import './FuncList.css';
import data from '../../jData/categoryData.json';

export default function FuncList(){

    const [hover, setHover] = useState([0, 0, 0, 0, 0]);
    const [click, setClick] = useState([0, 0, 0, 0, 0]);

    function ChangeHover(s : number, index : number){
        hover[index] = s;
        setHover([...hover]);
    }

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

    function pStyle(i : number){
        let obj = {
            transition: '0.5s',
            color: hover[i] || click[i] ? 'white' : '#0554F2',
        }
        return obj;
    }

    function spanStyle(i : number){
        let obj = {
            transition: '0.5s',
            height: hover[i] || click[i] ? '100%' : '1px',
        }
        return obj;
    }

    return(
        <div className='listWrap'>
            <ul>
                {data.property.map((item : any, i : number) => (
                    <li key={item.id}  onMouseOver={()=>{ChangeHover(1, i)}} onMouseOut={() => ChangeHover(0, i)}
                    onClick={()=>ChangeClick(i)}>
                        <p style={pStyle(i)}>{item.title}</p>
                        <span style={spanStyle(i)}></span>
                    </li>
                ))}
            </ul>
        </div>
    )
}