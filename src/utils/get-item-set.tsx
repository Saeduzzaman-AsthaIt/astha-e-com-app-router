import { cache } from "react";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

export const ITEM_BY_ID_QUERY_KEY = "item";
export const SETS_QUERY_KEY = "sets";

const fetchSetById = async (id: string) => {
    console.log("Before fetch by id")
    const data: Set = await PokemonTCG.findSetByID(id);
    console.log("After fetch By Id", id);
    console.log(data);
    return data;
};

export default fetchSetById;

export const fetchSets = async () => {
    const data: Set[] = Array.from(await PokemonTCG.getAllSets());
    console.log("Pokemon Sets --- ");
    console.log(data);
    // TODO: get new to old here
    // return data.slice(0, 10);
    return data;
};