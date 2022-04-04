import { useEffect } from "react";
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { ListItem } from "../components/ListItem";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadListAsync, loadTypesAsync, selectConfig, selectPokemonList, selectRequestStatus } from "../store/pokemonSlice";
import { DisplayMode, RequestStatus } from "../types/displayTypes";
import { FilterBar } from "./FilterBar";

export const ListView = () => {
    const list = useAppSelector(selectPokemonList);
    const status = useAppSelector(selectRequestStatus);
    const config = useAppSelector(selectConfig);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadListAsync(config));
        dispatch(loadTypesAsync());
    }, []);


    const handleLoadMore = () => {
        dispatch(loadListAsync({ ...config, size: config.size + 10 }));
    }

    const items = list.map(data => <ListItem data={data} key={data.id} />);

    return (
        <Container fluid='md d-flex flex-column'>
            <FilterBar></FilterBar>
            {items.length > 0 ? items : <h5 className="text-center text-dark mt-3">Nothing to show</h5>}
            <Button hidden={items.length == 0} onClick={handleLoadMore} variant='primary' className="my-3">Load more</Button>
        </Container>
    );
}

export default ListView;
