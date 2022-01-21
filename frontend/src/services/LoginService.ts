import {AxiosResponse} from "axios";

// Todo: check for and delete old/invalid/expired token (request new login)
const AUTH_TOKEN_STORAGE_KEY = "AUTH_TOKEN"


// USERDATA / TOKEN ACCESS
const getToken = () : string => localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) || ""
const setToken = (token: string) : void => {localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token)}
const removeToken = () : void => localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)

export const getUsername = () : string => extractUsernameFromToken(getToken())
export const logOut = () : void => removeToken()
export const isLoggedIn = ():boolean => !!getToken() // !! = !("" || null || undefined)

const getAxiosConfig = () : {headers: {'Authorization': string}} => ({headers: {'Authorization': 'Bearer ' + getToken()}})


// USER LOGIN & REGISTER
const axios = require('axios').default;

export const hello = () : Promise<string> =>
    axios.get("/user/", getAxiosConfig()).then( (response:AxiosResponse) => response.data)

export const login = (userInput: {username: string, password: string}) : Promise<void> =>
    axios.post("/auth/login/", userInput).then(
        (response:AxiosResponse<string>) => setToken(response.data))

export const register = (userInput: {username: String, password: String}) : Promise<string> =>
    axios.post("/auth/register/", userInput).then( (response:AxiosResponse) => response.data)


// Vanilla token data extraction
const extractUsernameFromToken = (token: string):string => {
    if (!token) { return ""}
    // token: HEADER.>DATA<.SIGNATURE
    const base64Url = token.split('.')[1];
    // DATA: {"sub": "1234", >"name": "username"<, "iat": "17125"}
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64)).sub;
}