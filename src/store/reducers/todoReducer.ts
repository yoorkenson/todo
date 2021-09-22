import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "..";

export interface TodoItemState {
    id: number;
    text: string;
}

export interface TodoListState {
    todos: TodoItemState[] | null
}

const initialState: TodoListState = {
    todos: []
}

export enum TodoActionTypes {
    ADD_TODO = 'ADD_TODO',
    UPDATE_TODO = 'UPDATE_TODO',
    REMOVE_TODO = 'REMOVE_TODO',
}

export interface addTodo {
    type: TodoActionTypes.ADD_TODO;
    payload: string;
}

export interface updateTodo {
    type: TodoActionTypes.UPDATE_TODO;
    payload: TodoItemState;
}

export interface removeTodo {
    type: TodoActionTypes.REMOVE_TODO;
    payload: TodoItemState
}

export type TodoAction = addTodo | updateTodo | removeTodo

export const addTodoFunction = (text: string) => ({type: TodoActionTypes.ADD_TODO, payload: text})
export const removeTodoFunction = (todo: TodoItemState) => ({type: TodoActionTypes.REMOVE_TODO, payload: todo})
export const updateTodoFunction = (todoText: TodoItemState) => ({type: TodoActionTypes.UPDATE_TODO, payload: todoText})


export const todoReducer = (state: TodoListState = initialState, action: TodoAction): TodoListState => {
    switch (action.type) {
        case TodoActionTypes.ADD_TODO:
            return { todos: [...state.todos!, {id: Date.now(), text: action.payload}]}
        case TodoActionTypes.UPDATE_TODO:
            return { todos: state.todos!.map((todo: TodoItemState) => {
                if (todo.id === action.payload.id) {
                    return action.payload;
                } else {
                    return todo
                }
            })}
        case TodoActionTypes.REMOVE_TODO:
            return {todos: state.todos!.filter((todo: TodoItemState) => todo.id !== action.payload.id)}
        default:
            return state;
    }
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector