/* eslint-disable */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './component/Header';
import Summary from './component/firstPage/Summary';
import Slidemenu from './component/Slidemenu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FuncApp from './component/secondPage/FuncApp';

function App() {
   const [test, setTest] = useState('')

    useEffect(() => {
        axios.get('/test')
        .then(response => setTest(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <BrowserRouter>
            <Header >
                <Slidemenu/>
            </Header>
            <Routes>
                <Route path='/' element={<Summary/>}/>
                <Route path='/func' element={<FuncApp />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;