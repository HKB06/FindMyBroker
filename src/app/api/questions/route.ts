import { NextResponse } from "next/server";
import { getPayloadInstance } from "@/lib/payload";

export async function GET() {
  try {
    const payload = await getPayloadInstance();

    const { docs } = await payload.find({
      collection: "questions",
      sort: "order",
      depth: 2,
    });

    return NextResponse.json(docs);
  } catch (err) {
    console.error("Error fetching questions:", err);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
