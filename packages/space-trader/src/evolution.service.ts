import type {
  GameState,
  EvolutionLog,
  EvolutionEvent,
  Faction,
  EvolutionTemplate,
} from './game.types';

// Available evolution templates (must match game.types.ts)
const evolutionTemplates: EvolutionTemplate[] = [
  {
    text: 'Whale pod developed thermal resistance due to recent heatwaves.',
    factions: ['explorer', 'scholar'],
  },
  {
    text: 'Whale pod evolved faster swimming speed to catch prey.',
    factions: ['explorer'],
  },
  {
    text: 'Whale pod developed improved aether mist harvesting efficiency.',
    factions: ['merchant'],
  },
  {
    text: 'Whale pod became more elusive, avoiding predators.',
    factions: ['hermit'],
  },
  {
    text: 'Whale pod developed resilience to air currents.',
    factions: ['explorer', 'scholar'],
  },
];

export function initializeEvolutionLog(): EvolutionLog {
  return {
    entries: [],
    maxEntries: 50,
  };
}

export function addEvolutionEvent(
  log: EvolutionLog | undefined,
  text: string,
  faction?: Faction,
): EvolutionLog {
  const event: EvolutionEvent = {
    id: generateEvolutionId(),
    text,
    faction,
    turn: 0, // Will be set by caller
  };

  const entries = log?.entries ?? [];
  return {
    ...log,
    entries: [event, ...entries].slice(0, log?.maxEntries ?? 50),
  };
}

export function generateRandomEvolutionEvent(
  turn: number,
  factionFilter?: Faction[],
): EvolutionEvent {
  const template =
    evolutionTemplates[Math.floor(Math.random() * evolutionTemplates.length)];

  // All templates have factions defined, so safely access
  const factions = factionFilter ?? template.factions!;
  const selectedFaction = factions[
    Math.floor(Math.random() * factions.length)
  ] as Faction;

  return {
    id: generateEvolutionId(),
    text: template.text,
    faction: selectedFaction,
    turn,
  };
}

export function addEvolutionToGameState(
  state: GameState,
  text: string,
  faction?: Faction,
): GameState {
  const evolutionLog = addEvolutionEvent(state.evolutionLog, text, faction);
  return { ...state, evolutionLog };
}

export function generateRandomEvolutionEventForGameState(
  state: GameState,
  factionFilter?: Faction[],
): EvolutionEvent {
  return generateRandomEvolutionEvent(state.turn, factionFilter);
}

export function addRandomEvolutionToGameState(
  state: GameState,
  factionFilter?: Faction[],
): GameState {
  const event = generateRandomEvolutionEventForGameState(state, factionFilter);
  return addEvolutionToGameState(state, event.text, event.faction);
}

function generateEvolutionId(): string {
  return `evolution-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
