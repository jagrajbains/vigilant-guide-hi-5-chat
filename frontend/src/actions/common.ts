"use server";
import { revalidateTag, updateTag } from "next/cache";

export async function clearCache(tag: string) {
	await revalidateTag(tag, 'max');
}

export async function refreshData(tag: string) {
	await updateTag(tag);
}
