export const initialState = (function () {
    const filters = [
        function currentTodos(item) {
            return item.done === false;
        },
        function doneTodos(item) {
            return item.done === true;
        },
        function allTodos() {
            return true
        }
    ];

    return {
        todoArray: [],
        filters,
        currentFilter: filters[0]
    }

})();




export function todoList(state = {...initialState}, action) {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                todoArray: [
                    ...state.todoArray,
                    {
                        value: action.payload,
                        done: false,
                        id: state.todoArray.length
                    }
                ]
            };

        case "DELETE_TODO":
            let index = action.payload;
            state.todoArray.splice(index, 1);
            state.todoArray.forEach(function (todo, index) {
                todo.id = index;
            });

            return {
                ...state, todoArray: [...state.todoArray]
            };

        case "DONE_TODO":
            index = action.payload;
            state.todoArray[index].done = true;

            return {
                ...state, todoArray: [...state.todoArray]
            };

        case "SHOW_DONE":
            state.currentFilter = state.filters[1];

            return {
                ...state, currentFilter: state.currentFilter
            };

        case "SET_CURRENT_FILTER":
            return {
                ...state, currentFilter: state.filters[action.payload],
                currentFilterNumber: action.payload
            };

        case "SHOW_CURRENT":
            state.currentFilter = state.filters[0];

            return {
                ...state, currentFilter: state.currentFilter
            };

        case "SHOW_ALL":
            state.currentFilter = state.filters[2];

            return {
                ...state, currentFilter: state.currentFilter
            };

        case "REQUEST":
            return state;

        case "SUCCESS":
            return state;

        case "FAILURE":
            return state;

        default:
            return state;
    }
}
