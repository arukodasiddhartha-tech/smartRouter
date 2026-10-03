/**
 * Formatting helpers for RouteOpt
 */

export function formatTime(minutes) {
  if (minutes == null || isNaN(minutes)) return '--';
  const totalMins = Math.round(minutes);
  if (totalMins < 60) {
    return `${totalMins} min`;
  }
  const hours = Math.floor(totalMins / 60);
  const remainingMins = totalMins % 60;
  return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours} hr`;
}

export function formatDistance(km) {
  if (km == null || isNaN(km)) return '--';
  return `${Number(km).toFixed(1)} km`;
}

export function formatCurrency(amount) {
  if (amount == null || isNaN(amount)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

export function formatEmissions(kg) {
  if (kg == null || isNaN(kg)) return '--';
  if (kg < 1) {
    return `${Math.round(kg * 1000)} g CO₂`;
  }
  return `${Number(kg).toFixed(2)} kg CO₂`;
}

export function formatEnergy(amount, unit = 'L') {
  if (amount == null || isNaN(amount)) return '--';
  return `${Number(amount).toFixed(1)} ${unit}`;
}

export function getScoreColor(score) {
  if (score >= 85) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  if (score >= 70) return 'text-teal-400 bg-teal-500/10 border-teal-500/20';
  if (score >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
  return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
}
