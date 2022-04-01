import { Link, useParams } from "react-router-dom";

export const DetailsView = () => {
    let params = useParams();

    return (
        <div>
            <h3>Details about pokemon with ID: {params.id}</h3>
            <Link to="/">Back</Link>
        </div>
    );
}

export default DetailsView;
