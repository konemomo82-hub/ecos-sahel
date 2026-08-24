import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidatePath("/fr");
  revalidatePath("/en");
  return NextResponse.json({ revalidated: true });
}
