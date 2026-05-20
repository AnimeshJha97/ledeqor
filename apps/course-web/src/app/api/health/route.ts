import { NextResponse } from "next/server";
import { getDb, hasMongoConfig } from "@/server/db/mongodb";

export async function GET() {
  if (!hasMongoConfig()) {
    return NextResponse.json({
      status: "degraded",
      database: "not_configured"
    });
  }

  try {
    const db = await getDb();
    await db.command({ ping: 1 });

    return NextResponse.json({
      status: "ok",
      database: "connected"
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "degraded",
        database: "unreachable",
        error: error instanceof Error ? error.message : "Unknown database error"
      },
      { status: 503 }
    );
  }
}
