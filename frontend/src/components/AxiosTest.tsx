import {useState} from "react";

export default function AxiosTest() {

    const [response, setResponse] = useState("")

    const axios = require('axios').default;

    axios.get("/lists/all/").then(function (response:any) {
        // handle success
        setResponse(response)
        console.log(response);
    })
        .catch(function (error: any) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

    return (
        <div>
            Here: {response}
        </div>
    )
}
