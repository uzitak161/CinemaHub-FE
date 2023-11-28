import {useParams} from "react-router-dom";

function Details() {
    const {did} = useParams()
    return (
        <div>
            <h1>Details with did: {did}</h1>
        </div>
    );
}

export default Details;