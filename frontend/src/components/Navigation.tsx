import {Link} from "react-router-dom";
import "../styles/CustomStyles.scss"


export default function Navigation (props: { currentPage: string }){
    return (
        <div className="navigation-bar">
            <Link to="/">
                <button>
                    Home
                </button>
            </Link>
            {props.currentPage !== "ShoppingListPage" ?
                <Link to="shoppingListPage">
                    <button>
                        ShoppingList
                    </button>
                </Link> : null}
        </div>
    )
}
