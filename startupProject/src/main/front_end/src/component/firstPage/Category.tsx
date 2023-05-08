/* eslint-disable */
import React from 'react';
import './Category.css';
import data from '../../jData/categoryData.json';
import {NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Category(){
    const [hover, setHover] = useState<number[]>(Array(data.property.length).fill(0));
    const nav = useNavigate();

    function ChangeHover(s : any, index : any){
        hover[index] = s;
        setHover([...hover]);
    }
    const clicked = () => {
        const paramHover = [...hover];
        nav('/func', {state: {value: paramHover}});
    }

    // const hoverProp: IsHover = {
    //     pathname: '/func',
    //     state: {hover: hover.length ? hover : undefined}
    // }

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
                {data.property.map((item : any, index : number) => (

                        <li key={item.id} onClick={clicked}
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
                            {
                                transition : '1s',
                                fontSize : '1.75em',
                            }
                            }>
                                {item.title}
                            </p>
                            <span style={
                                {
                                    transition : '1s',
                                    fontSize : '1.75em',
                                    bottom : '-1vh',
                                    right : '1vw',
                                }
                            }>▶</span>
                        </li>
                ))}
            </ul>
        </div>
        </>
    )
}