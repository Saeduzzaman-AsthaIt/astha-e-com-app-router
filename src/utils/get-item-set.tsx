import { cache } from "react";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { HEDERS_FOR_UPDATE, URL_FOR_UPDATE } from "@/service/item-set-service";
import { notFound } from "next/navigation";

export const ITEM_BY_ID_QUERY_KEY = "item";
export const ITEM_BY_NAME_KEY = "updatedItem";
export const SETS_QUERY_KEY = "sets";

const fetchSetById = cache( async (id: string) => {
    console.log("Before fetch by id")
    let data: Set 
    try{
        data = await PokemonTCG.findSetByID(id);
    } catch(error) {
        notFound();
    }
    console.log("After fetch By Id", id);
    console.log(data);
    return data;
});

export default fetchSetById;

export const fetchUpdatedSetByName = cache(async (name: string) => {
    console.log("Before fetch by name (updated)")
    //   const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
    const response = await fetch(`${URL_FOR_UPDATE}/${name}`, {
        method: 'GET', // or 'POST', 'PUT', etc. based on your API
        headers: HEDERS_FOR_UPDATE,
    });
    const data = await response.json();
    console.log("After fetch by name (updated)")
    console.log(data);
    return data;
});

export const fetchSets = cache(async () => {
    const data: Set[] = Array.from(await PokemonTCG.getAllSets());
    console.log("Pokemon Sets --- ");
    console.log(data);
    // TODO: get new to old here
    // return data.slice(0, 10);
    return data;
});