import React from 'react';
import Category from './Category';
import './Summary.css';
import BgElement from "./BgElement";
import logo from '../../img/logo.png';

export default function Summary(){

    return(
        <>
            <section>
                <div className='cWrap'>
                    <div className='logoWrap'>
                        <img src={logo}/>
                        <p>Baleum.</p>
                    </div>
                    <div className='pWrap'>
                        <p>LEARN</p>
                        <p>YOUR</p>
                        <p>CONFIDENT</p>
                        <p>PRONUNCIATION</p>
                    </div>
                </div>
                <BgElement height={''} display={''}/>
            </section>
            <Category/>
        </>
    )
}