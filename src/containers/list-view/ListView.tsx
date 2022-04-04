import { useEffect } from "react";
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
        dispatch(loadListAsync({mode: DisplayMode.Name, query: 'butter', size: config.size}));
    }, []);


    const handleLoadMore = () => {
        dispatch(loadListAsync({...config, size: config.size+10}));
    }

    const items = list.map(data => <ListItem data={data} key={data.id} />);

    return (
        <div>
            <h3>ListView</h3>
            {items}
            <button onClick={handleLoadMore}>Load more</button>
        </div>
    );
}

export default ListView;
