import React from 'react';
import Category from './Category';
import './Summary.css';
import BgElement from "./BgElement";
import logo from '../../img/logo.png';

export default function Summary(){

    return(
        <>
        <section>
            <div className='textContent'>
                <h1>Speak with confidence!</h1>
                <div className='cWrap'>
                    <div className='logoWrap'>
                        <img src={logo}/>
                        <p>Baleum</p>
                    </div>
                    <div className='pWrap'>
                        <p>Learn</p>
                        <p>your</p>
                        <p>confident</p>
                        <p>pronunciation</p>
                    </div>
                </div>
            </div>
            <BgElement height={''} display={''} />
        </section>
        <Category/>
        </>
    )
}