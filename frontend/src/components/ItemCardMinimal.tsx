import ShoppingListItem from "../models/ShoppingListItem";

export default function ItemCard({item, onUpdateIsDone, onRemoveItem}: {item: ShoppingListItem, onUpdateIsDone: Function, onRemoveItem: Function }) {
    return (
        <div>
            {item.name} x {item.count || 1}
            <input type="checkbox" checked={item.isDone} onClick={()=>onUpdateIsDone(item)}/>
            <button onClick={()=>onRemoveItem(item)}>Remove</button>
        </div>
    )
}