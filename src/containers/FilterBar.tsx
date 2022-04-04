import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { loadListAsync, selectConfig, selectTypes } from "../store/pokemonSlice"
import { DisplayMode } from "../types/displayTypes"

export const FilterBar = () => {
  const config = useAppSelector(selectConfig);
  const types = useAppSelector(selectTypes);
  const [mode, setMode] = useState(config.mode);
  const [type, setType] = useState(config.mode === DisplayMode.Type ? config.typeName : "normal");
  const [name, setName] = useState(config.mode === DisplayMode.Name ? config.query: "");
  
  const dispatch = useAppDispatch();

  const nameInput = (
    <div>
      <label htmlFor="pokemonName" className="form-label text-white">Name</label>
      <input className="form-control" type='text' name='pokemonName' id="pokemonName" onChange={event => setName(event.target.value.toLowerCase())}/>
    </div>
  );

  const options = types.map(type => <option key={type} value={type}>{type}</option>)

  const typeInput = (
    <div>
      <label htmlFor="pokemonType" className="form-label text-white">Type</label>
      <select defaultValue={type} className="form-select mb-3" name="pokemonType" id="pokemonType" onChange={event => setType(event.target.value)}>
        {options}
      </select>
    </div>
  );

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    switch(mode){
      case DisplayMode.Normal:
        dispatch(loadListAsync({mode: DisplayMode.Normal, size: config.size}))
        break;
      case DisplayMode.Name:
        dispatch(loadListAsync({mode: DisplayMode.Name, query: name, size: config.size}));
        break;
      case DisplayMode.Type:
        dispatch(loadListAsync({mode: DisplayMode.Type, typeName: type, size: config.size}));
        break;
    }
  }

  return (
    <Container className="bg-dark p-3 rounded-3 my-2">
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md='5'>
            <label htmlFor="pokemonName" className="form-label text-white">Display by</label>
            <select defaultValue={mode} className="form-select mb-3" aria-label=".form-select-lg example" name="mode" id="mode" onChange={event => setMode(parseInt(event.target.value))}>
              <option value={DisplayMode.Normal}>None</option>
              <option value={DisplayMode.Type}>Type</option>
              <option value={DisplayMode.Name}>Name</option>
            </select>
          </Col>
          <Col md='5'>
            {mode === DisplayMode.Name ? nameInput : (mode === DisplayMode.Type ? typeInput : '')}
          </Col>
          <Col className="d-flex align-items-end my-3" md='2'>
            <Button type='submit' variant="outline-light" style={{ width: '100%' }}>Show</Button>
          </Col>
        </Row>
      </form>
    </Container >
  );
}