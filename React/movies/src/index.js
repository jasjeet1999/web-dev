import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);