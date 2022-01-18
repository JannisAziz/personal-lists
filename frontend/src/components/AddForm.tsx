import {ChangeEventHandler, FormEventHandler} from "react";

export default function AddForm({addFunc, userInput, updateFunc}: {addFunc: FormEventHandler<HTMLFormElement>, userInput: string, updateFunc: ChangeEventHandler<HTMLInputElement>}) {
    return (
        <form onSubmit={addFunc}>
            <input value={userInput} onChange={updateFunc} placeholder="new thing here" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
            <button type="submit">Add</button>
        </form>
    )
}