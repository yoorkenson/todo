import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { RootState } from '../store';
import { openEditModalFunction } from '../store/reducers/modalReducer';
import { removeTodoFunction, TodoItemState, useTypedSelector } from '../store/reducers/todoReducer';
import del_dis from '../icons/delete-disabled.svg';
import del_act from '../icons/delete-active.svg';

const TodoItem: FC<TodoItemState> = (todo) => {

    const {editItem} = useTypedSelector((state: RootState) => state.modal)

    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(removeTodoFunction(todo))
    }
    const openEditModal = () => {
        dispatch(openEditModalFunction(todo))
        console.log(todo)
    }
    return (
        <div className='todo__item'>
            <button className='todo__delete'
                onClick={(editItem==='edit') ? handleDelete : undefined}
            >
                <img className={(editItem==='edit') ? 'del_act' : ''}
                     src={ (editItem==='edit') ? del_act : del_dis} alt="del"
                /> 
            </button>
            <p className={(editItem==='edit') ? 'todo__title delete' : 'todo__title'} onClick={(editItem==='edit') ? () => openEditModal() : undefined}>
                {todo.text}
            </p>
        </div>
    );
};

export default TodoItem;