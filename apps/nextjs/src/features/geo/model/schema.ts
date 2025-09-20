import { z } from "zod";
export const GeoPoint = z.object({ lat: z.number(), lng: z.number() });
export const GeoProcessInput = z.object({ points: z.array(GeoPoint).min(2) });
export const GeoBounds = z.object({
  south: z.number(), west: z.number(), north: z.number(), east: z.number(),
});
export const GeoProcessOutput = z.object({
  centroid: GeoPoint, bounds: GeoBounds, fromCache: z.boolean(),
});
export type GeoProcessInput = z.infer<typeof GeoProcessInput>;
export type GeoProcessOutput = z.infer<typeof GeoProcessOutput>;