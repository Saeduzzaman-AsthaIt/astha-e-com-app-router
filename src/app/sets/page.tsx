import { fetchSets, SETS_QUERY_KEY } from "@/utils/get-item-set";
import PokemonSlider from "@/components/pokemonSlider";
import ItemsSetList from "./itemList";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const ItemsSets = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
      queryKey: [SETS_QUERY_KEY],
      queryFn: () => fetchSets()
  });
  const dehydratedState = dehydrate(queryClient);
  const initialData = dehydratedState?.queries.find((query: any) => query.queryKey[0] === SETS_QUERY_KEY)?.state.data;
  
  return (
    <div className="container mx-auto p-4">
      <PokemonSlider />
      <h1 className="text-2xl font-bold mb-4">Sets List</h1>
      <HydrationBoundary state={dehydratedState}>
        <ItemsSetList initialData={initialData}></ItemsSetList>
      </HydrationBoundary>
    </div>
  );
};

export default ItemsSets;
