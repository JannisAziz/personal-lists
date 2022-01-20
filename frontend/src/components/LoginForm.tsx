import {getUserData, hello, isLoggedIn, login, register} from "../services/LoginService";
import {ChangeEventHandler, MouseEventHandler, useState} from "react";

export default function LoginForm () {

    const [userInput, setUserInput] = useState({username: "", password: ""})

    const updateUserInput: ChangeEventHandler<HTMLInputElement> = (e) =>  {
        e.preventDefault()
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }

    const onLogin: MouseEventHandler = (e) => {
        e.preventDefault()
        login(userInput).then(() => updateHelloMessage()).catch(()=> alert("Invalid Credentials"))
    }

    const onRegister: MouseEventHandler = (e) => {
        e.preventDefault()
        register(userInput).catch(()=> alert("User already registered"))
    }

    const [helloMessage, setHelloMessage] = useState("")

    const updateHelloMessage = () => {
        hello().then(setHelloMessage).then().catch(console.error)
    }

    return (
        <div>
            <div>
                {helloMessage}
            </div>
            {
                isLoggedIn()
                ? (
                    <div>Logged in as: {getUserData().username}</div>
                )
                : (
                    <form>
                        <label>
                            Username
                            <input name={"username"} value={userInput.username} onChange={updateUserInput} />
                        </label>

                        <label>
                            Password
                            <input name={"password"} value={userInput.password} onChange={updateUserInput} />
                        </label>

                        <button onClick={onLogin}>Login</button>
                        <button onClick={onRegister}>Register</button>
                    </form>
                )
            }
        </div>
    )
}