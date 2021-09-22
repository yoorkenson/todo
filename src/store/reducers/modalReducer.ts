import { TodoItemState } from "./todoReducer"



export interface ModalState {
    active: boolean;
    addItem: boolean;
    editItem: string;
    todoValueId: number;
    todoValueText: string;
}

//edit_AddItem 
// false = edit
// true = add
const initialState: ModalState = {
    active: false,
    addItem: false,
    editItem: 'cancel',
    todoValueId: 0,
    todoValueText: ''
}

export enum ModalActionTypes {
    OPEN_ADD_MODAL = 'OPEN_ADD_MODAL',
    EDIT_MODAL = 'EDIT_MODAL',
    CANCEL_EDIT_MODAL = 'CANCEL_EDIT_MODAL',
    OPEN_EDIT_MODAL = 'OPEN_EDIT_MODAL',
    CLOSE_MODAL = 'CLOSE_MODAL'
}

export interface openAddModal {
    type: ModalActionTypes.OPEN_ADD_MODAL
}

export interface editModal {
    type: ModalActionTypes.EDIT_MODAL
}

export interface cancelEditModal {
    type: ModalActionTypes.CANCEL_EDIT_MODAL
}

export interface openEditModal {
    type: ModalActionTypes.OPEN_EDIT_MODAL;
    payload: TodoItemState
}

export interface closeModal {
    type: ModalActionTypes.CLOSE_MODAL
}

export type ModalAction = openAddModal | openEditModal | cancelEditModal | closeModal | editModal


export const closeModalFunction = () => ({type: ModalActionTypes.CLOSE_MODAL})
export const openAddModalFunction = () => ({type: ModalActionTypes.OPEN_ADD_MODAL})
export const editModalFunction = () => ({type: ModalActionTypes.EDIT_MODAL})
export const cancelEditModalFunction = () => ({type: ModalActionTypes.CANCEL_EDIT_MODAL})
export const openEditModalFunction = (todo: TodoItemState) => ({type: ModalActionTypes.OPEN_EDIT_MODAL, payload: todo})


export const modalReducer = (state: ModalState = initialState, action: ModalAction): ModalState => {
    switch (action.type) {
        case ModalActionTypes.OPEN_ADD_MODAL:
            return {active: true, addItem: true, editItem: 'cancel', todoValueId: 0, todoValueText: ''}
        case ModalActionTypes.EDIT_MODAL:
            return {active: false, addItem: false, editItem: 'edit', todoValueId: 0, todoValueText: ''}
        case ModalActionTypes.CANCEL_EDIT_MODAL:
            return {active: false, addItem: false, editItem: 'cancel', todoValueId: 0, todoValueText: ''}
        case ModalActionTypes.OPEN_EDIT_MODAL:
            return {active: true, addItem: false, editItem: 'open', todoValueId: action.payload.id, todoValueText: action.payload.text}
        case ModalActionTypes.CLOSE_MODAL:
            return {...state, active: false}
        default:
            return state;
    }
}