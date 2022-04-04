import React, { ReactNode } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, Router } from "react-router-dom";
import { PokemonModel } from "../../types/pokemonTypes";

interface propType {
    data: PokemonModel;
}

export const ListItem = (props: propType) => {
    const data = props.data;

    return (
        <Container>
            <Row className="border my-2 p-2 rounded-3 bg-light shadow" >
                <Col md='3' className="d-flex align-items-center justify-content-center">
                    <img src={data.sprite} alt="Picture" width={'180px'} className="rounded-3"/>
                </Col >
                <Col md='3' className="d-flex align-items-center justify-content-center">
                    <Container className="d-flex flex-column align-items-center my-2">
                        <div className="color-primary"><small>Name</small></div>
                        <div><strong>{data.name.toUpperCase()}</strong></div>
                    </Container>
                </Col>
                <Col md='3' className="d-flex align-items-center justify-content-center my-2">
                    <Container className="d-flex flex-column align-items-center">
                        <div><small>Types</small></div>
                        <div className="text-center"> <strong>{data.types.join(', ')}</strong></div>
                    </Container>
                </Col>
                <Col md='3' className="d-flex align-items-center justify-content-center my-2">
                    <Link to={`/details/${data.id}`}>
                        <Button variant='outline-primary'>
                            More details
                        </Button></Link>
                </Col>
            </Row>
        </Container>
    )
}