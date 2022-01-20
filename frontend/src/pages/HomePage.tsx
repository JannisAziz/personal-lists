import Header from "../components/Header";
import Navigation from "../components/Navigation";
import LoginForm from "../components/LoginForm";

export default function HomePage() {
    return (
        <div>
            <Header title="HomePage"/>
            <Navigation currentPage="HomePage"/>

            <LoginForm/>
        </div>
    );
}