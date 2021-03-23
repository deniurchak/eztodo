import React from 'react'
import { useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { toggleAddDeadlineModal } from '../../actions/modal';
import { deleteItem, setItemDone, setItemToEdit } from '../../actions/toDo';
import history from '../../history';

export default function DeadlineButtons({item,loginData,activeItemId}) {

    const dispatch = useDispatch()

    const handleReset = () => {
        dispatch(setItemDone({...item, isDone: false}, loginData.access_token))
    }

    const handleDone = () => {
        dispatch(setItemDone({...item, isDone: true}, loginData.access_token))
    }

    const handleEdit = () => {
        dispatch(toggleAddDeadlineModal())
        dispatch(setItemToEdit(item))
        history.push('/deadlines/add')
    }

    const handleDelete= () => {
        if(window.confirm("Delete this item?"))
        {
        dispatch(deleteItem(activeItemId, loginData.access_token))
        alert("You deleted the item")
        }
    }

        return(
        !item.isDone 
        ?
        <>
        <Icon style={{cursor: "pointer"}} size="large"
            color="green" name='check' onClick={handleDone} />
        <Icon style={{cursor: "pointer"}}  size="large"
        color="grey" name='edit' onClick={handleEdit}/>
        <Icon style={{cursor: "pointer"}}  size="large"
        color="red" onClick={handleDelete} name='delete'/>
        </>
        :
        <Icon style={{cursor: "pointer"}} color="blue"  size="large"
        onClick={handleReset} name='repeat' className="reset"/>
        )
}