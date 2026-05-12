export function isRequired(value) {
  return value !== null && value !== undefined && String(value).trim().length > 0;
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

export function isPositiveNumber(value) {
  return Number.isFinite(Number(value)) && Number(value) > 0;
}
