import Header from "../components/Header";
import Navigation from "../components/Navigation";
import ShoppingListMinimal from "../components/ShoppingListMinimal";

export default function HomePage() {

    return (
        <div>
            <Header title="HomePage"/>
            <Navigation currentPage="HomePage"/>
            <ShoppingListMinimal/>
        </div>
    );
}