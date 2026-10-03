/**
 * Routing Service
 * Orchestrates graph traversal, K-shortest paths execution, coordinate geometry generation,
 * cost analysis, multi-criteria optimization, and explanation generation.
 */

import { DEMO_NODES, DEMO_EDGES, DEMO_PRESETS } from '../data/demoGraph.js';
import { kShortestPaths } from '../algorithms/kShortestPaths.js';
import { calculateRouteCost } from './costService.js';
import { scoreAndRankRoutes } from './optimizationService.js';
import { generateRouteExplanation } from './explanationService.js';

/**
 * Builds directed adjacency graph from demo dataset
 */
function buildGraph() {
  const adjacencyMap = new Map();

  for (const nodeId of Object.keys(DEMO_NODES)) {
    adjacencyMap.set(nodeId, []);
  }

  let edgeCounter = 1;
  for (const edge of DEMO_EDGES) {
    const forwardEdge = {
      ...edge,
      edgeId: `e_${edge.u}_${edge.v}_${edgeCounter++}`,
      from: edge.u,
      to: edge.v
    };
    if (!adjacencyMap.has(edge.u)) adjacencyMap.set(edge.u, []);
    adjacencyMap.get(edge.u).push(forwardEdge);

    if (edge.bidirectional) {
      // Reverse waypoints for reverse direction
      const reversedWaypoints = edge.waypoints ? [...edge.waypoints].reverse() : null;
      const reverseEdge = {
        ...edge,
        edgeId: `e_${edge.v}_${edge.u}_${edgeCounter++}`,
        from: edge.v,
        to: edge.u,
        waypoints: reversedWaypoints
      };
      if (!adjacencyMap.has(edge.v)) adjacencyMap.set(edge.v, []);
      adjacencyMap.get(edge.v).push(reverseEdge);
    }
  }

  return adjacencyMap;
}

// Cached adjacency map
const ADJACENCY_MAP = buildGraph();

/**
 * Calculates Haversine distance in km between two lat/lng points
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Finds nearest graph node to given coordinates
 */
export function findNearestNode(lat, lng) {
  let nearest = null;
  let minDist = Infinity;

  for (const node of Object.values(DEMO_NODES)) {
    const d = haversineDistance(lat, lng, node.lat, node.lng);
    if (d < minDist) {
      minDist = d;
      nearest = node;
    }
  }

  return nearest;
}

/**
 * Resolves a location parameter (id, name query, or lat/lng) to a graph node
 */
export function resolveNode(query) {
  if (!query) return null;

  // Direct ID match
  if (typeof query === 'string' && DEMO_NODES[query]) {
    return DEMO_NODES[query];
  }

  // Lat/Lng object or comma-separated
  if (typeof query === 'object' && query.lat != null && query.lng != null) {
    return findNearestNode(Number(query.lat), Number(query.lng));
  }

  if (typeof query === 'string') {
    // Check if query is "lat,lng"
    const parts = query.split(',');
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return findNearestNode(parseFloat(parts[0]), parseFloat(parts[1]));
    }

    // Fuzzy text search across name and shortName
    const qLower = query.toLowerCase().trim();
    let bestMatch = null;
    let bestScore = 0;

    for (const node of Object.values(DEMO_NODES)) {
      const name = node.name.toLowerCase();
      const shortName = node.shortName.toLowerCase();
      const desc = (node.description || '').toLowerCase();

      if (name === qLower || shortName === qLower) {
        return node;
      }
      if (name.includes(qLower) || shortName.includes(qLower)) {
        return node;
      }
      if (desc.includes(qLower)) {
        return node;
      }
    }
  }

  return null;
}

/**
 * Derives a human-friendly corridor name from edge sequence
 */
/**
 * Derives a human-friendly corridor name from edge sequence
 */
function deriveRouteName(edges) {
  if (!edges || edges.length === 0) return 'Direct Path';

  // Count edge types or key road names
  const majorRoads = [];
  for (const e of edges) {
    const match = e.name.match(/(NH-\d+|SH-\d+|US-\d+|I-\d+|CA-\d+|Yadadri|Heritage|Keesara|Embarcadero|Bay Bridge|San Mateo Bridge|Dumbarton Bridge)/i);
    const roadTag = match ? match[0] : e.name.split(' ')[0];
    if (!majorRoads.includes(roadTag)) {
      majorRoads.push(roadTag);
    }
  }

  if (majorRoads.length === 1) {
    return `via ${majorRoads[0]}`;
  }
  if (majorRoads.length === 2) {
    return `via ${majorRoads[0]} & ${majorRoads[1]}`;
  }
  return `via ${majorRoads[0]} & ${majorRoads[1]} corridor`;
}

/**
 * Compiles continuous polyline coordinates from edge sequence
 */
