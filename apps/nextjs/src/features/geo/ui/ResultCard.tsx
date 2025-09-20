"use client";
import { Card, Heading, Text, Stack } from "@chakra-ui/react";
import { GeoProcessOutput } from "../model/schema";

export function ResultCard({ result }: { result: GeoProcessOutput }) {
  const { centroid, bounds, fromCache } = result;
  return (
    <Card.Root>
      <Card.Body>
        <Stack gap={2}>
          <Heading size="sm">Result</Heading>

          <Text>
            Centroid: lat {centroid.lat}, lng {centroid.lng}
          </Text>

          <Text>Bounds: N {bounds.north}, S {bounds.south}, E {bounds.east}, W {bounds.west}</Text>

          {typeof fromCache === "boolean" && (
            <Text opacity={0.8}>fromCache: {String(fromCache)}</Text>
          )}
        </Stack>
      </Card.Body>
    </Card.Root>
    
  );
}
