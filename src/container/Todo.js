import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addTodo} from "../actions/todo.action";
import {deleteTodo} from "../actions/todo.action";
import {doneTodo} from "../actions/todo.action";
import {showDone} from "../actions/todo.action";
import {showCurrent} from "../actions/todo.action";
import {showAll} from "../actions/todo.action";

export class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {item: props.value, todoArray: props.store.todoArray, currentFilter: props.store.currentFilter, status: false, all: false};
    }

    handleChange = (event) => {
        event.target.value.toUpperCase();
    };

    addTodo() {
        const input = document.getElementById("input");
        if(input.value) {
            this.props.addTodo(input.value);
        }

        input.value = "";
        console.log(this.props.store);
    }

    handleClick = (event) => {
        this.addTodo();
    };

    handleEnter = (event) => {
        if(event.keyCode === 13){
            this.addTodo();
        }
    };

    handleDelete = (item) => {
        let index = item.id;
        this.props.deleteTodo(index);
        console.log(this.props.store);
    };


    handleReady = (item) => {
        const index = item.id;
        this.props.doneTodo(index);
        console.log(this.props.store);
    };

    showCurrentTodos = () => {
        this.props.showCurrent();
    };

    showDoneTodos = () => {
        this.props.showDone();
    };

    showAllTodos = () => {
        this.props.showAll();
    };

    showTodo = (item) => {
        const maxLength = 18;

        if(item.value.length > maxLength) {
            return <div>{item.value.slice(0, maxLength - 3) + "..."}</div>
        }
        return <div>{item.value}</div>
    };

    /*toggleNavigation = (event) => {
        let target = event.target;

        while(target !== this) {
            if(target.tagName === "P") {
                highlight(target);
                return;
            }
            target = target.parentNode;
        }

        function highlight(node) {
            if(selectedItem) {
                selectedItem.classList.remove("highlight");
            }
            selectedItem = node;
            selectedItem.classList.add("highlight");
        }

    };
*/



    render() {
        console.log("RENDER");
        return(
            <div>
                <h2>TODO APP</h2>
                <input onChange={this.handleChange} className="input" id="input" onKeyUp={this.handleEnter} />
                <button onClick={this.handleClick} className="addButton" id="addButton">Add</button>
                <div className="todoList">{
                    this.props.store.todoArray.filter( (item) => {
                        //return item.done === this.props.store.currentFilter
                        if(this.props.store.currentFilter === "current") {
                            return item.done === false;
                        }

                        if(this.props.store.currentFilter === "done") {
                            return item.done === true;
                        }

                        if(this.props.store.currentFilter === "all") {
                            return item.done === false || item.done === true
                        }

                        }
                    ).map( (item) => {
                        if(item.done === true){
                            return <div className="crossOut">{this.showTodo(item)}</div>
                        }else{
                            return <div className="todoItem" key={item.id} id="todoItem">
                                {this.showTodo(item)}
                                <div className="todoControlButtons">
                                    <div className="readyButton" onClick={() => {
                                        this.handleReady(item);
                                    }}>
                                        ✓
                                    </div>
                                    <div className="deleteButton" onClick={() => {
                                        this.handleDelete(item);
                                    }}>
                                        X
                                    </div>
                                </div>
                            </div>
                        }})
                }</div>
                <div className="navigation" onClick={this.toggleNavigation}>
                    <p className="currentTodos" onClick={() => {
                        this.showCurrentTodos();
                    }}>
                        CURRENT
                    </p>
                    <p className="doneTodos" onClick={() => {
                        this.showDoneTodos();
                    }}>
                        DONE
                    </p>
                    <p className="allTodos" onClick={() => {
                        this.showAllTodos();
                    }}>
                        ALL
                    </p>
                </div>
            </div>
        );
    }

}

export default connect(
    state => ({
        store: state
    }),
    dispatch => bindActionCreators({
        addTodo: addTodo,
        deleteTodo: deleteTodo,
        doneTodo: doneTodo,
        showDone: showDone,
        showCurrent: showCurrent,
        showAll: showAll
    }, dispatch)
)(Todo);