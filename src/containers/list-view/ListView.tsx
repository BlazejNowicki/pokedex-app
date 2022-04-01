import { Link } from "react-router-dom";

export const ListView = () => {
    return (
        <div>
            <h3>ListView</h3>
            <Link to="/details/1">Pokemon 1</Link> <br />
            <Link to="/details/2">Pokemon 2</Link>
        </div>
    );
}

export default ListView;
