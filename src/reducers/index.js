const initialState = {
    todoArray: [],
    currentFilter: []
};

export function todoList(state = initialState, action) {
    if(action.type === "ADD_TODO"){
        return {
            ...state,
            todoArray: [
                ...state.todoArray,
                {
                    value: action.payload,
                    done: false,
                    id: 0
                }
            ]
        };
    }

    return state;
}