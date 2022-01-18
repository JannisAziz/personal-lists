import {useEffect, useState} from "react";
import ShoppingListItem from "../models/ShoppingListItem";
import ItemCardMinimal from "./ItemCardMinimal";

export default function ShoppingListMinimal(){

    const ITEM_LIST_KEY = "ITEM_STORE"
    const [items, setItems] = useState<ShoppingListItem[]>(JSON.parse(localStorage.getItem(ITEM_LIST_KEY) || "[]"))

    useEffect(() => {
        localStorage.setItem(ITEM_LIST_KEY, JSON.stringify(items))
    }, [items])

    const removeItem = (itemToRemove: ShoppingListItem) => {
        setItems(items.filter(item => item !== itemToRemove))
    }

    const updateIsDone = (itemToChange: ShoppingListItem) => {
        const newItems = [...items]

        const itemIndex = newItems.findIndex(item => item === itemToChange)

        newItems[itemIndex].isDone = !newItems[itemIndex].isDone

        /*newItems[itemIndex] = {
            ...newItems[itemIndex],
            isDone: !newItems[itemIndex].isDone
        }*/

        setItems(newItems)
    }

    return (
        <article className="article">
            <div>
                {items.map( (item) => (
                    <ItemCardMinimal item={item} onUpdateIsDone={updateIsDone} onRemoveItem={removeItem}/>
                ))}
            </div>
        </article>
    )
}