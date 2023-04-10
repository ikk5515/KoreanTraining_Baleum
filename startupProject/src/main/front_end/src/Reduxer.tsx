import React, {useState} from 'react';

export default function Reduxer(){
    const [hover, setHover] = useState([0, 0, 0, 0, 0]);

    function ChangeHover(s : any, index : any){
        hover[index] = s;
        setHover([...hover]);
    }
}