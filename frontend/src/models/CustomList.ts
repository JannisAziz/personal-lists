export interface CustomList {
    listId: string
    listName: string
    listItems: Object[]
}

export enum LIST_TYPE {
    TODO,
    SHOPPING,
    OTHER
}