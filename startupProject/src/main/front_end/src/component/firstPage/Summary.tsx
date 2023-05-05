import React from 'react';
import Category from './Category';
import './Summary.css';
import BgElement from "./BgElement";

export default function Summary(){

    return(
        <>
        <section>
            <div className='textContent'>
                <h1>Speak with confidence!</h1>
                <p>Learn your confident pronunciation with</p> <p>BBALKING.</p>
            </div>
            <BgElement height={''} display={''} />
        </section>
        <Category/>
        </>
    )
}