function buildRoutePolyline(edges, originNode, destNode) {
  const coords = [];

  coords.push([originNode.lat, originNode.lng]);

  for (const edge of edges) {
    if (edge.waypoints && edge.waypoints.length > 0) {
      for (const pt of edge.waypoints) {
        const last = coords[coords.length - 1];
        if (!last || last[0] !== pt[0] || last[1] !== pt[1]) {
          coords.push(pt);
        }
      }
    } else {
      const targetNode = DEMO_NODES[edge.to];
      if (targetNode) {
        coords.push([targetNode.lat, targetNode.lng]);
      }
    }
  }

  const lastCoord = coords[coords.length - 1];
  if (!lastCoord || lastCoord[0] !== destNode.lat || lastCoord[1] !== destNode.lng) {
    coords.push([destNode.lat, destNode.lng]);
  }

  return coords;
}

/**
 * Main service to find and evaluate alternative routes
 */
export function findAndCompareRoutes({
  originQuery,
  destinationQuery,
  criteria = 'overall',
  vehicleSettings = {},
  customWeights = null,
  maxAlternatives = 4
}) {
  const originNode = resolveNode(originQuery);
  const destNode = resolveNode(destinationQuery);

  if (!originNode) {
    throw new Error(`Origin location "${originQuery}" could not be found or resolved to the road network.`);
  }

  if (!destNode) {
    throw new Error(`Destination location "${destinationQuery}" could not be found or resolved to the road network.`);
  }

  if (originNode.id === destNode.id) {
    throw new Error('Origin and Destination cannot be the same location.');
  }

  // Calculate nominal fuel cost per km for Dijkstra edge weight evaluation
  const mileage = Number(vehicleSettings.mileage) || 15.0;
  const fuelPrice = vehicleSettings.fuelPrice != null ? Number(vehicleSettings.fuelPrice) : 105.0;
  const fuelCostPerKm = mileage > 0 ? (fuelPrice / mileage) : 7.0;

  // Run Yen's K-Shortest Paths
  const rawPaths = kShortestPaths(ADJACENCY_MAP, originNode.id, destNode.id, maxAlternatives, {
    criteria,
    vehicleParams: {
      fuelCostPerKm
    }
  });

  if (!rawPaths || rawPaths.length === 0) {
    throw new Error(`No viable road paths connect ${originNode.name} to ${destNode.name}.`);
  }

  // Enhance each route with geometry, waypoint info, and costs
  const enrichedRoutes = rawPaths.map((p, idx) => {
    const routeName = deriveRouteName(p.edges);
    const polyline = buildRoutePolyline(p.edges, originNode, destNode);
    const waypoints = p.path.map((nodeId) => {
      const n = DEMO_NODES[nodeId];
      return {
        id: nodeId,
        name: n.shortName,
        fullName: n.name,
        lat: n.lat,
        lng: n.lng
      };
    });

    const costData = calculateRouteCost(p, vehicleSettings);

    // Segment turn-by-turn breakdown
    const segments = p.edges.map((e) => {
      const uNode = DEMO_NODES[e.from];
      const vNode = DEMO_NODES[e.to];
      const baseMins = (e.distance_km / Math.max(e.base_speed_kmh, 10)) * 60;
      const actualMins = baseMins * (e.congestion_factor || 1.0);
      const segToll = e.toll_cost != null ? e.toll_cost : (e.toll_usd || e.toll_inr || 0);

      return {
        from: uNode?.shortName || e.from,
        to: vNode?.shortName || e.to,
        roadName: e.name,
        roadType: e.road_type,
        distanceKm: e.distance_km,
        timeMinutes: parseFloat(actualMins.toFixed(1)),
        speedLimitKmh: e.base_speed_kmh,
        congestionMultiplier: e.congestion_factor || 1.0,
        toll: segToll,
        tollUsd: segToll // compatibility
      };
    });

    const totalToll = p.edges.reduce((sum, e) => sum + (e.toll_cost != null ? e.toll_cost : (e.toll_usd || e.toll_inr || 0)), 0);

    return {
      id: `route_${idx + 1}`,
      routeName: `Route ${idx + 1}: ${routeName}`,
      originName: originNode.shortName,
      destinationName: destNode.shortName,
      totalDistance: p.totalDistance,
      totalTimeMinutes: p.totalTimeMinutes,
      totalToll,
      totalTollUsd: totalToll, // compatibility
      costData,
      polyline,
      waypoints,
      segments
    };
  });

  // Rank routes according to criteria
  const rankedRoutes = scoreAndRankRoutes(enrichedRoutes, criteria, customWeights);

  // Generate explanation
  const explanation = generateRouteExplanation(rankedRoutes, criteria);

  return {
    origin: originNode,
    destination: destNode,
    recommendedRoute: rankedRoutes[0],
    routes: rankedRoutes,
    explanation: explanation.text || explanation.summary,
    explanationDetails: explanation,
    optimization: criteria,
    isDemoData: true,
    activeVehicle: vehicleSettings.vehicleType || vehicleSettings.type || 'car',
    routesCount: rankedRoutes.length,
    optimalRouteId: rankedRoutes[0].id,
    timestamp: new Date().toISOString()
  };
}

/**
 * Returns available graph nodes and presets for UI
 */
export function getAvailableLocations() {
  return {
    nodes: Object.values(DEMO_NODES),
    presets: DEMO_PRESETS
  };
}
