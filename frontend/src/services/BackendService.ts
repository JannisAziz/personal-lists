import {ObjectId} from "mongodb";
import {AxiosResponse} from "axios";

const axios = require('axios').default;

export function getAllLists(){

    let lists: CustomList[] = []

    axios.get("/lists/all/").then( (res:AxiosResponse<CustomList[]>) => {lists = res.data})

    return lists
}

export function getListById(id : ObjectId) : CustomList {
    return axios(`lists/all/${id}`)
}

export function addList(newList: CustomList) {
    axios.put("lists/all/", newList)
}

export function removeList(oldList: CustomList) {
    //axios.delete("lists/all/", oldList)
    console.log("Deleting")
}

export function updateList(updatedList: CustomList) {
    axios.patch("lists/all/", updatedList)
}

export type CustomList = {
    listId: ObjectId
    listName: string
    listItems: Object[]
}