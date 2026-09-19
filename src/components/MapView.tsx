'use client';

import { useEffect, useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getCategory } from '@/data/categories';
import { getStreetTitle } from '@/data/streets/translations';
import { ASTANA_CENTER, DEFAULT_ZOOM } from '@/data/streets';
import { useTranslation } from '@/i18n/LanguageProvider';
import { withLocation, type LocatedStreet } from '@/lib/location';
import type { Street } from '@/lib/types';

/** Маркер категории - обычный div, цвет задаётся CSS-переменной. */
function markerIcon(color: string): L.DivIcon {
  return L.divIcon({
    className: 'qala-marker',
    html: `<span style="--marker-color:${color}"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10],
  });
}

/**
 * Leaflet запоминает размер контейнера в момент инициализации.
 * Карта на странице улицы монтируется ниже сгиба и в свёрнутом виде,
 * поэтому без принудительного пересчёта она остаётся пустой.
 */
function KeepSizeInSync() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    const raf = requestAnimationFrame(() => map.invalidateSize());

    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [map]);

  return null;
}

/** Подводит карту к выбранной улице, не сбрасывая текущий зум пользователя. */
function FlyToSelected({ target }: { target: LocatedStreet | null }) {
  const map = useMap();

  useEffect(() => {
    if (!target) return;
    map.flyTo([target.location.lat, target.location.lon], Math.max(map.getZoom(), 14), {
      duration: 0.8,
    });
  }, [target, map]);

  return null;
}

/** Держит все видимые маркеры в кадре при смене фильтров. */
function FitToStreets({ items }: { items: readonly LocatedStreet[] }) {
  const map = useMap();
  const signature = items.map((item) => item.street.id).join(',');

  useEffect(() => {
    if (items.length === 0) return;

    const bounds = L.latLngBounds(
      items.map((item) => [item.location.lat, item.location.lon] as [number, number]),
    );
    map.fitBounds(bounds, { padding: [56, 56], maxZoom: 14 });
    // Пересчитываем только когда меняется сам набор улиц.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, map]);

  return null;
}

export default function MapView({
  streets,
  selected,
  onSelect,
  fitOnChange = true,
}: {
  streets: readonly Street[];
  selected: Street | null;
  onSelect: (street: Street) => void;
  fitOnChange?: boolean;
}) {
  const { lang } = useTranslation();

  // Координаты берутся из ссылки 2ГИС; записи без рабочей ссылки
  // на карте не показываются вовсе - это честнее ложного маркера.
  const located = useMemo(() => withLocation(streets), [streets]);

  const markers = useMemo(
    () =>
      located.map((item) => ({
        ...item,
        icon: markerIcon(getCategory(item.street.category).color),
      })),
    [located],
  );

  const selectedTarget = useMemo(
    () => located.find((item) => item.street.id === selected?.id) ?? null,
    [located, selected],
  );

  return (
    <MapContainer
      center={[ASTANA_CENTER[0], ASTANA_CENTER[1]]}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; участники <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />

      {markers.map(({ street, location, icon }) => (
        <Marker
          key={street.id}
          position={[location.lat, location.lon]}
          icon={icon}
          eventHandlers={{ click: () => onSelect(street) }}
        >
          <Popup>
            <strong className="block text-sm text-steppe-100">
              {getStreetTitle(street, lang)}
            </strong>
            <span className="mt-0.5 block text-xs text-steppe-400">{street.name_kz}</span>
            <button
              type="button"
              onClick={() => onSelect(street)}
              className="mt-2 text-xs font-medium text-gold-400 underline-offset-2 hover:underline"
            >
              →
            </button>
          </Popup>
        </Marker>
      ))}

      <KeepSizeInSync />
      <FlyToSelected target={selectedTarget} />
      {fitOnChange && <FitToStreets items={located} />}
    </MapContainer>
  );
}
