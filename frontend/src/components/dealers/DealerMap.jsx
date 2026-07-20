'use client';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

// Fix Leaflet marker icon issue in webpack/Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom red user-location marker
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

/** Dynamically pan/zoom the map whenever filtered dealers or user location change. */
function LocationUpdater({ location, dealers }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo(location, 12);
    } else if (dealers && dealers.length > 0) {
      if (dealers.length === 1) {
        map.flyTo([dealers[0].lat, dealers[0].lng], 12);
      } else {
        const bounds = L.latLngBounds(dealers.map((d) => [d.lat, d.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } else {
      map.flyTo([20.5937, 78.9629], 4);
    }
  }, [location, dealers, map]);
  return null;
}

export default function DealerMap({ filteredDealers }) {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  // Inject dark-mode tile filter via a stylesheet rather than styled-jsx
  // (styled-jsx is not available in the Next.js App Router by default)
  useEffect(() => {
    const styleId = 'dealer-map-styles';
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .dealer-map-tiles {
        filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
      }
      .leaflet-container {
        background: #000 !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.getElementById(styleId)?.remove();
    };
  }, []);

  const defaultCenter = [20.5937, 78.9629]; // India geographic centre
  const defaultZoom = 4;

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation([coords.latitude, coords.longitude]);
        setError(null);
      },
      () => setError('Unable to retrieve your location.'),
    );
  };

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-3xl overflow-hidden border border-white/10 z-0">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="dealer-map-tiles"
        />

        <LocationUpdater location={userLocation} dealers={filteredDealers} />

        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="font-heading text-sm font-bold text-black">You are here</div>
            </Popup>
          </Marker>
        )}

        {filteredDealers?.map((dealer) => (
          <Marker key={dealer.id} position={[dealer.lat, dealer.lng]}>
            <Popup>
              <div className="font-heading text-black">
                <h4 className="font-bold text-sm">{dealer.name}</h4>
                <p className="text-xs mt-1 text-gray-700">{dealer.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Locate Me overlay button */}
      <div className="absolute top-4 right-4 z-[400]">
        <button
          type="button"
          onClick={handleGetLocation}
          className="bg-black/80 backdrop-blur-sm border border-accent/30 hover:border-accent text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors text-xs font-heading tracking-wider uppercase font-bold shadow-lg"
        >
          <MapPin className="w-4 h-4 text-accent" aria-hidden />
          {userLocation ? 'Update Location' : 'Locate Me'}
        </button>
        {error && (
          <div className="mt-2 text-red-400 text-[10px] bg-black/60 px-2 py-1 rounded" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
