export function addTodo(value) {
    return {type: "ADD_TODO", payload: value}
}

export function deleteTodo(index) {
    return {type: "DELETE_TODO", payload: index}
}

export function doneTodo(index) {
    return {type: "DONE_TODO", payload: index}
}

export function showDone() {
    return {type: "SHOW_DONE"}
}

export function showCurrent() {
    return {type: "SHOW_CURRENT"}
}

export function showAll() {
    return {type: "SHOW_ALL"}
}