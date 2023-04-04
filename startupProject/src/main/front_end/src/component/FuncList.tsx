/* eslint-disable */
import React from 'react';
import './FuncList.css';
import data from '../jData/categoryData.json';

export default function FuncList(){
    return(
        <div className='listWrap'>
            <ul>
                {data.property.map((item : any, i : any) => (
                    <li key={item.id}>
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}