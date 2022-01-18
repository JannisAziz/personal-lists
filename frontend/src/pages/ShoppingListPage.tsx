import Header from "../components/Header";
import Navigation from "../components/Navigation";
import ShoppingList from "../components/ShoppingList";

export default function ShoppingListPage() {
    const pageName = "ShoppingListPage"

    return (
        <div>
            <Header title={pageName}/>
            <Navigation currentPage={pageName}/>

            <ShoppingList/>
        </div>
    );
}