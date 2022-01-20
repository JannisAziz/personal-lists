import {AxiosResponse} from "axios";

const axios = require('axios').default;

const userData = {username: "", authToken: ""}

export const getUserData = () => ({...userData}) // Copy for safety

export const isLoggedIn = () => userData.authToken !== ""

export const logOut = () => userData.username = userData.authToken = ""

const getConfig = () => ({headers: {'Authorization': 'Bearer ' + getUserData().authToken}})

// USER LOGIN & REGISTER
export const hello = () =>
    axios.get("/auth/", getConfig()).then( (response:AxiosResponse) => response.data)

export const login = (userInput: {username: string, password: string}) =>
    axios.post("/auth/login/", userInput)
        .then( (response:AxiosResponse<string>) => {
            userData.username = userInput.username
            userData.authToken = response.data
        })

export const register = (userInput: {username: String, password: String}) =>
    axios.post("/auth/register/", userInput).then( (response:AxiosResponse) => response.data)