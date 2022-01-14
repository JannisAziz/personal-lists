import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import ShoppingListItem from "../models/ShoppingListItem";
import ItemCard from "./ItemCard";
import "../styles/CustomStyles.scss"


export default function ShoppingList(){


    // todo: try axios fetch requests (use relative url/i's)


    const [userInput, setUserInput] = useState('')
    const updateInput = (inputEvent: ChangeEvent<HTMLInputElement>) => {
        setUserInput(inputEvent.target.value)
    }

    const ITEM_LIST_KEY = "ITEM_STORE"
    const [items, setItems] = useState<ShoppingListItem[]>(JSON.parse(localStorage.getItem(ITEM_LIST_KEY) || "[]"))

    useEffect(() => {
        localStorage.setItem(ITEM_LIST_KEY, JSON.stringify(items));
    }, [items]);

    const addNewItem = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // _Todo: Validate user input with more functionality (eg: Capitalization of letters)

        if (items.find( item => item.name === userInput) === undefined && userInput.trim().length !== 0) { //trim() cuts whitespace from start and end of string ## Remember the 2 hour incident ( === !== )##
            const newItem: ShoppingListItem = {
                id: uuidv4(),
                name: userInput,
                isDone: false
            }

            setItems( [...items, newItem] )

            setUserInput('')
        }
    }
    const removeItem = (itemToRemove: ShoppingListItem) => {
        setItems(items.filter(item => item !== itemToRemove))
    }

    //DONT NEED THIS?!
    const getItemCount = (currentItem: ShoppingListItem) => {
        return items.filter( item => item === currentItem )[0].count || 1
    }

    const updateItemCount = (itemToChange: ShoppingListItem, newCount: number) => {
        if (newCount < 1) return;

        const newItems = [...items]

        const itemIndex = newItems.findIndex(item => item === itemToChange)

        newItems.filter( item => item !== itemToChange)

        newItems[itemIndex] = {
            ...newItems[itemIndex],
            count: newCount
        }

        setItems(newItems)
    }

    return (
        <article className="article">
            <form className="addItemField" onSubmit={addNewItem}>
                <input value={userInput} onChange={updateInput} placeholder="new item here" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                {/*<input type="number" value={1} />*/}
                <button type="submit">+</button>
            </form>

            <div>
                {items.map( (item) => (
                    <ItemCard item={item} onUpdateItemCount={updateItemCount} onRemoveItem={removeItem}/>
                ))}
            </div>
        </article>
    )
}