import type { Faction } from '../constants/factions.js';
import type {
  EvolutionEvent,
  EvolutionLog,
  GameState,
} from '../types/index.js';
import { evolutionTemplates } from '../types/index.js';

export function initializeEvolutionLog(): EvolutionLog {
  return {
    entries: [],
    maxEntries: 50,
  };
}

export function addEvolution(
  log: EvolutionLog | undefined,
  text: string,
  turn: number = 0,
  faction?: Faction,
): EvolutionLog {
  const event: EvolutionEvent = {
    id: generateEvolutionId(),
    text,
    turn,
    faction,
  };

  const entries = log?.entries ?? [];
  return {
    ...log,
    entries: [event, ...entries].slice(0, log?.maxEntries ?? 50),
  };
}

export function generateRandomEvolution(
  turn: number,
  factionFilter?: Faction[],
): EvolutionEvent {
  const template =
    evolutionTemplates[Math.floor(Math.random() * evolutionTemplates.length)];

  // All templates have factions defined, so safely access
  const factions = factionFilter ?? template.factions;
  const selectedFaction = factions[
    Math.floor(Math.random() * factions.length)
  ] as Faction;

  return {
    id: generateEvolutionId(),
    text: template.text,
    turn,
    faction: selectedFaction,
  };
}

export function addEvolutionToGameState(
  state: GameState,
  text: string,
  faction?: Faction,
): GameState {
  const turn = state.turn;
  const evolutionLog = addEvolution(state.evolutionLog, text, turn, faction);
  return { ...state, evolutionLog };
}

export function generateRandomEvolutionForGameState(
  state: GameState,
  factionFilter?: Faction[],
): EvolutionEvent {
  return generateRandomEvolution(state.turn, factionFilter);
}

export function addRandomEvolutionToGameState(
  state: GameState,
  factionFilter?: Faction[],
): GameState {
  const event = generateRandomEvolutionForGameState(state, factionFilter);
  return addEvolutionToGameState(
    state,
    event.text,
    event.faction as Faction | undefined,
  );
}

function generateEvolutionId(): string {
  return `evolution-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
