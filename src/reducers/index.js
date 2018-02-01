const initialState = {
    todoArray: [],
    currentFilter: "current"
};

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
        state.currentFilter = "done";

        return {
            ...state, currentFilter: state.currentFilter
        }
    }

    if(action.type === "SHOW_CURRENT") {
        state.currentFilter = "current";

        return {
            ...state, currentFilter: state.currentFilter
        }
    }

    if(action.type === "SHOW_ALL") {
        state.currentFilter = "all";

        return {
            ...state, currentFilter: state.currentFilter
        }
    }

    return state;
}
