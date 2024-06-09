import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './styles.css';

import { ContextProvider } from './SocketContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ContextProvider><App /></ContextProvider>);
