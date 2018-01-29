import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var selectedItem;

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {item: props.value, todoArray: [], status: false, all: false};
        this.defaultTodoItem = {
            value: "",
            done: false,
            id: 0,
        };
    }

    handleChange = (event) => {
        this.setState({item: event.target.value.toUpperCase()});
    };

    addTodo() {
        const input = document.getElementById("input");
        if(input.value) {
            this.setState({
                todoArray: [...this.state.todoArray,
                    {
                        ...this.defaultTodoItem,
                        value: input.value, id: this.defaultTodoItem.id++
                    }]
            });
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
        const items = this.state.todoArray;
        items[index] = {};
        this.setState({todoArray: this.state.todoArray});
    };

    handleReady = (item) => {
        const index = item.id;
        this.state.todoArray.splice(index, 1, {...this.state.todoArray[index], done: true});

        this.setState({
            todoArray: [...this.state.todoArray],
            id: this.state.todoArray.length
        });
    };

    showCurrentTodos = () => {
        this.setState({
            status: false,
            all: false
        });
    };

    showDoneTodos = () => {
        this.setState({
            status: true,
            all: false
        });

    };

    showAllTodos = () => {
         this.setState({
              all: true
         });
    };

    showTodo = (item) => {
      const maxLength = 18;

      if(item.value.length > maxLength) {
          return <div>{item.value.slice(0, maxLength - 3) + "..."}</div>
      }
          return <div>{item.value}</div>
    };

    toggleNavigation = (event) => {
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




    render() {
        return(
            <div>
                <h2>TODO APP</h2>
                <input onChange={this.handleChange} className="input" id="input" onKeyUp={this.handleEnter} />
                <button onClick={this.handleClick} className="addButton" id="addButton">Add</button>
                <div className="todoList">{
                    this.state.todoArray.filter( (item) => {
                        if(this.state.all === false) {
                            return item.done === this.state.status
                        }else{
                            console.log(this.state.all);
                            return item.done === true || item.done === false
                        }
                    }).map( (item) => {
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

ReactDOM.render(<Todo value=""/>, document.getElementById('root'));


