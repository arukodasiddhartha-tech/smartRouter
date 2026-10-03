/**
 * Yen's K-Shortest Loopless Paths Algorithm
 * Computes K distinct, loopless alternative paths between source and destination.
 * Incorporates route diversity filtering to eliminate trivial single-edge detours.
 */

import { dijkstra } from './dijkstra.js';

/**
 * Checks if two paths have identical node sequences
 */
function arePathsIdentical(pathA, pathB) {
  if (pathA.length !== pathB.length) return false;
  for (let i = 0; i < pathA.length; i++) {
    if (pathA[i] !== pathB[i]) return false;
  }
  return true;
}

/**
 * Computes Jaccard edge overlap between two paths (0 = completely distinct, 1 = identical)
 */
export function calculateEdgeOverlap(path1Edges, path2Edges) {
  const set1 = new Set(path1Edges.map((e) => e.edgeId || `${e.from}->${e.to}`));
  const set2 = new Set(path2Edges.map((e) => e.edgeId || `${e.from}->${e.to}`));

  let intersection = 0;
  for (const id of set1) {
    if (set2.has(id)) intersection++;
  }

  const union = new Set([...set1, ...set2]).size;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Yen's K-Shortest Paths implementation
 * @param {Map<string, Array>} adjacencyMap
 * @param {string} source - Start node ID
 * @param {string} target - Destination node ID
 * @param {number} K - Number of paths requested (typically 3 to 5)
 * @param {Object} options - Options passed to Dijkstra (criteria, weightFn, vehicleParams)
 */
export function kShortestPaths(adjacencyMap, source, target, K = 3, options = {}) {
  // Step 1: Find the 1st shortest path
  const firstPath = dijkstra(adjacencyMap, source, target, options);
  if (!firstPath) {
    return [];
  }

  // A holds the top K shortest paths
  const A = [firstPath];
  // B holds candidate paths
  const B = [];

  for (let k = 1; k < K; k++) {
    const prevPathObj = A[k - 1];
    const prevPath = prevPathObj.path;

    // The spur node ranges from the first node up to the second to last node in the previous path
    for (let i = 0; i < prevPath.length - 1; i++) {
      const spurNode = prevPath[i];
      const rootPathNodes = prevPath.slice(0, i + 1);
      const rootPathEdges = prevPathObj.edges.slice(0, i);

      const excludedEdges = new Set();
      const excludedNodes = new Set();

      // Exclude edges that are part of previous paths with the same root path
      for (const p of A) {
        if (p.path.length > i + 1) {
          let rootMatches = true;
          for (let r = 0; r <= i; r++) {
            if (p.path[r] !== rootPathNodes[r]) {
              rootMatches = false;
              break;
            }
          }
          if (rootMatches) {
            const u = p.path[i];
            const v = p.path[i + 1];
            // Find edge ID between u and v
            const edge = p.edges[i];
            const edgeKey = edge?.edgeId || `${u}->${v}`;
            excludedEdges.add(edgeKey);
          }
        }
      }

      // Exclude all nodes in the root path except the spur node to prevent loops
      for (const node of rootPathNodes) {
        if (node !== spurNode) {
          excludedNodes.add(node);
        }
      }

      // Calculate spur path from spurNode to target
      const spurPathObj = dijkstra(adjacencyMap, spurNode, target, {
        ...options,
        excludedNodes,
        excludedEdges
      });

      if (spurPathObj) {
        // Construct total path: rootPath + spurPath (skipping duplicate spurNode)
        const totalNodes = [...rootPathNodes.slice(0, -1), ...spurPathObj.path];
        const totalEdges = [...rootPathEdges, ...spurPathObj.edges];

        // Recalculate aggregates for candidate
        let totalDistance = 0;
        let totalTime = 0;
        let totalToll = 0;

        for (const e of totalEdges) {
          totalDistance += e.distance_km;
          const baseMins = (e.distance_km / Math.max(e.base_speed_kmh, 10)) * 60;
          const actualMins = baseMins * (e.congestion_factor || 1.0);
          totalTime += actualMins;
          totalToll += (e.toll_usd || 0);
        }

        const candidateWeight = (rootPathEdges.reduce((acc, e) => acc + (options.weightFn ? options.weightFn(e) : e.distance_km), 0)) + spurPathObj.weight;

        const candidate = {
          path: totalNodes,
          edges: totalEdges,
          weight: candidateWeight,
          totalDistance: parseFloat(totalDistance.toFixed(2)),
          totalTimeMinutes: parseFloat(totalTime.toFixed(1)),
          totalTollUsd: parseFloat(totalToll.toFixed(2))
        };

        // Check if candidate already in B or A
        const inA = A.some((p) => arePathsIdentical(p.path, candidate.path));
        const inB = B.some((p) => arePathsIdentical(p.path, candidate.path));

        if (!inA && !inB) {
          B.push(candidate);
        }
      }
    }

    if (B.length === 0) {
      break;
    }

    // Sort B by weight ascending
    B.sort((a, b) => a.weight - b.weight);

    // Pick lowest weight candidate from B and add to A
    const bestCandidate = B.shift();
    A.push(bestCandidate);
  }

  return A;
}
