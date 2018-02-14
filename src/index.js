import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import Todo from "./container/Todo"
import {todoList} from "./reducers";
import './index.css';

const middleware = (store) => (next) => (action) => {
    console.log(action.type);
    if(action.url) {
        next({type: 'REQUEST'});

        fetch(action.url)
            .then(response => response.json())
            .then(response => next({type: "SUCCESS", data: response}))
            .catch(e => {
                next({type: "FAILURE", data: e});
            })
    }else{
        next(action);
    }
};


const store = createStore(todoList, applyMiddleware(middleware));

ReactDOM.render(
    <Provider store={store}>
        <Todo/>
    </Provider>,
    document.getElementById('root')
);


