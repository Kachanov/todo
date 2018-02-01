const initialState = (function () {
    const filters = [
        function (item) {
            return item.done === false;
        },
        function (item) {
            return item.done === true;
        },
        function () {
            return true
        }
    ];

    return {
        todoArray: [],
        filters,
        currentFilter: filters[0]
    }

})();

export function todoList(state = initialState, action) {
    if(action.type === "ADD_TODO") {
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
        }
    }

    if(action.type === "DELETE_TODO") {
        let index = action.payload;
        state.todoArray[index] = {};

        return {
            ...state, todoArray: [...state.todoArray]
        }

    }

    if(action.type === "DONE_TODO") {
        let index = action.payload;
        state.todoArray[index].done = true;

        return {
            ...state, todoArray: [...state.todoArray]
        }
    }

    if(action.type === "SHOW_DONE") {
        state.currentFilter = state.filters[1];

        return {
            ...state, currentFilter: state.currentFilter
        }
    }

    if(action.type === "SHOW_CURRENT") {
        state.currentFilter = state.filters[0];

        return {
            ...state, currentFilter: state.currentFilter
        }
    }

    if(action.type === "SHOW_ALL") {
        state.currentFilter = state.filters[2];

        return {
            ...state, currentFilter: state.currentFilter
        }
    }

    return state;
}
