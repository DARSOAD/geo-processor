"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Rectangle, CircleMarker, useMap } from "react-leaflet";
import { GeoProcessOutput } from "../model/schema"

type GeoBounds = GeoProcessOutput["bounds"]

const mockResult: GeoProcessOutput = {
    centroid: { lat: 4.60971, lng: -74.08175 },
    bounds: {
        north: 4.61071,
        south: 4.60871,
        east: -74.08075,
        west: -74.08275,
    },
    fromCache: false
};



function FitBounds({ bbox }: { bbox?: GeoBounds }) {
    const map = useMap();

    useEffect(() => {
        if (!bbox) return;
        const bounds: [[number, number], [number, number]] = [
            [bbox.south, bbox.west],
            [bbox.north, bbox.east],
        ];
        map.fitBounds(bounds, { padding: [20, 20] });
    }, [bbox, map]);

    return null;
}

export function GeoMap({ result = mockResult }: { result?: GeoProcessOutput }) {
    const rectBounds = useMemo(() => {
        if (!result?.bounds) return null;
        return [
            [result.bounds.south, result.bounds.west],
            [result.bounds.north, result.bounds.east],
        ] as [[number, number], [number, number]];
    }, [result?.bounds]);

    return (
        <MapContainer
            style={{ height: 360, width: "100%", borderRadius: 12, overflow: "hidden" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitBounds bbox={result?.bounds ?? undefined} />

            {rectBounds && (
                <Rectangle
                    bounds={rectBounds}
                    pathOptions={{ color: "#2563eb", weight: 2, fillOpacity: 0.1 }}
                />
            )}

            {result?.centroid && (
                <CircleMarker
                    center={[result.centroid.lat, result.centroid.lng]}
                    radius={7}
                    pathOptions={{ color: "#dc2626" }}
                />
            )}
        </MapContainer>
    );
}
