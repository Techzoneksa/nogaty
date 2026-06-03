export const hasDatabase = Boolean(process.env.DATABASE_URL);

export function isDemoMode() {
  return !hasDatabase;
}

export function isProductionMode() {
  return hasDatabase;
}