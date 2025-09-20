import { NextRequest, NextResponse } from "next/server";
import { http } from "@/lib/http/client";
import { serverEnv, API_TIMEOUT_MS } from "@/config/env";
import { toHttpProblem } from "@/lib/http/errors";

type ProcessReq = { points: Array<{ lat: number; lng: number }> };
type ProcessRes = {
  centroid: { lat: number; lng: number };
  bounds: { minLat: number; minLng: number; maxLat: number; maxLng: number };
  fromCache: boolean;
};

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as ProcessReq;

  try {
    const data = await http<ProcessRes, ProcessReq>(
      `${serverEnv.API_BASE_URL}/api/python/process`,
      { method: "POST", body: payload, timeoutMs: API_TIMEOUT_MS }
    );
    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    const { status, message } = toHttpProblem(err);
    return NextResponse.json({ error: "ServerError", message }, { status });
  }
}