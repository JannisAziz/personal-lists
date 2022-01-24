import {AxiosResponse} from "axios";
import {CustomList, LIST_TYPE} from "../models/CustomList";
import {getAxiosConfig} from "./LoginService";
const axios = require('axios').default;

// LISTS ACCESS
export const getAllLists = () =>
    axios.get("/api/lists/all/", getAxiosConfig()).then( (response:AxiosResponse) => response.data)

export const getListById = (id : string) =>
    axios.get(`/api/lists/${id}`, getAxiosConfig()).then( (response:AxiosResponse) => response.data)

export const addList = (newList: {}) =>
    axios.put("/api/lists/all/", newList, getAxiosConfig()).then( (response:AxiosResponse) => response.data as CustomList)

export const removeList = (oldListId: string) =>
    axios.delete(`/api/lists/${oldListId}`, getAxiosConfig()).then(console.log)

export const updateList = (updatedList: CustomList) =>
    axios.patch("/api/lists/all/", updatedList, getAxiosConfig())

// dummy query
 export const getAllListsByType = (listType: LIST_TYPE) =>
    axios.get(`/api/lists/${listType}`, getAxiosConfig()).then( (response:AxiosResponse) => response.data)