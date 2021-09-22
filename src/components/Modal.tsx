import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RootState } from '../store';
import { closeModalFunction, editModalFunction } from '../store/reducers/modalReducer';
import { addTodoFunction, TodoItemState, updateTodoFunction, useTypedSelector } from '../store/reducers/todoReducer';


interface ModalProps {
    editItem: string;
}

const Modal: FC<ModalProps> = () => {
    const dispatch = useDispatch()

    const {active, editItem, todoValueId, todoValueText} = useTypedSelector((state: RootState) => state.modal)
    const [text, setText] = useState(todoValueText);
    const isTodoValueText = (todoValueText: string) => {
        if (todoValueText !== '') {
            setText(todoValueText)
        }
    }
    useEffect(() => {
        isTodoValueText(todoValueText)
    }, [todoValueText])

    const addAndClose = (text: string) => {
        dispatch(addTodoFunction(text))
        setText('');
        dispatch(closeModalFunction())
    }

    const editAndClose = (value: TodoItemState) => {
        dispatch(updateTodoFunction(value))
        setText('')
        dispatch(closeModalFunction())
        dispatch(editModalFunction())
    }

    const cancelAddModal = () => {
        setText('')
        dispatch(closeModalFunction())
    }

    const cancelEditModal = () => {
        setText('')
        dispatch(closeModalFunction())
        dispatch(editModalFunction())
    }

    return (
        <div className={active ? 'modal active' : 'modal'}>
            <div className="modal__wrapper">
                <div className="modal__container">
                    <div className="container">
                        {editItem==='open'||editItem==='edit' ?
                            <input  className='input input_edit'
                            placeholder='Введите текст задачи'
                            value={text} 
                            onChange={(e) => setText(e.target.value)} />
                        :
                            <textarea  className='input input_add'
                            placeholder='Введите текст задачи'
                            value={text} 
                            onChange={(e) => setText(e.target.value)} />
                        }
                        <div className="button__wrapper">
                            <button className='modal__button button_grey'
                                    onClick={(editItem!=='open') ? 
                                        (() => cancelAddModal()) 
                                    :
                                        (() => cancelEditModal()) 
                                }>
                                {editItem!=='open' ? 'Закрыть' : 'Отменить'}
                            </button>
                            <button className='modal__button button_blue' onClick={(editItem!=='open') ? 
                                    //add
                                    (() => addAndClose(text)) 
                                : 
                                    //edit
                                    (() => {
                                        const newValue: TodoItemState = {
                                            id: todoValueId,
                                            text: text
                                        }
                                        editAndClose(newValue!)
                                        })
                                    }>{editItem!=='open' ? 'Добавить' : 'Сохранить'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );



    // if (editItem!=='open') {
    //     return (
    //         //add
    //         <div className={active ? 'modal active' : 'modal'}>
    //             <input value={text} onChange={(e) => setText(e.target.value)} type="textarea"/>
    //             <button onClick={() => {
    //                     dispatch(closeModalFunction())
    //                     setText('');
    //                 }}>Закрыть</button>
    //             <button onClick={() => {
    //                     dispatch(addTodoFunction(text));
    //                     setText('');
    //                     dispatch(closeModalFunction());
    //                 }}>Добавить</button>
    //         </div>
    //     );
    // } else {
    //     //edit
    //     return (
    //         <div className={active ? 'modal active' : 'modal'}>
    //         <input id='title' value={text} onChange={(e) => {
    //             setText(e.target.value)
    //             console.log(e.target.value)
    //             }} type="textarea"/>
    //         <button onClick={() => {
    //             dispatch(closeModalFunction())
    //             setText('')
    //             }}>Отменить</button>
    //         <button onClick={() => {
    //                     const newValue = {
    //                         id: todoValueId,
    //                         text: text
    //                     }
    //                     dispatch(updateTodoFunction(newValue!))
    //                     setText('')
    //                 }}>Сохранить</button>
    //     </div>
    //     )
    // }
};

export default Modal;