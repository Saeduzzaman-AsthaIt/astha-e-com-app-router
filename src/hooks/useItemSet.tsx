import { useQuery } from "@tanstack/react-query"
import fetchSetById, { fetchSets, ITEM_BY_ID_QUERY_KEY, SETS_QUERY_KEY } from "@/service/item-set-service"
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk"

export const useItemSet = (itemId: string, initialData?: Set) => {
    return useQuery<Set, Error>({
        queryKey: [ITEM_BY_ID_QUERY_KEY, itemId],
        queryFn: () => fetchSetById(itemId),
        initialData,
        enabled: !!itemId
    })
}

export const useItemsSets = (initialData?: Set[]) =>  {
    return useQuery<Set[], Error>({
        queryKey: [SETS_QUERY_KEY],
        queryFn: () => fetchSets(),
        initialData: initialData,
        refetchOnMount: false
    });
}