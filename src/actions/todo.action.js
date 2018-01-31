export function addTodo(value) {
    return {type: "ADD_TODO", payload: value}
}

export function deleteTodo(index) {
    return {type: "DELETE_TODO", payload: index}
}