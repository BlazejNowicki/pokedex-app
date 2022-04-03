import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ListItem } from "../../components/list-item/listItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadListAsync, selectPokemonList } from "../../store/pokemonSlice";

export const ListView = () => {
    const list = useAppSelector(selectPokemonList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadListAsync({limit: 10, offset: 0}));
    }, []);

    const items = list.map(data => <ListItem data={data} key={data.id}/>);

    const handleLoadMore = () => {
        dispatch(loadListAsync({limit: list.length + 10, offset: 0}));
    }

    

    return (
        <div>
            <h3>ListView</h3>
            {items}
            <button onClick={handleLoadMore}>Load more</button>
        </div>
    );
}

export default ListView;
