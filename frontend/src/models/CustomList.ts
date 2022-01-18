import {ObjectId} from "mongodb";

export interface CustomList {
    listId?: ObjectId
    listName: string
    listItems: Object[]
}

export enum LIST_TYPE {
    TODO,
    SHOPPING,
    OTHER
}