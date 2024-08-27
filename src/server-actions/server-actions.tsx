"use server";

import { revalidatePath } from "next/cache";

const revalidateItmeSetPage = async (itemSetId: string) => {
    await revalidatePath(`/sets/${itemSetId}`)
}

export default revalidateItmeSetPage;