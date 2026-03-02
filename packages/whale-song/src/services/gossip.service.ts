import type { Faction } from '../constants/factions.js';
import type { Gossip, GossipLog, GameState } from '../types/index.js';
import { gossipTemplates } from '../types/gossip.js';

export function initializeGossipLog(): GossipLog {
  return {
    entries: [],
    maxEntries: 50,
  };
}

export function addGossip(
  log: GossipLog | undefined,
  text: string,
  faction?: Faction,
): GossipLog {
  const gossip: Gossip = {
    id: generateGossipId(),
    text,
    faction,
    source: faction ? `${faction} informant` : 'traveler',
    turn: 0, // Will be set by caller
    generation: 1,
  };

  const entries = log?.entries ?? [];
  return {
    ...log,
    entries: [gossip, ...entries].slice(0, log?.maxEntries ?? 50),
  };
}

export function generateRandomGossip(
  turn: number,
  factionFilter?: Faction[],
): Gossip {
  const template =
    gossipTemplates[Math.floor(Math.random() * gossipTemplates.length)];

  // All templates have factions defined, so safely access
  const factions = factionFilter ?? template.factions;
  const selectedFaction = factions[
    Math.floor(Math.random() * factions.length)
  ] as Faction;

  return {
    id: generateGossipId(),
    text: template.text,
    faction: selectedFaction,
    source: `${selectedFaction} informant`,
    turn,
    generation: 1,
  };
}

export function addGossipToGameState(
  state: GameState,
  text: string,
  faction?: Faction,
): GameState {
  const gossipLog = addGossip(state.gossipLog, text, faction);
  return { ...state, gossipLog };
}

export function generateRandomGossipForGameState(
  state: GameState,
  factionFilter?: Faction[],
): Gossip {
  return generateRandomGossip(state.turn, factionFilter);
}

export function addRandomGossipToGameState(
  state: GameState,
  factionFilter?: Faction[],
): GameState {
  const gossip = generateRandomGossipForGameState(state, factionFilter);
  return addGossipToGameState(
    state,
    gossip.text,
    gossip.faction as Faction | undefined,
  );
}

function generateGossipId(): string {
  return `gossip-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
