import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Modal from './components/Modal';
import TodoList from './components/TodoList';
import { RootState } from './store';
import { cancelEditModalFunction, editModalFunction, openAddModalFunction } from './store/reducers/modalReducer';
import { useTypedSelector } from './store/reducers/todoReducer';
import plus from './icons/plus.svg';

const App: FC = () => {
    const {todos} = useTypedSelector((state: RootState) => state.todos)
	const {active, editItem} = useTypedSelector((state: RootState) => state.modal)
	const dispatch = useDispatch()


	return (
		<>
			<div className='main'>
				<div className="container">
					<div className='header'>
						<h1 className='header__title'>Сегодня</h1>
						<button 
							onClick={ editItem==='edit' ? () => dispatch(cancelEditModalFunction()) : () => dispatch(editModalFunction())}
							className={(todos?.length===0) ? 'button hide' : 'header__button' }>{editItem==='edit' ? 'Отменить' : 'Править'}
						</button>
					</div>

					<button className={active===true ? 'button_add button_add_hide' : 'button_add'} onClick={() => dispatch(openAddModalFunction())}>
						<img src={plus} alt="+"/>
					</button>
					<TodoList/>
				</div>
			</div>
			<Modal
					editItem={editItem}/>
		</>
	);
};

export default App;