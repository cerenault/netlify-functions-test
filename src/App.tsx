import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState(null);
    const fetchData = async () => {
        const res = await axios.get('/.netlify/functions/functionsTest', {
            headers: {
                security: process.env.REACT_APP_FUN_TOKEN as string,
            },
            data: {
                foo: 'bar',
            },
        });
        console.log(res.data.message);
    };

    const fetchHelloWorld = async () => {
        const res = await axios.get('/hello');
        if (res?.data?.message) setMessage(res.data.message);
    };

    useEffect(() => {
        fetchData();
        fetchHelloWorld();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>{message}</p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
