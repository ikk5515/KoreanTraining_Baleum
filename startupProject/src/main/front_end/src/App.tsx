import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './component/Header';
import Summary from './component/firstPage/Summary';
import Slidemenu from './component/Slidemenu';
import Category from './component/Category';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FuncApp from './component/FuncApp';

function App() {
    // eslint-disable-next-line
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