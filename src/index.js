import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {item: props.value, todoArray: []};
    }

    handleChange = (event) => {
        this.setState({item: event.currentTarget.value});
        console.log(event.currentTarget.value);
    };

    handleClick = (event) => {
        var input = document.getElementById("input");
        if(input.value) {
            this.setState({todoArray: [...this.state.todoArray, input.value]});
        }
        console.log(this.state.todoArray);
        input.value = "";
    };

    handleEnter = (event) => {
        if(event.keyCode === 13){
            var input = document.getElementById("input");
            if(input.value) {
                this.setState({todoArray: [...this.state.todoArray, input.value]});
            }
            console.log(this.state.todoArray);
            input.value = "";
        }
    };

    render() {
        return(
            <div>
                <h2>Todo App</h2>
                <input onChange={this.handleChange} className="input" id="input" onKeyUp={this.handleEnter} />
                <button onClick={this.handleClick} className="addButton" id="addButton">Add</button>
                <ul>{
                    this.state.todoArray.map((item) =>
                        <li>{item}</li>
                    )
                }</ul>
            </div>
        );
    }

}

ReactDOM.render(<Todo value=""/>, document.getElementById('root'));


