import {AxiosResponse} from "axios";
import {CustomList, LIST_TYPE} from "../models/CustomList";
import {getConfig} from "@testing-library/react";
const axios = require('axios').default;

// LISTS ACCESS
export const getAllLists = () =>
    axios.get("/api/lists/all/", getConfig()).then( (response:AxiosResponse) => response.data)

export const getListById = (id : string) =>
    axios.get(`/api/lists/${id}`, getConfig()).then( (response:AxiosResponse) => response.data)

export const addList = (newList: {}) =>
    axios.put("/api/lists/all/", newList, getConfig()).then( (response:AxiosResponse) => response.data as CustomList)

export const removeList = (oldListId: string) =>
    axios.delete(`/api/lists/${oldListId}`, getConfig()).then(console.log)

export const updateList = (updatedList: CustomList) =>
    axios.patch("/api/lists/all/", updatedList, getConfig())

// dummy query
 export const getAllListsByType = (listType: LIST_TYPE) =>
    axios.get(`/api/lists/${listType}`, getConfig()).then( (response:AxiosResponse) => response.data)