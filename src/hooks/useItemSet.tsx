import { useQuery } from "@tanstack/react-query"
import fetchSetById, { fetchSets, fetchUpdatedSetByName, ITEM_BY_ID_QUERY_KEY, ITEM_BY_NAME_KEY, SETS_QUERY_KEY } from "@/utils/get-item-set"
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk"

export interface SetUpdated {
    _id?: string,
    name?: string,
    updatedName?: string,
    title?: string
}

export const useItemSet = (itemId: string, initialData?: Set) => {
    return useQuery<Set, Error>({
        queryKey: [ITEM_BY_ID_QUERY_KEY, itemId],
        queryFn: () => fetchSetById(itemId),
        initialData,
        refetchOnMount: false,
        enabled: !!itemId
    });
}

export const useItemSetUpdated = (itemId: string, initialData?: SetUpdated) => {
    return useQuery<SetUpdated, Error>({
        queryKey: [ITEM_BY_NAME_KEY, itemId],
        queryFn: () => fetchUpdatedSetByName(itemId),
        initialData,
        refetchOnMount: false,
        enabled: !!itemId
    });
}

export const useItemsSets = (initialData?: Set[]) =>  {
    return useQuery<Set[], Error>({
        queryKey: [SETS_QUERY_KEY],
        queryFn: () => fetchSets(),
        initialData: initialData,
        refetchOnMount: false
    });
}