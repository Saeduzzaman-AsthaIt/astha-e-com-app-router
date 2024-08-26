import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { cache } from "react";


export const URL_FOR_UPDATE = "https://crud-nextjs-mongo-kappa.vercel.app/api/sets";
export const HEDERS_FOR_UPDATE = {
    'X-API-KEY': '7b651729-1270-4d37-9dca-1730d2ebc0ee',
    'Content-Type': 'application/json'
};

export const createSetItem = async (itemName: string, itemSetToBeUpdated: any) => {
    const response = await fetch(`${URL_FOR_UPDATE}/${itemName}`, {
        method: 'POST', // or 'POST', 'PUT', etc. based on your API
        headers: HEDERS_FOR_UPDATE,
        body: JSON.stringify(itemSetToBeUpdated)
    });

    if(!response.ok) {
        throw new Error("Failed to create item!");
    }

    return await response.json();
}

export const updateSetItem = async (itemName: string, itemSetToBeUpdated: any) => {
    const response = await fetch(`${URL_FOR_UPDATE}/${itemName}`, {
        method: 'PUT', // or 'POST', 'PUT', etc. based on your API
        headers: HEDERS_FOR_UPDATE,
        body: JSON.stringify(itemSetToBeUpdated)
    });

    if(!response.ok) {
        throw new Error("Failed to update item!");
    }

    return await response.json();
}