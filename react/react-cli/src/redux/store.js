import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import counter  from 'reducers/counter';
import userInfo  from 'reducers/userInfo';
// let store = createStore(counter);
// let store = createStore(combineReducers({counter, userInfo}));
let store = createStore(combineReducers({counter, userInfo}), applyMiddleware(thunkMiddleware));
// 维持应用的 state；
// 提供 getState() 方法获取 state；
// 提供 dispatch(action) 触发reducers方法更新 state；
// 通过 subscribe(listener) 注册监听器;
// 通过 subscribe(listener) 返回的函数注销监听器。

export default store;