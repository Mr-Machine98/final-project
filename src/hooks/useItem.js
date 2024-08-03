import { useEffect, useState } from "react";
import { getItems } from "../service/ItemsCardService";

export function useItem() {

    const [items, setItems] = useState([]);

    useEffect( () => {
        async function onGetItems() {
            const res = await getItems();
            setItems(res);
        }
        onGetItems();
    }, []);

    return {
        items,
        setItems
    };
}