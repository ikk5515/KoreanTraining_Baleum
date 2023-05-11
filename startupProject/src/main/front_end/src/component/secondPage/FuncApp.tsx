/* eslint-disable */
import React, {useState, useEffect} from 'react';
import FuncList from './FuncList';
import BgElement from '../firstPage/BgElement';
import './FuncApp.css'
import DataView from './DataView';
import {useLocation} from "react-router-dom";
import axios from "axios";

// 프론트에서 클릭값을 백으로 넘겨주면 그에 맞는 데이터를 배열로 프로트로 보내줌
// 즉 모든 카테고리의 데이터를 보내느 것이 아님
// 클릭 값을 보낸다 -> 백에서 해당 데이터베이스를 select해서 프로트트로 문자배열로 전달한다
// -> 받은 데이터로 subDataList의 값을 useEffect로 변경하여 랜더링한다.

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
            axios.get('http://localhost:8080/api/daily')
                .then(response => setDBdata(response.data))
                .catch(error => console.log(error))
        }
    }, [click[0]]);
    useEffect(() => {
        if (click[1]) {
            axios.get('http://localhost:8080/api/business')
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

    console.log(dbData);

    const tempArr = new Array(dbData.length);
    useEffect(()=>{
        tempArr.length = 0;
        dbData.map((item)=>{
            parsingDbData(item);
        })
        setParsedObj(tempArr);
    }, [dbData]);

    console.log(parsedObj);

    function parsingDbData(s:string) {
        const idMatch = s.match(/NO=(\w+)/i)?? undefined; // 문자열에서 숫자만 추출
        const id = idMatch ? parseInt(idMatch[1]) : undefined;
        const scriptIndex = s.search(/(DA|Bu|Mo|DR)script=[^)]+\)/i); // 'DSCRIPT='이 시작되는 인덱스
        const script = scriptIndex !== -1 ? s.substring(scriptIndex + 9, s.length - 1) : ''; // 'DSCRIPT=' 다음 문자열부터 끝에서 2번째 문자열까지 추출
        const scriptObject = { id, script };
        tempArr.push(scriptObject);
    }




    parsedObj.map((item, i)=> {
        console.log(`분해된 데이터 ${i+1} = id: ${item.id}, script: ${item.script}`);
    })


    // @ts-ignore
    return(
        <div className='funcAppWrap'>
            <FuncList click={click} ChangeClick={ChangeClick} data={parsedObj}/>
            {/*<DataView/>*/}
            <BgElement height={'500px'} display={'none'}/>
        </div>
    )
}

export default FuncApp;