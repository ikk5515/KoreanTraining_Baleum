import React from 'react';
import './Category.css';
import data from '../../jData/categoryData.json';
import FuncApp from '../secondPage/FuncApp';
import {NavLink} from 'react-router-dom';
import { useState } from 'react';

export default function Category(){
    const [hover, setHover] = useState([0, 0, 0, 0, 0]);

    function ChangeHover(s : any, index : any){
        hover[index] = s;
        setHover([...hover]);
    }

    return(
        <>
        <div className='cateWrap'>
            <div className='blueCircle'></div>
            <div className='textArea'>
                <h1>Check your pronunciation skills!</h1>
                <p>BBALKING</p>
                <p>provides you with various text for grading.</p>
                <p>Choose the theme you want!</p>
            </div>
            <ul>
                {data.property.map((item : any, index : any) => (
                    <NavLink className={'navLink'} to='func' >
                        <li key={item.id} 
                        onMouseOver={()=>{ChangeHover(1, index)}} onMouseOut={()=>{ChangeHover(0, index)}}
                        style={
                            hover[index] ? {
                                backgroundColor : '#6BB3F2',
                                transition : '0.5s',
                            } : {
                                transition : '0.5s',
                            }
                        }
                        >
                            <p style={
                            hover[index] ? {
                                transition : '0.5s',
                                fontSize : '0.8em',
                            } : {
                                transition : '1s',
                                fontSize : '1.75em',
                            }
                            }>
                                {item.title}
                            </p>
                            <span style={
                                hover[index] ? {
                                    transition : '0.5s',
                                    fontSize : '4em',
                                    bottom : '0px',
                                    right : '6.5vw',

                                } : {
                                    transition : '1s',
                                    fontSize : '1.75em',
                                    bottom : '-1vh',
                                    right : '1vw',
                                }   
                            }>▶</span>
                        </li>
                    </NavLink>
                ))}
            </ul>
        </div>
        </>
    )
}