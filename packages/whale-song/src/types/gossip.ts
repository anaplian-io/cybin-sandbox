// Gossip system types and templates

import type { Faction } from '../constants/factions.js';

export interface Gossip {
  id: string;
  text: string;
  faction?: Faction;
  source?: string;
  turn: number;
  generation: number; // For filtering by relevance
}

export interface GossipLog {
  entries: Gossip[];
  maxEntries?: number;
}

// Gossip templates for procedural generation
export interface GossipTemplate {
  text: string;
  factions: Faction[];
}

// Available gossip templates
export const gossipTemplates: GossipTemplate[] = [
  {
    text: 'Rumors say the western archipelago has rich breeding grounds.',
    factions: ['explorer', 'merchant'],
  },
  {
    text: 'A new faction has established a waystation in the upper atmosphere.',
    factions: ['explorer', 'scholar'],
  },
  {
    text: 'Aether mist prices are trending upward this season.',
    factions: ['merchant'],
  },
  {
    text: 'The scholars have discovered a new whale trait combination.',
    factions: ['scholar'],
  },
  {
    text: 'Hermit nomads are offering rare breeding pairs at discounted rates.',
    factions: ['hermit', 'merchant'],
  },
  {
    text: 'Whale pods are developing thermal resistance due to recent heatwaves.',
    factions: ['explorer', 'scholar'],
  },
  {
    text: 'A massive whale pod has been spotted migrating eastward.',
    factions: ['explorer'],
  },
  {
    text: 'Rich aether mist deposits have been found near the southern floating islands.',
    factions: ['merchant', 'explorer'],
  },
  {
    text: 'Local factions are hosting a trade festival next turn.',
    factions: ['merchant', 'explorer'],
  },
  {
    text: 'Scholars report unusual whale migration patterns this season.',
    factions: ['scholar'],
  },
];
