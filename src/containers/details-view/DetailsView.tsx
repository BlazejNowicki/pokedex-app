import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectPokemonById } from "../../store/pokemonSlice";

export const DetailsView = () => {
    let params = useParams();
    let pokemon = useAppSelector(selectPokemonById(params.id ? parseInt(params.id) : 1));

    return (
        <Container className="bg-light p-3 rounded-3">
            <Row>
                <Col md='6' className="d-flex align-items-center justify-content-center">
                    <img src={pokemon.sprite} alt="Picture" style={{ width: '100%', maxWidth: '400px' }} className="rounded mt-3" />
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
                        <Button>Back</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default DetailsView;
