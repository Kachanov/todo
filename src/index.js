import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {item: props.value, todoArray: []};
    }

    handleChange = (event) => {
        this.setState({item: event.target.value.toUpperCase()});
        console.log(event.currentTarget.value);
    };

    addTodo() {
        var input = document.getElementById("input");
        if(input.value) {
            this.setState({todoArray: [...this.state.todoArray, input.value]});
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

    render() {
        return(
            <div>
                <h2>TODO APP</h2>
                <input onChange={this.handleChange} className="input" id="input" onKeyUp={this.handleEnter} />
                <button onClick={this.handleClick} className="addButton" id="addButton">Add</button>
                <div className="todoList">{
                    this.state.todoArray.map((item) =>
                        <div className="todoItem">
                            {item}
                        </div>
                    )
                }</div>
            </div>
        );
    }

}

ReactDOM.render(<Todo value=""/>, document.getElementById('root'));


