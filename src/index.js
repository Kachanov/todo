import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore} from "redux";
import Todo from "./container/Todo"
import {todoList} from "./reducers";
import './index.css';

const store = createStore(todoList);

ReactDOM.render(
    <Provider store={store}>
        <Todo/>
    </Provider>,
    document.getElementById('root')
);


