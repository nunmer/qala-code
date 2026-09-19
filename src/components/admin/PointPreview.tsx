'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Coordinates } from '@/lib/twogis';

const icon = L.divIcon({
  className: 'qala-marker',
  html: '<span style="--marker-color:#d4a03c"></span>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

/** Держит карту в актуальном размере и следует за разобранной точкой. */
function SyncView({ location }: { location: Coordinates }) {
  const map = useMap();

  useEffect(() => {
    const raf = requestAnimationFrame(() => map.invalidateSize());
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(map.getContainer());

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [map]);

  useEffect(() => {
    map.setView([location.lat, location.lon], 15);
  }, [map, location.lat, location.lon]);

  return null;
}

/** Мини-карта: показывает точку, разобранную из ссылки 2ГИС. */
export default function PointPreview({ location }: { location: Coordinates }) {
  return (
    <MapContainer
      center={[location.lat, location.lon]}
      zoom={15}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <Marker position={[location.lat, location.lon]} icon={icon} />
      <SyncView location={location} />
    </MapContainer>
  );
}
