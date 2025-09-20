import { http } from "@/lib/http/client";
import { GeoProcessInput, GeoProcessOutput } from "./model/schema";


export function postProcessPoints(input: GeoProcessInput) {
  return http<GeoProcessOutput, GeoProcessInput>("/api/python/process", {
    method: "POST",
    body: input,
  });
}