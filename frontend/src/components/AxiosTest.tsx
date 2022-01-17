import * as backendService from "../services/BackendService";

export default function AxiosTest() {

    const lists = backendService.getAllLists()
    console.log("All Lists: " + lists )

    // const firstList = backendService.getListById(lists[0].listId)
    // console.log("First List: " + firstList)

    // addList()
    // removeList()
    // updateList()

    return (
        <div>
        </div>
    )
}