import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {item: props.value, todoArray: [], status: false};
        this.defaultTodoItem = {
            value: "",
            done: false,
            id: 0
        };
    }

    handleChange = (event) => {
        this.setState({item: event.target.value.toUpperCase()});
    };

    addTodo() {
        var input = document.getElementById("input");
        if(input.value) {
            this.setState({
                todoArray: [...this.state.todoArray,
                    {
                        ...this.defaultTodoItem,
                        value: input.value, id: this.defaultTodoItem.id++
                    }]
            });
        }

        console.log(this.state.todoArray);
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
        console.log(index);

        console.log(typeof this.state.todoArray);

        //this.state.todoArray[index] = {};

        const items = this.state.todoArray;
        items[index] = {};

        this.setState({todoArray: this.state.todoArray});
        console.log(this.state.todoArray);
        //console.log(tempArray);
    };

    handleReady = (item) => {
        const index = item.id;
        console.log(index);
        this.state.todoArray.splice(index, 1, {...this.state.todoArray[index], done: true});

        this.setState({
            todoArray: [...this.state.todoArray],
            id: this.state.todoArray.length
        });

        console.log(this.state.todoArray);
    };

    showCurrentTodos = () => {
        this.setState( (prevState) => {
            return {
                status: !prevState.status
            }
        });
        this.render(this.state.status);
        console.log(this.state.status);
    };

    showDoneTodos = () => {
        this.setState( (prevState) => {
            return {
                status: !prevState.status
            }
        });
        this.render(this.state.status);
        console.log(this.state.status);
    };

    showAllTodos = () => {

    };


    render() {
        let whatToShow = this.state.status;
        //console.log(status);
        return(
            <div>
                <h2>TODO APP</h2>
                <input onChange={this.handleChange} className="input" id="input" onKeyUp={this.handleEnter} />
                <button onClick={this.handleClick} className="addButton" id="addButton">Add</button>
                <div className="todoList">{
                    this.state.todoArray.filter(function (item) {
                        return item.done === whatToShow
                    }).map( (item) => {
                        return <div className="todoItem" key={item.id}>
                            {item.value}
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
                    })
                }</div>
                <div className="navigation">
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

ReactDOM.render(<Todo value=""/>, document.getElementById('root'));


