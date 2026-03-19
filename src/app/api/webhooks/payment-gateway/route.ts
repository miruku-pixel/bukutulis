import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();

  // Handle Payment Gateway webhook logic here

  return NextResponse.json({ received: true });
}
