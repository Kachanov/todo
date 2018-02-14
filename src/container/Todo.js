import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {showAll, request, showCurrent, showDone, doneTodo, deleteTodo, addTodo} from "../actions/todo.action";


export class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.navButtons = [
            {
                className: "currentTodos",
                title: "CURRENT",
                onClick: this.showCurrentTodos
            },
            {
                className: "doneTodos",
                title: "DONE",
                onClick: this.showDoneTodos
            },
            {
                className: "allTodos",
                title: "ALL",
                onClick: this.showAllTodos
            }
        ];
    }

    componentDidMount() {
        this.props.request();
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
    };


    handleReady = (item) => {
        const index = item.id;
        this.props.doneTodo(index);
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


    render() {
        console.log(this.props.store.todoArray);
        return(
            <div>
                <h2>TODO APP</h2>
                <input onChange={this.handleChange} className="input" id="input" onKeyUp={this.handleEnter} />
                <button onClick={this.handleClick} className="addButton" id="addButton">Add</button>
                <div className="todoList">{
                    this.props.store.todoArray.filter(this.props.store.currentFilter)
                        .map( (item) => {
                        if(item.done === true){
                            return <div className="crossOut" key={item.id}>{this.showTodo(item)}</div>
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
                <div className="navigation" id="navigation">
                    {this.navButtons.map( (button) => {
                        if(this.props.store.currentFilter.name === button.className){
                            return <p className={[button.className, "highlight"].join(" ")} onClick={button.onClick} key={button.className}>{button.title}</p>
                        }

                        return <p className={button.className} onClick={button.onClick} key={button.className}>{button.title}</p>
                    })}

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
        showAll: showAll,
        request
    }, dispatch)
)(Todo);