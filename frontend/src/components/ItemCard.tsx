import ShoppingListItem from "../models/ShoppingListItem";
import "../styles/CustomStyles.scss"

// Each item is essentially just a checkbox with extra functionality
export default function ItemCard({item, onUpdateItemCount, onRemoveItem}: {item: ShoppingListItem, onUpdateItemCount: Function, onRemoveItem: Function }) {
    return (
        <div className="itemCard">
            {item.name} x
            <input type="number" value={item.count || 1} onChange={(e) => onUpdateItemCount(item, e.target.value as unknown as number)} />
            <button onClick={()=>onRemoveItem(item)}>Remove</button>
        </div>
    )
}