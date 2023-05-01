/* eslint-disable */
import React, { useState, createContext } from 'react';
import './FuncList.css';
import data from '../../jData/categoryData.json';
import SubDataList from "./SubDataList";

export default function FuncList(props:{click:number[], ChangeClick:any}){

    const [hover, setHover] = useState([0, 0, 0, 0, 0]);


    function ChangeHover(s : number, index : number){
        hover[index] = s;
        setHover([...hover]);
    }

    function pStyle(i : number){
        let obj = {
            transition: '0.5s',
            color: hover[i] || props.click[i] ? 'white' : '#0554F2',
        }
        return obj;
    }

    function spanStyle(i : number){
        let obj = {
            transition: '0.5s',
            height: hover[i] || props.click[i] ? '100%' : '1px',
        }
        return obj;
    }

    return(
        <div className='listWrap'>
            <ul className='funcList'>
                {data.property.map((item : any, i : number) => (
                    <li key={item.id}  onMouseOver={()=>{ChangeHover(1, i)}} onMouseOut={() => ChangeHover(0, i)}
                    onClick={()=>props.ChangeClick(i)}>
                        <p style={pStyle(i)}>{item.title}</p>
                        <span style={spanStyle(i)}></span>
                    </li>
                ))}
            </ul>
            <SubDataList click={props.click} ChangeClick={props.ChangeClick}/>
        </div>
    )
}