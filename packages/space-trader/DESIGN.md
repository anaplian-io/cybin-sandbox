# Space Trader - Terminal Edition

A rough clone of **Escape Velocity Nova** for the terminal, written in TypeScript.

## Inspiration: Escape Velocity Nova

EVN is a classic Mac/Windows space trading/combat game where you play as an independent pilot in a three-way cold war between:

- **Federation of United Planets** (democratic but corrupt)
- **Auroran Empire** (brutal yet skilled)
- **Polaris** (utopic but xenophobic)

### Core Gameplay

1. Start as a freelance pilot in a shuttlecraft
2. Make money through trading, missions, or combat
3. Build reputation with factions
4. Get recruited into one of three main storylines

### Key Mechanics

- **Trading**: Buy low, sell high across star systems
- **Combat**: Dogfight pirates and enemy ships
- **Missions**: Deliver cargo, escort ships, assassinate targets
- **Reputation**: Your choices affect faction standings

## Game Concept for This Project

A terminal-based version that captures the essence of EVN:

- Text-heavy UI with menus, status displays, and combat logs using Ink (React for terminal)
- Multiple star systems connected by hyperjumps
- Player manages ship systems (hull, shields, fuel, cargo)
- Economy driven by supply/demand per system
- Faction relationships affect pricing and mission availability

## Tech Discovery

**Selected: Ink**

- React-based terminal UI with Flexbox layout (Yoga)
- `useInput` hook handles arrow keys for ship movement
- Incremental rendering reduces flicker for animations
- Works with existing React tooling (Jest, TypeScript)

## Initial Scope (MVP)

1. **System Overview Screen**
   - Current system name
   - Ship status (hull, shields, fuel, cargo weight)
   - Credits

2. **Space View**
   - List of neighboring systems
   - Jump to system (costs fuel)

3. **Planetary Market**
   - List of goods available for purchase
   - Current prices per system
   - Buy/sell interface

4. **Mission Board**
   - Available missions from faction representatives
   - Mission rewards and requirements

5. **Combat System (simplified)**
   - Text-based combat log
   - Turn-based or real-time depending on implementation

## Tech Discovery

**Selected: Ink**

- React-based terminal UI with Flexbox layout (Yoga)
- `useInput` hook handles arrow keys for ship movement
- Incremental rendering reduces flicker for animations
- Works with existing React tooling (Jest, TypeScript)

## Tech Stack

- TypeScript + Jest for testing
- **Ink** — React-based terminal UI library (using `<Text>` components, `useInput` hook for arrow key control)
- Lerna monorepo for future workspace expansion

## Next Steps

- [ ] Define initial project structure
- [ ] Implement basic system/model layer
- [ ] Build first playable loop (jump between systems, view market)
