import { useEffect } from "react";
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadById, selectPokemonById, selectRequestStatus } from "../store/pokemonSlice";
import { RequestStatus } from "../types/displayTypes";

export const DetailsView = () => {
    let params = useParams();
    let pokemon = useAppSelector(selectPokemonById(params.id ? parseInt(params.id) : 1));
    const status = useAppSelector(selectRequestStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!pokemon)
            dispatch(loadById(params.id ? parseInt(params.id) : 1));
    }, []);

    if (status === RequestStatus.pending)
        return <div>Loading</div>

    if (status === RequestStatus.rejected)
        return <div>Error</div>

    if (!pokemon)
        return <div>Data not found</div>

    return (
        <Container className="bg-light p-3 rounded-3 shadow-lg">
            <Row>
                <Col md='6' className="d-flex align-items-center justify-content-center">
                    <img src={pokemon.sprite} alt="Picture" style={{ width: '100%', maxWidth: '360px' }} className="rounded mt-3" />
                </Col>
                <Col md='6' className="p-3 d-flex flex-column md-align-items-center">
                    <h3 className="text-center">Details</h3>
                    <div className="my-3">
                        <div className="my-2">
                            <div> Name </div>
                            <div>
                                <strong> {pokemon.name.toUpperCase()} </strong>
                            </div>
                        </div>
                        <div className="my-2">
                            <div> Type </div>
                            <div>
                                <strong> {pokemon.types.join(', ')} </strong>
                            </div>
                        </div>
                        <div className="my-2">
                            <div> Weight </div>
                            <div>
                                <strong> {pokemon.weight} lbs</strong>
                            </div>
                        </div>
                        <div className="my-2">
                            <div> Height </div>
                            <div>
                                <strong> {pokemon.height} in </strong>
                            </div>
                        </div>
                    </div>
                    <Link to="/">
                        <Button className="px-4">Back</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default DetailsView;
