import "../styles/CustomStyles.scss"
import TodoItem from "../models/TodoItem";

export default function TodoItemCard({item}: {item: TodoItem}) {
    return (
        <div className="todoItemCard">
            {item.name} - <input type="checkbox" checked={item.isDone}/>
        </div>
    )
}