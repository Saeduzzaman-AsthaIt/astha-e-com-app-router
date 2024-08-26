
import fetchSetById, { fetchUpdatedSetByName, ITEM_BY_ID_QUERY_KEY, ITEM_BY_NAME_KEY } from "@/utils/get-item-set";
import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { notFound } from "next/navigation";
import ItemDetails from "./itemDetails";
import { Metadata } from "next";

export const dynamic = 'force-static';

export const generateStaticParams = async () => {
    const data = await Array.from(await PokemonTCG.getAllSets());
    console.log(data)
    return data.slice(0, 5).map(item => ({itemId: item.id}));
}

const ItemInSet = async ({ params}: { params: {itemId: string}}) => {
    const { itemId } = params;
    const queryClient = new QueryClient();

    try {
        await queryClient.prefetchQuery({
            queryKey: [ITEM_BY_ID_QUERY_KEY, itemId],
            queryFn: () => fetchSetById(itemId)
        });
    } catch(error) {
        return notFound();
    }

    try {
        await queryClient.prefetchQuery({
            queryKey: [ITEM_BY_NAME_KEY, itemId],
            queryFn: () => fetchUpdatedSetByName(itemId)
        });
    } catch(error: any) {
        console.log(`Error prefetching updated item: ${error?.message}`);
    }

    const dehydratedState = dehydrate(queryClient);

    const initialItem = dehydratedState.queries.find(
        (query) => query.queryKey[0] === ITEM_BY_ID_QUERY_KEY && query.queryKey[1] === itemId
    )?.state.data;

    // if(!initialItem) {
    //     return notFound();
    // }

    const updatedItem = dehydratedState.queries.find(
        (query) => query.queryKey[0] === ITEM_BY_NAME_KEY && query.queryKey[1] === itemId
    )?.state.data || null;
    

    // Fetch updated item
    // const {data: updatedItemSet, error: errorOnUpdatedItem, isLoading: isLoadingOnUpdatedItem} = useQuery({
    //     queryKey: [ITEM_BY_NAME_KEY, itemSet?.id],
    //     queryFn: () => fetchUpdatedSetByName(itemSet?.id || ""),
    //     enabled: !!existingName,
    //     staleTime: 0
    // });

    return (
        <>
            <HydrationBoundary state={dehydratedState}>
                <ItemDetails itemId={itemId} initialData={initialItem} initialDataUpdated={updatedItem} />
            </HydrationBoundary>
        </>
    );
}

export default ItemInSet;

export async function generateMetadata({ params }: { params: any}): Promise<Metadata> {
    const { itemId } = params;
    
    // Fetch the item data
    const initialItem = await fetchSetById(itemId);
    let updatedItem = null;
  
    try {
      updatedItem = await fetchUpdatedSetByName(itemId);
    } catch (error) {
      console.log("Error fetching updated item:", error);
    }
  
    const title = updatedItem?.updatedName || initialItem.name;
    
    // Generate the metadata dynamically
    return {
      title: title || 'Title',
      openGraph: {
        title: initialItem?.name || 'Default Title',
        description: `Details about ${initialItem?.name}`,
        images: [
          {
            url: initialItem?.images?.logo || '/default-image.png',  // Provide a fallback image
            width: 800,
            height: 600,
            alt: `${initialItem?.name} logo`,
          },
        ],
        type: 'website',
      },
    };
}