import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Crosshair, Loader2, Check, AlertCircle, Sparkles } from 'lucide-react';

// Custom SVG DivIcon matching GIFTPocket branding
const createCustomMarker = () => {
  return L.divIcon({
    className: 'custom-giftpocket-marker',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translate(-50%, -100%);">
        <div style="position: absolute; bottom: 0; width: 34px; height: 34px; border-radius: 50%; background: rgba(185, 111, 88, 0.3); animation: ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="position: relative; width: 34px; height: 34px; border-radius: 50% 50% 50% 0; background: linear-gradient(135deg, #B96F58, #8E4A35); transform: rotate(-45deg); box-shadow: 0 4px 12px rgba(0,0,0,0.35); border: 2.5px solid #FFFFFF; display: flex; align-items: center; justify-content: center;">
          <div style="width: 10px; height: 10px; border-radius: 50%; background: #FFFFFF; transform: rotate(45deg); box-shadow: 0 0 4px rgba(0,0,0,0.2);"></div>
        </div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34]
  });
};

export const LocationPickerMap = ({ onLocationResolved, initialAddress = '' }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const [coords, setCoords] = useState({ lat: 12.9716, lng: 77.5946 }); // Default Bengaluru center
  const [isLocating, setIsLocating] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [resolvedAddress, setResolvedAddress] = useState('');
  const [geoStatus, setGeoStatus] = useState({ type: '', message: '' });

  // Reverse geocoding using OpenStreetMap Nominatim
  const reverseGeocode = useCallback(async (lat, lng) => {
    setIsGeocoding(true);
    setGeoStatus({ type: 'loading', message: 'Resolving address details...' });

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'GIFTPocketStoreCheckout/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Reverse geocoding network response failed');
      }

      const data = await response.json();
      const addr = data.address || {};

      // Build structured parts
      const houseNumber = addr.house_number || addr.building || '';
      const road = addr.road || addr.pedestrian || addr.suburb || addr.neighbourhood || '';
      const neighbourhood = addr.neighbourhood || addr.suburb || addr.residential || '';
      const city = addr.city || addr.town || addr.municipality || addr.village || addr.county || 'Bengaluru';
      const state = addr.state || 'Karnataka';
      const pincode = addr.postcode || '';

      // Formatted text lines
      const streetLines = [
        houseNumber ? `No. ${houseNumber}` : '',
        road,
        neighbourhood && neighbourhood !== road ? neighbourhood : ''
      ].filter(Boolean).join(', ');

      const formattedLocationText = streetLines || data.display_name?.split(',').slice(0, 3).join(', ') || 'Selected Location';

      setResolvedAddress(formattedLocationText);
      setGeoStatus({
        type: 'success',
        message: `Location detected: ${lat.toFixed(4)}, ${lng.toFixed(4)}`
      });

      if (onLocationResolved) {
        onLocationResolved({
          street: formattedLocationText,
          city,
          state,
          pincode,
          fullAddress: data.display_name || '',
          lat: Number(lat.toFixed(6)),
          lng: Number(lng.toFixed(6)),
          mapLocationUrl: `https://www.google.com/maps?q=${lat},${lng}`
        });
      }
    } catch (err) {
      console.warn('Geocoding error:', err);
      const fallbackText = `GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      setResolvedAddress(fallbackText);
      setGeoStatus({
        type: 'warning',
        message: 'Pin set on map (Coordinates captured). Please check details.'
      });

      if (onLocationResolved) {
        onLocationResolved({
          street: fallbackText,
          lat: Number(lat.toFixed(6)),
          lng: Number(lng.toFixed(6)),
          mapLocationUrl: `https://www.google.com/maps?q=${lat},${lng}`
        });
      }
    } finally {
      setIsGeocoding(false);
    }
  }, [onLocationResolved]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [coords.lat, coords.lng],
        zoom: 14,
        zoomControl: true,
        attributionControl: false
      });

      // Standard OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      // Custom marker
      const marker = L.marker([coords.lat, coords.lng], {
        icon: createCustomMarker(),
        draggable: true
      }).addTo(map);

      // Marker drag event
      marker.on('dragend', (e) => {
        const newPos = e.target.getLatLng();
        setCoords({ lat: newPos.lat, lng: newPos.lng });
        reverseGeocode(newPos.lat, newPos.lng);
      });

      // Map click event
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        setCoords({ lat, lng });
        reverseGeocode(lat, lng);
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;

      // Invalidate size in case parent layout shifts
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []); // Run once on mount

  // Handle "Use Current Location" (Browser Geolocation)
  const handleDetectCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus({
        type: 'error',
        message: 'Geolocation is not supported by your browser.'
      });
      return;
    }

    setIsLocating(true);
    setGeoStatus({
      type: 'loading',
      message: 'Requesting GPS satellite & device location...'
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });

        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 16, { animate: true });
        }
        if (markerRef.current) {
          markerRef.current.setLatLng([latitude, longitude]);
        }

        reverseGeocode(latitude, longitude);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        let errorText = 'Unable to retrieve your location.';
        if (error.code === error.PERMISSION_DENIED) {
          errorText = 'Location permission denied. Please allow location access in your browser or click on the map to pin.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorText = 'Location position unavailable. Please click directly on the map.';
        } else if (error.code === error.TIMEOUT) {
          errorText = 'Location request timed out. Please try again or tap the map.';
        }
        setGeoStatus({ type: 'error', message: errorText });
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="space-y-2.5">
      {/* Map Control Bar & Location Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#F8E8D5]/60 p-3 rounded-2xl border border-[#D9A99A]/50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#B96F58] text-white flex items-center justify-center shrink-0 shadow-xs">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-[#332822] text-xs">
              Pinpoint Exact Delivery Location
            </h4>
            <p className="text-[11px] text-[#6F5145]">
              Tap button or drag pin to auto-fill your delivery address
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDetectCurrentLocation}
          disabled={isLocating || isGeocoding}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-[#B96F58] to-[#9E5743] hover:from-[#332822] hover:to-[#332822] text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-60 cursor-pointer shrink-0"
        >
          {isLocating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Detecting GPS...</span>
            </>
          ) : (
            <>
              <Navigation className="w-3.5 h-3.5" />
              <span>Use Current Location</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Map Box */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#D9A99A]/60 shadow-inner bg-[#F4D2BE]/30">
        <div
          ref={mapContainerRef}
          className="w-full h-56 sm:h-64 z-[1]"
          style={{ minHeight: '220px' }}
        />

        {/* Floating Map Helper Badge */}
        <div className="absolute top-2.5 left-2.5 z-[2] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#D9A99A]/60 shadow-xs flex items-center gap-1.5 text-[10px] text-[#332822] font-semibold pointer-events-none">
          <Crosshair className="w-3 h-3 text-[#B96F58]" />
          <span>Click anywhere on map to reposition pin</span>
        </div>

        {/* Loading Overlay */}
        {(isLocating || isGeocoding) && (
          <div className="absolute inset-0 z-[3] bg-white/70 backdrop-blur-[2px] flex items-center justify-center gap-2 text-xs font-bold text-[#B96F58]">
            <Loader2 className="w-4 h-4 animate-spin text-[#B96F58]" />
            <span>{isLocating ? 'Locating your GPS coordinates...' : 'Fetching address details...'}</span>
          </div>
        )}
      </div>

      {/* Geolocation Status Feedback Alert */}
      {geoStatus.message && (
        <div
          className={`px-3 py-2 rounded-xl text-[11px] font-medium flex items-center gap-2 border transition-all ${
            geoStatus.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : geoStatus.type === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : geoStatus.type === 'warning'
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : 'bg-blue-50 text-blue-800 border-blue-200'
          }`}
        >
          {geoStatus.type === 'success' && <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600" />}
          {geoStatus.type === 'error' && <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />}
          {geoStatus.type === 'warning' && <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />}
          {geoStatus.type === 'loading' && <Loader2 className="w-3.5 h-3.5 shrink-0 animate-spin text-blue-600" />}
          <span className="flex-1">{geoStatus.message}</span>
        </div>
      )}
    </div>
  );
};
