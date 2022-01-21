import {getUsername, hello, isLoggedIn, login, register} from "../services/LoginService";
import {MouseEventHandler, useRef, useState} from "react";

export default function LoginForm () {
    const [helloMessage, setHelloMessage] = useState("")

    const updateHelloMessage = () => {
        hello().then(setHelloMessage).then().catch(console.error)
    }

    const inputUsername = useRef<HTMLInputElement>(null)
    const inputPassword = useRef<HTMLInputElement>(null)

    const newLogin: MouseEventHandler<HTMLButtonElement> = (event):void => {
        event.preventDefault()
        const loginData = {username: inputUsername.current?.value || "", password: inputPassword.current?.value || ""}
        login(loginData).then(() => updateHelloMessage()).catch(()=> alert("Invalid Credentials"))
    }

    const newRegister: MouseEventHandler<HTMLButtonElement> = (event):void => {
        event.preventDefault()
        const loginData = {username: inputUsername.current?.value || "", password: inputPassword.current?.value || ""}
        register(loginData).catch(()=> alert("User already registered"))
    }

    return (
        <div>
            <div>
                {helloMessage}
            </div>
            {
                isLoggedIn()
                ? (
                    <div>Logged in as: {getUsername()}</div>
                )
                : (
                    <form>
                        <label>
                            Username
                            <input ref={inputUsername}/>
                        </label>

                        <label>
                            Password
                            <input ref={inputPassword} type="password"/>
                        </label>

                        <button onClick={newLogin}>Login</button>
                        <button onClick={newRegister}>Register</button>
                    </form>
                )
            }
        </div>
    )
}