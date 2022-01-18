import {ObjectId} from "mongodb";
import {AxiosResponse} from "axios";
import {CustomList, LIST_TYPE} from "../models/CustomList";

const axios = require('axios').default;

export const getAllLists = () =>
    axios.get("/api/lists/all/").then( (response:AxiosResponse) => response.data)

export const getListById = (id : ObjectId) =>
    axios.get(`/api/lists/id=${id}`).then( (response:AxiosResponse) => response.data)

export const addList = (newList: CustomList) =>
    axios.put("/api/lists/all/", newList).then( (response:AxiosResponse) => response.data as CustomList)

// export const removeList = (oldList: CustomList) =>
//     axios.delete("/lists/all/", oldList)

export const updateList = (updatedList: CustomList) =>
    axios.patch("/api/lists/all/", updatedList)

// dummy query
 export const getAllListsByType = (listType: LIST_TYPE) =>
    axios.get(`/api/lists/type=${listType}`).then( (response:AxiosResponse) => response.data)