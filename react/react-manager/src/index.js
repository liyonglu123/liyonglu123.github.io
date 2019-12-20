import React from 'react';
import ReactDOM from 'react-dom';
// 引入路由
import getRouter from './router/router';
// import {Provider} from 'react-redux';  // 让所有的组件可以访问到store。不用手动去传。也不用手动去监听；

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    getRouter(),
document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
