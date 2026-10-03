import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { formatTime, formatDistance, formatCurrency } from '../utils/formatters';

// Custom SVG Icons created with L.divIcon to avoid Vite asset bundling path bugs
const createPinIcon = (color, label) => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
        <div style="background: ${color}; color: #ffffff; font-weight: bold; font-size: 11px; padding: 4px 8px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.5); border: 2px solid #ffffff; white-space: nowrap;">
          ${label}
        </div>
        <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid ${color};"></div>
      </div>
    `,
    iconSize: [0, 0]
  });
};

const waypointIcon = L.divIcon({
  className: 'custom-waypoint',
  html: `
    <div style="width: 10px; height: 10px; background-color: #38bdf8; border: 2px solid #ffffff; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,0.6); transform: translate(-50%, -50%);"></div>
  `,
  iconSize: [0, 0]
});

// Auto bounds adjuster
function MapBoundsUpdater({ routes, selectedRoute }) {
  const map = useMap();

  useEffect(() => {
    if (!routes || routes.length === 0) return;

    // Build bounds from all coordinates of the selected route, or all routes
    const activeRoute = selectedRoute || routes[0];
    if (activeRoute && activeRoute.polyline && activeRoute.polyline.length > 0) {
      const bounds = L.latLngBounds(activeRoute.polyline);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13, animate: true });
    }
  }, [routes, selectedRoute, map]);

  return null;
}

export function RouteMap({
  routes = [],
  selectedRouteId,
  hoveredRouteId,
  onSelectRoute,
  routeColors = ['#10b981', '#3b82f6', '#a855f7', '#f59e0b'],
  origin,
  destination
}) {
  const defaultCenter = [37.55, -122.25]; // San Francisco Bay Area center
  const defaultZoom = 10;

  const selectedRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  // Map Tile layer URL: CartoDB Dark Matter for futuristic sleek visual
  const darkTiles = 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png';
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  return (
    <div className="relative w-full h-full min-h-[420px] bg-slate-950 overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
        style={{ minHeight: '100%' }}
      >
        <TileLayer attribution={attribution} url={darkTiles} />

        <MapBoundsUpdater routes={routes} selectedRoute={selectedRoute} />

        {/* Polylines for each route (render unselected first, selected last for top layering) */}
        {routes
          .map((route, idx) => ({ route, idx }))
          .sort((a, b) => {
            const aIsActive = a.route.id === selectedRouteId || a.route.id === hoveredRouteId;
            const bIsActive = b.route.id === selectedRouteId || b.route.id === hoveredRouteId;
            return aIsActive === bIsActive ? 0 : aIsActive ? 1 : -1;
          })
          .map(({ route, idx }) => {
            const isSelected = route.id === selectedRouteId;
            const isHovered = route.id === hoveredRouteId;
            const color = routeColors[route.routeIndex ?? idx] || '#10b981';

            const weight = isSelected ? 6 : isHovered ? 5 : 3.5;
            const opacity = isSelected ? 0.95 : isHovered ? 0.85 : 0.45;
            const dashArray = isSelected ? null : null;

            return (
              <Polyline
                key={route.id}
                positions={route.polyline}
                pathOptions={{
                  color,
                  weight,
                  opacity,
                  dashArray,
                  lineJoin: 'round',
                  lineCap: 'round'
                }}
                eventHandlers={{
                  click: () => onSelectRoute(route),
                  mouseover: (e) => {
                    e.target.setStyle({ weight: weight + 2, opacity: 1 });
                  },
                  mouseout: (e) => {
                    e.target.setStyle({ weight, opacity });
                  }
                }}
              >
                <Popup>
                  <div className="text-xs space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                      {route.routeName}
                    </div>
                    <div className="text-slate-300">
                      Time: <strong className="text-white">{formatTime(route.totalTimeMinutes)}</strong> • Dist: <strong>{formatDistance(route.totalDistance)}</strong>
                    </div>
                    <div className="text-slate-300">
                      Cost: <strong>{formatCurrency(route.costData.totalDirectCostUsd)}</strong> (Tolls: {formatCurrency(route.costData.tollCostUsd)})
                    </div>
                    <div className="text-emerald-400 font-semibold pt-1">
                      Score: {route.score}/100 {route.isOptimal && '• Recommended'}
                    </div>
                  </div>
                </Popup>
              </Polyline>
            );
          })}

        {/* Waypoints of selected route */}
        {selectedRoute?.waypoints?.map((wp, idx) => {
          // Don't render waypoint icon on start or end (they have dedicated pins)
          if (idx === 0 || idx === selectedRoute.waypoints.length - 1) return null;
          return (
            <Marker key={`wp-${idx}-${wp.id}`} position={[wp.lat, wp.lng]} icon={waypointIcon}>
              <Popup>
                <div className="text-xs">
                  <strong className="text-white">{wp.fullName || wp.name}</strong>
                  <div className="text-slate-400 text-[10px]">Intermediate Junction</div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Origin Marker */}
        {origin && origin.lat && origin.lng && (
          <Marker
            position={[origin.lat, origin.lng]}
            icon={createPinIcon('#10b981', `Start: ${origin.shortName || 'Origin'}`)}
          >
            <Popup>
              <div className="text-xs">
                <strong className="text-emerald-400">Trip Origin</strong>
                <p className="text-white font-medium">{origin.name}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Destination Marker */}
        {destination && destination.lat && destination.lng && (
          <Marker
            position={[destination.lat, destination.lng]}
            icon={createPinIcon('#f43f5e', `End: ${destination.shortName || 'Destination'}`)}
          >
            <Popup>
              <div className="text-xs">
                <strong className="text-rose-400">Trip Destination</strong>
                <p className="text-white font-medium">{destination.name}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Floating Map Legend */}
      <div className="absolute top-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 shadow-xl text-xs space-y-1.5 max-w-[200px]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Route Corridors ({routes.length})
        </div>
        {routes.map((r, idx) => {
          const isSelected = r.id === selectedRouteId;
          const color = routeColors[r.routeIndex ?? idx] || '#10b981';
          return (
            <button
              key={r.id}
              onClick={() => onSelectRoute(r)}
              className={`w-full flex items-center justify-between text-left p-1 rounded transition ${
                isSelected ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="truncate text-[11px]">{r.routeName.replace('Route ', 'R')}</span>
              </div>
              <span className="text-[10px] font-mono shrink-0 ml-1 font-semibold">
                {r.score}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RouteMap;
