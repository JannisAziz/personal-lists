import {ChangeEvent, FC, FormEvent, MouseEventHandler, useState} from "react";
import {removeList, updateList} from "../services/BackendService";
import {CustomList} from "../models/CustomList";
import TodoItemCard from "./TodoItemCard";
import TodoItem from "../models/TodoItem";
import AddForm from "./AddForm";
import {ObjectId} from "mongodb";

export default function TodoList({listData, onUpdateLists}: {listData: CustomList, onUpdateLists: Function}){

    /*// USER INPUT FOR NEW ITEM
    const [userInput, setUserInput] = useState("")
    const updateInput = (inputEvent: ChangeEvent<HTMLInputElement>) => {
        setUserInput(inputEvent.target.value)
    }

    const addNewTodo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newItem: TodoItem = {
            name: userInput,
            isDone: false
        }

        // add item to local react state
        listData.listItems = [...listData.listItems, newItem]

        console.log("Adding new todo_item: ", listData.listId)

        // update list in mongodb (add item)
        updateList(listData).catch(console.error)

        setUserInput('')
    }*/


    const remove: MouseEventHandler<HTMLButtonElement> = (e) => {
        removeList(listData.listId).catch(console.error)
            .then(onUpdateLists())
    }

    return (
        <div className="todoList">
            {/*<AddForm addFunc={addNewTodo} userInput={userInput} updateFunc={updateInput} />*/}

            {listData?.listName}
            {listData?.listItems.map((item ) =>
                (<TodoItemCard item={item as TodoItem}/>)
            )}

            <button onClick={remove}>Big button</button>
        </div>
    )
}