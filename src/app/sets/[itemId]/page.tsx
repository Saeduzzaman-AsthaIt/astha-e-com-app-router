
import fetchSetById, { ITEM_BY_ID_QUERY_KEY } from "@/service/item-set-service";
import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { notFound } from "next/navigation";
import ItemDetails from "./itemDetails";

const ItemInSet = async ({ params}: { params: {itemId: string}}) => {
    const { itemId } = params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [ITEM_BY_ID_QUERY_KEY, itemId],
        queryFn: () => fetchSetById(itemId)
    });
    const dehydratedState = dehydrate(queryClient);
    const initialData = dehydratedState?.queries.find((query: any) => query.queryKey[1] === itemId)?.state.data;

    if(!initialData) {
        return notFound();
    }

    return (
        <>
            <HydrationBoundary state={dehydratedState}>
                <ItemDetails itemId={itemId} initialData={initialData} />
            </HydrationBoundary>
        </>
    );
}

export default ItemInSet;

export const generateStaticParams = async () => {
    const data = await PokemonTCG.getAllSets();
    return data.slice(0, 5).map(item => ({params: {itemId: item.id}}));
}