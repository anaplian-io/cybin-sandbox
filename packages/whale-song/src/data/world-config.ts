// World configuration constants - no logic, just data

export interface WorldConfig {
  width: number;
  height: number;
}

export const DEFAULT_WORLD_CONFIG: WorldConfig = {
  width: 20,
  height: 15,
};

export interface LocationConfig {
  x: number;
  y: number;
  name?: string;
}

export const ISLAND_LOCATIONS: LocationConfig[] = [
  { x: 5, y: 5 },
  { x: 10, y: 8 },
  { x: 15, y: 3 },
  { x: 3, y: 12 },
];

export const WAYSTATION_LOCATIONS: LocationConfig[] = [
  { x: 7, y: 7, name: 'Circuit Waystation' },
  { x: 12, y: 5, name: 'Vortex Outpost' },
];

export const BREEDING_LOCATIONS: LocationConfig[] = [
  { x: 2, y: 10, name: 'Whispering Shoals' },
  { x: 16, y: 8, name: 'Aurora Drift' },
  { x: 9, y: 2, name: 'Skyward Nest' },
];
