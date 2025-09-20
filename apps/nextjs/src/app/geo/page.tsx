"use client";

import dynamic from "next/dynamic";


const GeoForm = dynamic(() => import("@/features/geo/ui/GeoForm").then(m => m.GeoForm), { ssr: false });

export default function GeoPage() {
  return (
    <div style={{ padding: 16 }}>
      <GeoForm />
    </div>
  );
}