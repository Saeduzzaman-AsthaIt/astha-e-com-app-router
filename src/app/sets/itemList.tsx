"use client";

import ItemCard from "@/components/itemCard";
import QuickView from "@/components/quickView";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { useItemsSets } from "@/hooks/useItemSet";

const ItemsSetList = ({initialData}: {initialData: any}) => {
  const { data: itemsSets} = useItemsSets(initialData);
  const [itemName, setItemName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showQuickViewForItem = (name: string) => {
    setIsModalVisible(true);
    setItemName(name);
  }

  const hideQuickView = () => {
    setIsModalVisible(false);
  }
  
  const memoizedItems = useMemo(() => {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 list-none">
        {itemsSets?.map((itemSet: Set) => (
          <li key={itemSet.id} className="mb-2 flex">
            <Link href={`/sets/${itemSet.id}`} className="text-blue-500 hover:underline">
              <ItemCard itemSet={itemSet} showQuickViewForItem={showQuickViewForItem} />
            </Link>
          </li>
        ))}
      </ul>
    )
  }, [itemsSets]);
  
  return (
    <>
      {memoizedItems}
      {isModalVisible && <QuickView itemName={itemName} hideQuickView={hideQuickView} isModalVisible={isModalVisible} />}
    </>
  );
};

export default ItemsSetList;
