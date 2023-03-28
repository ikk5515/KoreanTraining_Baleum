import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './component/Header';
import Summary from './component/firstPage/Summary';
import Slidemenu from './component/Slidemenu';
import Category from './component/Category';

function App() {
    // eslint-disable-next-line
   const [test, setTest] = useState('')

    useEffect(() => {
        axios.get('/test')
        .then(response => setTest(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <div>
            <Header >
                <Slidemenu/>
            </Header>
            <Summary/>
            <Category/>
        </div>
    );
}

export default App;