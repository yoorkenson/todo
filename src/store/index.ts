import { combineReducers, createStore } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import { modalReducer } from "./reducers/modalReducer";
import { todoReducer } from "./reducers/todoReducer";

export const rootReducer = combineReducers({
    todos: todoReducer,
    modal: modalReducer
})


export type RootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, composeWithDevTools());