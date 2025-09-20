"use client";
import { useState } from "react";
import { postProcessPoints } from "../api";
import { GeoProcessInput, GeoProcessOutput } from "../model/schema";
import { toErrorMessage } from "@/lib/http/errors";

type Status = "idle" | "loading" | "success" | "error";

export function useProcessPoints() {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<GeoProcessOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(input: GeoProcessInput) {
    try {
      setStatus("loading");
      setError(null);
      const res = await postProcessPoints(input);
      setData(res);
      setStatus("success");
    } catch (e: unknown) {
      setStatus("error");
      setError(toErrorMessage(e));
      setData(null);
    }
  }
  return { status, data, error, run };
}