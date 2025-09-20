import { GeoProcessInput } from "./schema";

export function parsePoints(raw: string): GeoProcessInput {
  try {
    const maybe = JSON.parse(raw);
    if (Array.isArray(maybe)) {
      return { points: maybe };
    }
  } catch { /* ignore */ }

  const points = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [lat, lng] = l.split(",").map((n) => Number(n.trim()));
      return { lat, lng };
    });

  return { points };
}