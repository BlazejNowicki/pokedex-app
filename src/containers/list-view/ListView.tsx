import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ListItem } from "../../components/list-item/listItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getIndexes, getIndexesByName, getIndexesByType, loadListAsync, selectPokemonList } from "../../store/pokemonSlice";
import { DisplayMode } from "../../types/displayTypes";

export const ListView = () => {
    const list = useAppSelector(selectPokemonList);
    const dispatch = useAppDispatch();

    const fun = async () => {
        let val = await getIndexesByType('flying', 10);
        console.log(val);
    }

    useEffect(() => {
        dispatch(loadListAsync({mode: DisplayMode.Type, typeName: 'flying'}));
    }, []);

    const items = list.map(data => <ListItem data={data} key={data.id}/>);

    const handleLoadMore = () => {
        dispatch(loadListAsync({mode: DisplayMode.Normal}));
    }

    

    return (
        <div>
            <h3>ListView</h3>
            <button onClick={handleLoadMore}>Load more</button>
            {items}
        </div>
    );
}

export default ListView;
