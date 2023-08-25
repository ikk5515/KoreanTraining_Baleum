/* eslint-disable */
import React, {useState, useEffect} from 'react';
import FuncList from './FuncList';
import BgElement from '../firstPage/BgElement';
import './FuncApp.css'
import {useLocation} from "react-router-dom";
import axios from "axios";

function FuncApp(){
    const location = useLocation();
    const hover = location.state.value;
    const [hoverState, setHoverState] = useState<number[]>([...hover]);
    const [click, setClick] = useState<number[]>([]);
    const [dbData, setDBdata] = useState<string[]>([]);
    const [parsedObj, setParsedObj] = useState<{ id?: number, script?: string }[]>([]);
    useEffect(() => {
        setClick(hoverState);
    }, [click]);

    function ChangeClick(index : number){
        click[index] = click[index] ? 0 : 1;
        for(let i=0; i<click.length; i++){
            if(i !== index){
                click[i] = 0;
            }
        }
        setClick([...click]);
    }

    const stateAndSet = {dbData, setDBdata};

    useEffect(() => {
        if (click[0]) {
            axios.get('https://kr-training.shop/api/daily')
                .then(response => setDBdata(response.data))
                .catch(error => console.log(error))
        }
    }, [click[0]]);
    useEffect(() => {
        if (click[1]) {
            axios.get('https://kr-training.shop/api/business')
                .then(response => setDBdata(response.data))
                .catch(error => console.log(error))
        }
    }, [click[1]]);
    useEffect(() => {
        if (click[2]) {
            axios.get('http://localhost:8080/api/movie')
                .then(response => setDBdata(response.data))
                .catch(error => console.log(error))
        }
    }, [click[2]]);
    useEffect(() => {
        if (click[3]) {
            axios.get('http://localhost:8080/api/drama')
                .then(response => setDBdata(response.data))
                .catch(error => console.log(error))
        }
    }, [click[3]]);

    const tempArr = new Array(dbData.length);
    useEffect(()=>{
        tempArr.length = 0;
        dbData.map((item)=>{
            parsingDbData(item);
        })
        setParsedObj(tempArr);
    }, [dbData]);

    function parsingDbData(s:string) {
        const idMatch = s.match(/NO=(\w+)/i)?? undefined; // 문자열에서 숫자만 추출
        const id = idMatch ? parseInt(idMatch[1]) : undefined;
        const scriptIndex = s.search(/(DA|Bu|Mo|DR)script=[^)]+\)/i); // 'DSCRIPT='이 시작되는 인덱스
        const script = scriptIndex !== -1 ? s.substring(scriptIndex + 9, s.length - 1) : ''; // 'DSCRIPT=' 다음 문자열부터 끝에서 2번째 문자열까지 추출
        const scriptObject = { id, script };
        tempArr.push(scriptObject);
    }


    // @ts-ignore
    return(
        <div className='funcAppWrap'>
            <FuncList click={click} ChangeClick={ChangeClick} data={parsedObj}/>
            {/*<DataView/>*/}
            <BgElement height={'500px'} display={'none'}/>
        </div>
    )
}

const areEqual = (prevProps: {parsedObj:{ id?: number, script?: string }}, nextProps: {parsedObj:{ id?: number, script?: string }}) => {
    return(
        JSON.stringify(prevProps.parsedObj) === JSON.stringify(nextProps.parsedObj)
    )
}

export default React.memo(FuncApp, areEqual);