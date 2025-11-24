import { useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { storeLocations } from '@/data/content-pages';
import { Seo } from '@/components/layout/Seo';

export const StoreLocatorPage = () => {
  const canRenderMap = typeof window !== 'undefined';
  const center = useMemo(() => ({ lat: 45.512, lng: -73.56 }), []);

  return (
    <div className="grid gap-8 rounded-3xl border border-slate-100 bg-white p-8 lg:grid-cols-2">
      <Seo title="Store locator" description="Find our ateliers and pick-up partners." />
      <div>
        <h1 className="text-3xl font-semibold text-ink">Store locator</h1>
        <ul className="mt-4 space-y-4">
          {storeLocations.map((store) => (
            <li key={store.id} className="rounded-2xl border border-slate-100 p-4">
              <p className="text-lg font-semibold text-ink">{store.name}</p>
              <p className="text-sm text-ink/70">{store.address}</p>
              <p className="text-sm text-ink/70">{store.phone}</p>
              <p className="text-xs text-ink/50">{store.schedule}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-96 rounded-3xl overflow-hidden">
        {canRenderMap ? (
          <MapContainer center={center} zoom={12} className="h-full w-full">
            <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {storeLocations.map((store) => (
              <Marker key={store.id} position={[store.coordinates.lat, store.coordinates.lng]}>
                <Popup>
                  <strong>{store.name}</strong>
                  <br />
                  {store.address}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <p className="p-6 text-sm text-ink/70">Map loading…</p>
        )}
      </div>
    </div>
  );
};
