import Header from "../components/Header";
import Navigation from "../components/Navigation";
import {addList, getAllLists} from "../services/BackendService";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {CustomList} from "../models/CustomList";
import AddForm from "../components/AddForm";

export default function TodoListPage() {
    const pageName = "TodoListPage"

    const [userInput, setUserInput] = useState("")
    const updateInput = (inputEvent: ChangeEvent<HTMLInputElement>) => setUserInput(inputEvent.target.value)

    const [lists, setLists] = useState<CustomList[]>([])

    useEffect( () => getAllLists().then(setLists).catch(console.error), [])

    const createList = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newList: CustomList = {
            listName: userInput,
            listItems: []
        }

        addList(newList).then(
            (responseList:CustomList) => setLists([...lists, responseList]))
            .catch(console.error)

        setUserInput('')
    }

    return (
        <article className="article">
            <Header title={pageName}/>
            <Navigation currentPage={pageName}/>

            <AddForm addFunc={createList} userInput={userInput} updateFunc={updateInput} />

            {lists?.map((list) =>
                <p>{list?.listName}</p>
                // (<TodoList listData={list}/>)
            )}
        </article>
    );
}