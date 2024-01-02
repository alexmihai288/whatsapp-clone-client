"use server";

import { revalidatePath } from "next/cache";

export const revalidatePathUrl = (url: string) => {
  revalidatePath(url);
};
