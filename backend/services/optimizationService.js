/**
 * Multi-Criteria Optimization Service
 * Implements Multi-Attribute Utility Theory (MAUT) to score, rank, and evaluate routes.
 *
 * Formula:
 *   Overall Score = normalized_distance * distance_weight
 *                 + normalized_time * time_weight
 *                 + normalized_cost * cost_weight
 *
 * Where:
 *   Lower score = better route (0.00 is best, 1.00 is worst)
 */

export const DEFAULT_OPTIMIZATION_WEIGHTS = {
  overall: { distance: 0.30, time: 0.40, cost: 0.30 },
  balanced: { distance: 0.30, time: 0.40, cost: 0.30 },
  shortest: { distance: 1.00, time: 0.00, cost: 0.00 },
  fastest: { distance: 0.00, time: 1.00, cost: 0.00 },
  cheapest: { distance: 0.00, time: 0.00, cost: 1.00 }
};

/**
 * Normalizes values between 0.0 and 1.0 (0 = best/lowest, 1 = worst/highest)
 */
export function normalizeMetric(value, min, max) {
  if (max === min || isNaN(value)) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

/**
 * Scores and ranks candidate routes based on preferences
 * @param {Array} routes - List of routes with distance, time, and costData
 * @param {string} criteria - 'overall' | 'shortest' | 'fastest' | 'cheapest' | 'custom'
 * @param {Object} customWeights - Custom user weights { distance, time, cost }
 */
export function scoreAndRankRoutes(routes, criteria = 'overall', customWeights = null) {
  if (!routes || routes.length === 0) return [];

  const normCriteria = String(criteria || 'overall').toLowerCase();

  // Determine active weight vector
  let weights;
  if (customWeights && (normCriteria === 'custom' || normCriteria === 'overall')) {
    const rawDist = Math.max(0, Number(customWeights.distance) || 0);
    const rawTime = Math.max(0, Number(customWeights.time) || 0);
    const rawCost = Math.max(0, Number(customWeights.cost) || 0);
    const sum = rawDist + rawTime + rawCost;
    if (sum > 0) {
      weights = {
        distance: rawDist / sum,
        time: rawTime / sum,
        cost: rawCost / sum
      };
    } else {
      weights = DEFAULT_OPTIMIZATION_WEIGHTS.overall;
    }
  } else {
    weights = DEFAULT_OPTIMIZATION_WEIGHTS[normCriteria] || DEFAULT_OPTIMIZATION_WEIGHTS.overall;
  }

  // Extract min and max ranges across all candidate routes
  const times = routes.map((r) => r.totalTimeMinutes || 0);
  const dists = routes.map((r) => r.totalDistance || 0);
  const costs = routes.map((r) => {
    return r.costData?.totalCost != null
      ? r.costData.totalCost
      : (r.costData?.totalDirectCostUsd || 0);
  });

  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);

  const minDist = Math.min(...dists);
  const maxDist = Math.max(...dists);

  const minCost = Math.min(...costs);
  const maxCost = Math.max(...costs);

  // Compute composite score for each route:
  // Overall Score = normalized_distance * distance_weight
  //               + normalized_time * time_weight
  //               + normalized_cost * cost_weight
  // (Lower score = better route)
  const scoredRoutes = routes.map((route, idx) => {
    const routeCost = route.costData?.totalCost != null
      ? route.costData.totalCost
      : (route.costData?.totalDirectCostUsd || 0);

    const normDist = normalizeMetric(route.totalDistance, minDist, maxDist);
    const normTime = normalizeMetric(route.totalTimeMinutes, minTime, maxTime);
    const normCost = normalizeMetric(routeCost, minCost, maxCost);

    // Composite score
    const overallScoreRaw =
      normDist * weights.distance +
      normTime * weights.time +
      normCost * weights.cost;

    const overallScore = parseFloat(overallScoreRaw.toFixed(2));

    // Descriptive badges
    const tags = [];
    if (route.totalDistance === minDist) tags.push({ label: 'Shortest Distance', type: 'blue' });
    if (route.totalTimeMinutes === minTime) tags.push({ label: 'Fastest Time', type: 'emerald' });
    if (routeCost === minCost) tags.push({ label: 'Lowest Cost', type: 'amber' });
    const tolls = route.costData?.tollCost != null ? route.costData.tollCost : (route.totalTollUsd || 0);
    if (tolls === 0) tags.push({ label: 'Toll-Free', type: 'indigo' });

    return {
      ...route,
      routeIndex: idx,
      score: overallScore, // Lower is better (e.g. 0.32)
      overallScore,
      normalizedMetrics: {
        normalized_distance: parseFloat(normDist.toFixed(2)),
        normalized_time: parseFloat(normTime.toFixed(2)),
        normalized_cost: parseFloat(normCost.toFixed(2))
      },
      weightsUsed: weights,
      tags
    };
  });

  // Sort according to criteria:
  // - Shortest: sort primarily by totalDistance ascending
  // - Fastest: sort primarily by totalTimeMinutes ascending
  // - Cheapest: sort primarily by totalCost ascending
  // - Overall / Custom: sort primarily by overallScore ascending (lower score = better)
  scoredRoutes.sort((a, b) => {
    const costA = a.costData?.totalCost ?? a.costData?.totalDirectCostUsd ?? 0;
    const costB = b.costData?.totalCost ?? b.costData?.totalDirectCostUsd ?? 0;

    if (normCriteria === 'shortest') {
      if (a.totalDistance !== b.totalDistance) return a.totalDistance - b.totalDistance;
      return a.overallScore - b.overallScore;
    }
    if (normCriteria === 'fastest') {
      if (a.totalTimeMinutes !== b.totalTimeMinutes) return a.totalTimeMinutes - b.totalTimeMinutes;
      return a.overallScore - b.overallScore;
    }
    if (normCriteria === 'cheapest') {
      if (costA !== costB) return costA - costB;
      return a.overallScore - b.overallScore;
    }
    // Overall / custom
    if (a.overallScore !== b.overallScore) return a.overallScore - b.overallScore;
    if (a.totalTimeMinutes !== b.totalTimeMinutes) return a.totalTimeMinutes - b.totalTimeMinutes;
    return a.totalDistance - b.totalDistance;
  });

  // Mark ranks and optimal flag
  return scoredRoutes.map((route, rankIdx) => ({
    ...route,
    rank: rankIdx + 1,
    isOptimal: rankIdx === 0
  }));
}
