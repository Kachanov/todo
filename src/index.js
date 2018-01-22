import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let todoList = [];

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {item: ""};
    }

    handleChange = (event) => {
        this.setState({item: event.currentTarget.value});
        console.log(event.currentTarget.value);
    };

    handleClick = (event) => {
        todoList.push(this.state.item);
        console.log(todoList);
        var input = document.getElementById("input");
        input.value = "";
    };

    render() {
        return(
            <div>
                <input onChange={this.handleChange} className="input" id="input"/>
                <button onClick={this.handleClick} className="addButton" id="addButton"> Add </button>
            </div>
        );
    }


}

ReactDOM.render(<Input />, document.getElementById('root'));
