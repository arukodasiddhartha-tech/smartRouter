/**
 * Dijkstra's Shortest Path Algorithm
 * Features:
 * - Binary Min-Heap Priority Queue for O((V + E) log V) complexity
 * - Dynamic edge cost evaluation (time, distance, monetary cost, emissions, or custom composite)
 * - Edge and Node exclusion masks for Yen's K-Shortest Paths algorithm
 */

class MinPriorityQueue {
  constructor() {
    this.heap = [];
  }

  push(element, priority) {
    this.heap.push({ element, priority });
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.isEmpty()) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._sinkDown(0);
    }
    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  _bubbleUp(n) {
    const element = this.heap[n];
    while (n > 0) {
      const parentN = Math.floor((n - 1) / 2);
      const parent = this.heap[parentN];
      if (element.priority >= parent.priority) break;
      this.heap[parentN] = element;
      this.heap[n] = parent;
      n = parentN;
    }
  }

  _sinkDown(n) {
    const length = this.heap.length;
    const element = this.heap[n];
    while (true) {
      const leftChildN = 2 * n + 1;
      const rightChildN = 2 * n + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildN < length) {
        leftChild = this.heap[leftChildN];
        if (leftChild.priority < element.priority) {
          swap = leftChildN;
        }
      }

      if (rightChildN < length) {
        rightChild = this.heap[rightChildN];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildN;
        }
      }

      if (swap === null) break;
      this.heap[n] = this.heap[swap];
      this.heap[swap] = element;
      n = swap;
    }
  }
}

/**
 * Calculates default edge weight based on routing criteria
 */
export function defaultEdgeWeight(edge, criteria = 'overall', vehicleParams = null) {
  const baseMinutes = (edge.distance_km / Math.max(edge.base_speed_kmh, 10)) * 60;
  const congestedMinutes = baseMinutes * (edge.congestion_factor || 1.0);
  const toll = edge.toll_cost != null ? edge.toll_cost : (edge.toll_usd || edge.toll_inr || 0);
  const distance = edge.distance_km;

  const normCriteria = String(criteria || 'overall').toLowerCase();

  switch (normCriteria) {
    case 'fastest':
      // Primary factor is travel time, tiny distance tiebreaker
      return congestedMinutes + distance * 0.01;

    case 'shortest':
      // Distance is primary
      return distance + congestedMinutes * 0.05;

    case 'cheapest': {
      // Rough fuel cost per km + toll
      const fuelPerKm = vehicleParams?.fuelCostPerKm || 7.0; // ~₹7/km default
      const fuelCost = distance * fuelPerKm * (1 + ((edge.congestion_factor || 1.0) - 1.0) * 0.3);
      return fuelCost + toll + (congestedMinutes * 0.02);
    }

    case 'eco': {
      const ecoPenalty = ((edge.congestion_factor || 1.0) - 1.0) * 1.5;
      return distance * (1 + ecoPenalty);
    }

    case 'overall':
    case 'balanced':
    default:
      // Weighted combination: 40% time, 30% cost, 30% distance
      return (congestedMinutes * 0.4) + (distance * 0.3) + (toll * 0.3);
  }
}

/**
 * Executes Dijkstra's algorithm on adjacency list
 * @param {Map<string, Array>} adjacencyMap - node -> list of edges { to, edgeId, distance_km, base_speed_kmh, ... }
 * @param {string} source - Start node ID
 * @param {string} target - Destination node ID
 * @param {Object} options - Options including criteria, excludedNodes, excludedEdges, weightFn
 */
export function dijkstra(adjacencyMap, source, target, options = {}) {
  const {
    criteria = 'fastest',
    vehicleParams = null,
    excludedNodes = new Set(),
    excludedEdges = new Set(),
    weightFn = null
  } = options;

  if (excludedNodes.has(source) || excludedNodes.has(target)) {
    return null;
  }

  const getWeight = weightFn || ((edge) => defaultEdgeWeight(edge, criteria, vehicleParams));

  const distances = new Map();
  const previous = new Map(); // node -> { fromNode, edge }
  const pq = new MinPriorityQueue();

  distances.set(source, 0);
  pq.push(source, 0);

  const visited = new Set();

  while (!pq.isEmpty()) {
    const { element: u, priority: currentDist } = pq.pop();

    if (u === target) {
      // Reconstruct path
      const path = [];
      const edges = [];
      let curr = target;

      while (curr !== source) {
        const prevInfo = previous.get(curr);
        if (!prevInfo) break;
        path.unshift(curr);
        edges.unshift(prevInfo.edge);
        curr = prevInfo.fromNode;
      }
      path.unshift(source);

      // Compute aggregates
      let totalDistance = 0;
      let totalTime = 0;
      let totalToll = 0;

      for (const e of edges) {
        totalDistance += e.distance_km;
        const baseMins = (e.distance_km / Math.max(e.base_speed_kmh, 10)) * 60;
        const actualMins = baseMins * (e.congestion_factor || 1.0);
        totalTime += actualMins;
        totalToll += (e.toll_usd || 0);
      }

      return {
        path,
        edges,
        weight: currentDist,
        totalDistance: parseFloat(totalDistance.toFixed(2)),
        totalTimeMinutes: parseFloat(totalTime.toFixed(1)),
        totalTollUsd: parseFloat(totalToll.toFixed(2))
      };
    }

    if (visited.has(u)) continue;
    visited.add(u);

    const neighbors = adjacencyMap.get(u) || [];
    for (const edge of neighbors) {
      const v = edge.to;
      const edgeKey = edge.edgeId || `${u}->${v}`;

      if (excludedNodes.has(v)) continue;
      if (excludedEdges.has(edgeKey)) continue;

      const edgeWeight = getWeight(edge);
      const newDist = currentDist + edgeWeight;

      if (!distances.has(v) || newDist < distances.get(v)) {
        distances.set(v, newDist);
        previous.set(v, { fromNode: u, edge });
        pq.push(v, newDist);
      }
    }
  }

  return null;
}
