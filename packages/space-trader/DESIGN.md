# Whale Song: Nomadic Skybound

A terminal-based game about riding a domesticated sky-whale through floating archipelagos, breeding better whales, and interacting with nomadic factions.

## Inspiration

- **Escape Velocity Nova** — Open-world exploration, reputation systems, faction interactions
- **Skywhale nomadism** — Living aboard a giant creature that's both transport and home
- **Passive ecosystem simulation** — Wild creatures evolving around you without direct intervention

## Core Gameplay Loop

1. **Ride your sky-whale** through a grid-based sky map
2. **Discover waystations and floating islands** scattered across the archipelago
3. **Breeding = Modding** — Select traits when breeding your whale with wild pods (no combat modding)
4. **Interact with other nomads** at waystations for trading, gossip, and missions
5. **Watch wild pods evolve** based on environmental pressures (storms, air currents)

## Key Mechanics

- **Navigation**: Arrow keys move your whale across airspace tiles
- **Breeding/Modding**: At waystations, select traits when breeding (speed, carrying capacity, resilience, special abilities)
- **Resources**: Sky-whales produce "aether mist" you can harvest/sell
- **Simulation**: Wild whale pods evolve passively—storms select for heat resistance, calm zones favor speed
- **Non-violent Conflict**: Compete for breeding grounds via trade/gossip influence; avoid dangerous air currents

## Tech Discovery

**Selected: Ink**

- React-based terminal UI with Flexbox layout (Yoga)
- `useInput` hook handles arrow keys for whale movement
- Incremental rendering reduces flicker for map updates
- Works with existing React tooling (Jest, TypeScript)

**Why Ink Works:**

- Grid-based movement maps naturally to terminal ASCII art
- Text logs for evolution events ("Whale pod developed thermal tolerance")
- Menu-driven breeding selection fits Ink's component system
- No graphics engine needed—creatures represented by ASCII symbols (🐳, ⚓, ☁️)

## Tech Stack

- TypeScript + Jest for testing
- **Ink** — React-based terminal UI library (`<Text>`, `useInput` hooks)
- Lerna monorepo for future workspace expansion (if we add minigames or separate systems)

## Game World

### Sky Layers

- **Upper Atmosphere** — Turbulent, fast currents, rare资源 (astral crystals)
- **Main Sky** — Balanced currents, common islands, typical whale pods
- **Lower Atmosphere** — Calm, slow movement, lush bioluminescent flora

### Creature Types

- **Domesticated Whales** — Your ride; traits affect speed, capacity, special abilities
- **Wild Pods** — Evolve passively; can be bred into your lineage
- **Sky Predators** — Avoidance mechanic (not combat); certain traits deter predators

### Waystations

- **Trading Outposts** — Buy/sell goods, trade whale genes
- **Gossip Hubs** — Learn about faction standings, hidden islands
- **Breeding Sanctuaries** — Specialized facilities for advanced trait selection

## Initial Scope (MVP)

1. **Sky Map View**
   - Grid-based map with your whale (`🐳`) and landmarks
   - Arrow key movement (one tile = one "step" through the sky)
   - Waystations shown as `⚓`, islands as `☁️`

2. **Whale Status Screen**
   - Health, current traits (inherited from parents)
   - Aether mist production rate
   - Available breeding pairings

3. **Breeding Menu**
   - Select from available wild pods at waystations
   - Trait selection interface (dominant/recessive markers)
   - Display potential offspring traits

4. **Waystation Interaction**
   - Trade interface (goods ↔ aether mist)
   - Gossip log (faction updates, rumors)
   - Mission board (delivery requests, exploration targets)

5. **Evolution Logs**
   - Text logs of wild pod evolution ("Pod A developed thermal tolerance")
   - Days/seasons progression affects environmental pressures

## Future Scope

- **Multiplayer Aspects** — Async interaction with other nomads (message boards, trade posts)
- **Seasonal Cycles** — Weather patterns change breeding成功率
- **Whale Evolution Stages** — Juvenile, Adult, Elder (different capabilities)
- **Minigames** — Simple tasks at waystations (fishing, scanning, navigation puzzles)

## Next Steps

- [ ] Define initial project structure (Lerna workspace layout)
- [ ] Implement core model layer (Whale, Position, Trait system)
- [ ] Build first playable loop (move whale on grid, visit waystation, breed)
