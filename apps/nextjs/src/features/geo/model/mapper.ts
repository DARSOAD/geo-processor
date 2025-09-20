import { GeoProcessOutput } from "./schema";

export function mapProcessResponse(apiJson: unknown) {
  const parsed = GeoProcessOutput.safeParse(apiJson);
  if (!parsed.success) throw new Error("Invalid API shape");
  return parsed.data; 
}