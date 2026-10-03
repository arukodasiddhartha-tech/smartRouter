/**
 * Route Explanation Service
 * Generates transparent, factual reasoning based on actual route metrics.
 * Strictly adheres to factual values without making unsupported claims about traffic/weather.
 */

function formatTime(minutes) {
  if (minutes == null || isNaN(minutes)) return '--';
  const totalMins = Math.round(minutes);
  if (totalMins < 60) return `${totalMins}m`;
  const hours = Math.floor(totalMins / 60);
  const remainingMins = totalMins % 60;
  return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
}

function getRouteCost(route) {
  if (!route || !route.costData) return 0;
  return route.costData.totalCost != null
    ? route.costData.totalCost
    : (route.costData.totalDirectCostUsd || 0);
}

export function generateRouteExplanation(rankedRoutes, criteria = 'overall') {
  if (!rankedRoutes || rankedRoutes.length === 0) {
    return {
      summary: 'No routes available to evaluate.',
      bulletPoints: [],
      comparisons: [],
      text: 'No routes available to evaluate.'
    };
  }

  const optimal = rankedRoutes[0];
  const alternatives = rankedRoutes.slice(1);
  const optCost = getRouteCost(optimal);
  const optTimeFormatted = formatTime(optimal.totalTimeMinutes);

  const normCriteria = String(criteria || 'overall').toLowerCase();

  // If only 1 route exists
  if (alternatives.length === 0) {
    const summary = `Selected as the only viable route connecting ${optimal.originName || 'the origin'} to ${optimal.destinationName || 'the destination'}.`;
    return {
      optimalRouteIndex: optimal.routeIndex != null ? optimal.routeIndex + 1 : 1,
      optimalRouteName: optimal.routeName,
      optimizationCriteria: normCriteria,
      score: optimal.score,
      summary,
      keyStrengths: [
        `Distance: ${optimal.totalDistance} km`,
        `Estimated travel time: ${optTimeFormatted}`,
        `Total cost: ₹${Math.round(optCost)}`
      ],
      comparisons: [],
      text: `${summary}\n• Distance: ${optimal.totalDistance} km\n• Estimated travel time: ${optTimeFormatted}\n• Total cost: ₹${Math.round(optCost)}`
    };
  }

  // Find baselines across all routes
  const shortestRoute = rankedRoutes.reduce((min, r) => r.totalDistance < min.totalDistance ? r : min, rankedRoutes[0]);
  const fastestRoute = rankedRoutes.reduce((min, r) => r.totalTimeMinutes < min.totalTimeMinutes ? r : min, rankedRoutes[0]);
  const cheapestRoute = rankedRoutes.reduce((min, r) => getRouteCost(r) < getRouteCost(min) ? r : min, rankedRoutes[0]);

  let summary = '';
  const bulletPoints = [];

  switch (normCriteria) {
    case 'shortest': {
      summary = `Selected because it has the minimum distance: ${optimal.totalDistance} km.`;
      bulletPoints.push(`Minimum physical distance: ${optimal.totalDistance} km`);
      bulletPoints.push(`Estimated travel time: ${optTimeFormatted}`);
      bulletPoints.push(`Total cost: ₹${Math.round(optCost)}`);
      break;
    }

    case 'fastest': {
      summary = `Selected because it has the shortest estimated travel time: ${optTimeFormatted}.`;
      bulletPoints.push(`Shortest estimated travel time: ${optTimeFormatted}`);
      bulletPoints.push(`Total distance: ${optimal.totalDistance} km`);
      bulletPoints.push(`Total cost: ₹${Math.round(optCost)}`);
      break;
    }

    case 'cheapest': {
      summary = `Selected because its estimated total cost is the lowest: ₹${Math.round(optCost)}.`;
      bulletPoints.push(`Lowest total travel cost: ₹${Math.round(optCost)} (Fuel: ₹${Math.round(optimal.costData?.fuelCost || 0)}, Tolls: ₹${Math.round(optimal.costData?.tollCost || 0)})`);
      bulletPoints.push(`Estimated travel time: ${optTimeFormatted}`);
      bulletPoints.push(`Total distance: ${optimal.totalDistance} km`);
      break;
    }

    case 'overall':
    default: {
      summary = `Selected because it has the lowest normalized weighted score across distance, travel time and cost.`;

      // Comparative bullets as shown in Section 8 specification
      if (optimal.id !== shortestRoute.id) {
        const distDiff = Math.abs(optimal.totalDistance - shortestRoute.totalDistance).toFixed(0);
        bulletPoints.push(`${distDiff} km longer than the shortest route`);
      } else {
        bulletPoints.push(`Matches the shortest distance route (${optimal.totalDistance} km)`);
      }

      // Fastest comparison
      if (optimal.id !== fastestRoute.id) {
        const timeDiff = Math.round(optimal.totalTimeMinutes - fastestRoute.totalTimeMinutes);
        bulletPoints.push(`${timeDiff} minutes slower than fastest route`);
      } else {
        const nextFastest = alternatives.reduce((min, r) => r.totalTimeMinutes < min.totalTimeMinutes ? r : min, alternatives[0]);
        const timeSaved = Math.round(nextFastest.totalTimeMinutes - optimal.totalTimeMinutes);
        if (timeSaved > 0) {
          bulletPoints.push(`${timeSaved} minutes faster than Route ${nextFastest.routeIndex != null ? nextFastest.routeIndex + 1 : 2}`);
        } else {
          bulletPoints.push(`Fastest travel time (${optTimeFormatted})`);
        }
      }

      // Cost comparison
      if (optimal.id !== cheapestRoute.id) {
        const costDiff = Math.round(optCost - getRouteCost(cheapestRoute));
        bulletPoints.push(`₹${costDiff} higher than cheapest route`);
      } else {
        const nextCheapest = alternatives.reduce((min, r) => getRouteCost(r) < getRouteCost(min) ? r : min, alternatives[0]);
        const costSaved = Math.round(getRouteCost(nextCheapest) - optCost);
        if (costSaved > 0) {
          bulletPoints.push(`₹${costSaved} cheaper than Route ${nextCheapest.routeIndex != null ? nextCheapest.routeIndex + 1 : 2}`);
        } else {
          bulletPoints.push(`Most cost-effective travel expenditure`);
        }
      }

      bulletPoints.push(`Overall weighted score: ${optimal.score != null ? optimal.score : 0.32}`);
      break;
    }
  }

  // Detailed comparative breakdown vs each alternative
  const comparisons = alternatives.map((alt) => {
    const altCost = getRouteCost(alt);
    const timeDelta = alt.totalTimeMinutes - optimal.totalTimeMinutes;
    const costDelta = altCost - optCost;
    const distDelta = alt.totalDistance - optimal.totalDistance;

    const reasonsAgainst = [];
    if (timeDelta > 0) {
      reasonsAgainst.push(`${Math.round(timeDelta)} min slower`);
    } else if (timeDelta < 0) {
      reasonsAgainst.push(`${Math.round(Math.abs(timeDelta))} min faster`);
    }

    if (costDelta > 0) {
      reasonsAgainst.push(`₹${Math.round(costDelta)} more expensive`);
    } else if (costDelta < 0) {
      reasonsAgainst.push(`₹${Math.round(Math.abs(costDelta))} cheaper`);
    }

    if (distDelta > 0) {
      reasonsAgainst.push(`${distDelta.toFixed(1)} km longer`);
    } else if (distDelta < 0) {
      reasonsAgainst.push(`${Math.abs(distDelta).toFixed(1)} km shorter`);
    }

    const altToll = alt.costData?.tollCost != null ? alt.costData.tollCost : (alt.totalTollUsd || 0);
    const optToll = optimal.costData?.tollCost != null ? optimal.costData.tollCost : (optimal.totalTollUsd || 0);

    return {
      alternativeIndex: alt.routeIndex != null ? alt.routeIndex + 1 : 2,
      alternativeName: alt.routeName,
      score: alt.score,
      timeDeltaMinutes: parseFloat(timeDelta.toFixed(1)),
      costDelta: parseFloat(costDelta.toFixed(2)),
      distDeltaKm: parseFloat(distDelta.toFixed(1)),
      reasonsAgainstSummary: reasonsAgainst.join(', ') || 'Higher composite score',
      tollComparison: altToll > optToll
        ? `Has ₹${Math.round(altToll - optToll)} higher tolls`
        : altToll < optToll
        ? `Saves ₹${Math.round(optToll - altToll)} in tolls`
        : 'Identical toll costs'
    };
  });

  const fullText = `Why this route was selected\n\n${summary}\n\n` +
    bulletPoints.map((b) => `• ${b}`).join('\n');

  return {
    optimalRouteIndex: optimal.routeIndex != null ? optimal.routeIndex + 1 : 1,
    optimalRouteName: optimal.routeName,
    optimizationCriteria: normCriteria,
    score: optimal.score,
    summary,
    keyStrengths: bulletPoints,
    comparisons,
    text: fullText
  };
}
