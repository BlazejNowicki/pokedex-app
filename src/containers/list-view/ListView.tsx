import { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { getTypes } from "../../api/wrappers";
import { ListItem } from "../../components/list-item/listItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadListAsync, selectConfig, selectPokemonList, selectRequestStatus } from "../../store/pokemonSlice";
import { DisplayMode } from "../../types/displayTypes";

export const ListView = () => {
    const list = useAppSelector(selectPokemonList);
    const status = useAppSelector(selectRequestStatus);
    const config = useAppSelector(selectConfig);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadListAsync({ mode: DisplayMode.Name, query: 'pi', size: config.size }));
    }, []);


    const handleLoadMore = () => {
        dispatch(loadListAsync({ ...config, size: config.size + 10 }));
    }

    const items = list.map(data => <ListItem data={data} key={data.id} />);

    return (
        <Container fluid='md d-flex flex-column'>
            {items}
            <Button onClick={handleLoadMore} variant='primary' className="my-3">Load more</Button>
        </Container>
    );
}

export default ListView;
