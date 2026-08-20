import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { Issue } from '../types';
import { MapPin, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface MapViewProps {
  issues: Issue[];
  selectedIssueId?: string;
  onSelectIssue?: (issue: Issue) => void;
  className?: string;
  height?: string;
}

export default function MapView({ 
  issues, 
  selectedIssueId, 
  onSelectIssue,
  className = '',
  height = '500px'
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const navigate = useNavigate();

  // Create custom colored pins for Leaflet
  const createPinIcon = (status: string, priority: string) => {
    let color = '#f59e0b'; // Amber / Orange by default (Em análise / Em atendimento)
    if (status === 'Resolvido') {
      color = '#10b981'; // Green
    } else if (priority === 'Urgente' || priority === 'Alta') {
      color = '#ef4444'; // Red
    }

    const svgHtml = `
      <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
        <div style="
          position: absolute;
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          background: ${color};
          transform: rotate(-45deg);
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          border: 2px solid #ffffff;
        "></div>
        <div style="
          position: relative;
          z-index: 10;
          width: 10px;
          height: 10px;
          background: #ffffff;
          border-radius: 50%;
          margin-top: -4px;
        "></div>
      </div>
    `;

    return L.divIcon({
      className: 'custom-leaflet-pin',
      html: svgHtml,
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -32],
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default to Sao Paulo / Brazil urban center coordinate
      const defaultCenter: [number, number] = [-23.55052, -46.633308];
      
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker: L.Marker) => {
      if (marker && typeof marker.remove === 'function') {
        marker.remove();
      }
    });
    markersRef.current = {};

    const validCoordinates: L.LatLngExpression[] = [];

    issues.forEach((issue, index) => {
      // If issue has no explicit coords, generate reproducible realistic points near center
      let lat = issue.latitude;
      let lng = issue.longitude;

      if (!lat || !lng) {
        // Deterministic offset based on ID or index
        const angle = (index * 137.5) * (Math.PI / 180);
        const radius = 0.015 + ((index % 5) * 0.008);
        lat = -23.55052 + (radius * Math.sin(angle));
        lng = -46.633308 + (radius * Math.cos(angle));
      }

      const position: [number, number] = [lat, lng];
      validCoordinates.push(position);

      const marker = L.marker(position, {
        icon: createPinIcon(issue.status, issue.priority),
        title: issue.protocol,
      }).addTo(map);

      const statusBadge = issue.status === 'Resolvido'
        ? '<span style="background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 700;">🟢 Resolvido</span>'
        : issue.priority === 'Urgente'
          ? '<span style="background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 700;">🔴 Urgente</span>'
          : '<span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 700;">🟠 Em análise</span>';

      const popupContent = `
        <div style="font-family: system-ui, sans-serif; min-width: 220px; padding: 4px;">
          <div style="font-size: 11px; font-family: monospace; color: #6b7280; font-weight: 700; margin-bottom: 4px;">
            ${issue.protocol}
          </div>
          <div style="font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 4px;">
            ${issue.category}
          </div>
          <div style="font-size: 12px; color: #4b5563; margin-bottom: 8px;">
            📍 ${issue.address}
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px; padding-top: 8px; border-top: 1px solid #f3f4f6;">
            <div>${statusBadge}</div>
            <a href="/issue/${issue.protocol}" style="
              display: inline-flex;
              align-items: center;
              gap: 4px;
              background: #2563eb;
              color: #ffffff;
              font-size: 11px;
              font-weight: 600;
              padding: 4px 10px;
              border-radius: 6px;
              text-decoration: none;
            ">
              Ver Detalhes &rarr;
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        if (onSelectIssue) onSelectIssue(issue);
      });

      if (issue.id) {
        markersRef.current[issue.id] = marker;
      }
    });

    if (validCoordinates.length > 0) {
      const bounds = L.latLngBounds(validCoordinates);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }

    // Force redraw on resize
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

  }, [issues]);

  useEffect(() => {
    if (selectedIssueId && markersRef.current[selectedIssueId]) {
      const marker = markersRef.current[selectedIssueId];
      marker.openPopup();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo(marker.getLatLng(), { animate: true });
      }
    }
  }, [selectedIssueId]);

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-zinc-200 shadow-sm ${className}`}>
      {/* Legend overlay */}
      <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-zinc-200 shadow-md text-xs space-y-1.5 pointer-events-auto">
        <span className="font-bold text-zinc-900 block border-b border-zinc-100 pb-1 mb-1">
          Legenda do Mapa
        </span>
        <div className="flex items-center gap-2 text-zinc-700">
          <span className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-200"></span>
          <span>🔴 Problemas Urgentes / Alta</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-700">
          <span className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-200"></span>
          <span>🟠 Em análise / Em andamento</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-700">
          <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></span>
          <span>🟢 Problemas Resolvidos</span>
        </div>
      </div>

      {/* Map container */}
      <div ref={mapContainerRef} style={{ height }} className="w-full z-0" />
    </div>
  );
}
