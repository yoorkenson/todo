import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { TodoItemState, useTypedSelector } from '../store/reducers/todoReducer';

import TodoItem from './TodoItem';

const TodoList: FC = () => {

    const {todos} = useTypedSelector((state: RootState) => state.todos)

    return (
        <div className='todo__list'>
            {(todos?.length!==0) ? todos!.map((todo: TodoItemState)  => {
                return (
                    <TodoItem key={todo.id} 
                              id={todo.id} 
                              text={todo.text}/>
                )
            }) : 'Список задач пуст'}
        </div>
    );
};

export default TodoList;