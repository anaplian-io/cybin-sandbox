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

## Initial Scope (MVP) — ** COMPLETE**

1. ✅ **Sky Map View**
   - Grid-based map with your whale (`🐳`) and landmarks
   - Arrow key movement (one tile = one "step" through the sky)
   - Waystations shown as `⚓`, islands as `☁️`

2. ✅ **Whale Status Screen**
   - Health, current traits (inherited from parents)
   - Aether mist production rate
   - Available breeding pairings

3. ✅ **Breeding Menu**
   - Select from available wild pods at waystations
   - Trait selection interface (dominant/recessive markers)
   - Display potential offspring traits

4. ✅ **Waystation Interaction**
   - Trade interface (goods ↔ aether mist)
   - Gossip log (faction updates, rumors)
   - Mission board (delivery requests, exploration targets)

5. ✅ **Evolution Logs**
   - Text logs of wild pod evolution ("Pod A developed thermal tolerance")
   - Days/seasons progression affects environmental pressures

## Future Scope

- **Multiplayer Aspects** — Async interaction with other nomads (message boards, trade posts)
- **Seasonal Cycles** — Weather patterns change breeding成功率
- **Whale Evolution Stages** — Juvenile, Adult, Elder (different capabilities)
- **Minigames** — Simple tasks at waystations (fishing, scanning, navigation puzzles)

## MVP Task Breakdown

### ✅ Completed Tasks

| Component                                 | Status  | Notes                                                           |
| ----------------------------------------- | ------- | --------------------------------------------------------------- |
| Core Model Layer (`whale.ts`, `world.ts`) | ✅ Done | Whale, World types; tile generation                             |
| Breeding Service (`breeding.ts`)          | ✅ Done | SOLID dependency injection, tests included                      |
| Game Service (`game.ts`)                  | ✅ Done | State management, turn progression, wild pod generation         |
| Ink Terminal UI (`map.tsx`)               | ✅ Done | Map display, status panel, controls                             |
| Player Movement                           | ✅ Done | Arrow keys navigate the grid                                    |
| Breeding Ground Detection                 | ✅ Done | Triggers breeding opportunity when stepping on breeding grounds |
| Whale Status Display                      | ✅ Done | PR #15 — Health, traits, generation display                     |
| Breeding Menu UI                          | ✅ Done | PR #14 — Trait selection with wild pod pairing                  |
| Aether Mist Resource System               | ✅ Done | PR #16 — Harvest and sell system                                |
| Waystation Menu System                    | ✅ Done | PR #18 — Context-aware interface (Trade / Gossip / Rest)        |
| Trade Interface                           | ✅ Done | PR #19 — Buy/sell aether mist with prices                       |
| Gossip Log System                         | ✅ Done | PR #21 — Faction updates, rumors at waystations                 |
| Evolution Log System                      | ✅ Done | PR #22 — Wild pod trait change tracking                         |

### 📋 Remaining MVP Tasks (Priority Order)

#### Phase 1: Core Gameplay Loop (Blocking Playability)

| Task                        | Priority | Est. | Details                                                                         |
| --------------------------- | -------- | ---- | ------------------------------------------------------------------------------- |
| Breeding Menu UI            | **High** | 2–3h | Interactive menu to select wild pod, display predicted traits, confirm breeding |
| Whale Status Enhancement    | **High** | 1h   | Add health, aether mist production rate to status screen                        |
| Aether Mist Resource System | **High** | 2h   | Harvest aether mist from whales, sell at waystations                            |

#### Phase 2: Waystation Interaction (Essential for Loop) — **COMPLETE**

| Task                    | Status  | Details                                        |
| ----------------------- | ------- | ---------------------------------------------- |
| Trade Interface (Basic) | ✅ Done | Buy/sell aether mist, display prices           |
| Gossip Log (Text-only)  | ✅ Done | Display faction updates, rumors at waystations |
| Waystation Menu System  | ✅ Done | Context-aware menu (Trade / Gossip / Rest)     |

#### Phase 3: World State & Progression — **IN PROGRESS**

| Task                     | Status  | Details                                                |
| ------------------------ | ------- | ------------------------------------------------------ |
| Evolution Logs           | ✅ Done | Text logs of wild pod trait changes per season         |
| Season/Day Progression   | Pending | Track turn-based seasons affecting environment         |
| Wild Pod Evolution Logic | Pending | Apply environmental pressures to wild pods each season |

#### Phase 4: Polish & Playability

| Task                               | Priority | Est. | Details                                             |
| ---------------------------------- | -------- | ---- | --------------------------------------------------- |
| Turn Cost for Movement             | **Low**  | 0.5h | Consumes aether mist or time per move               |
| Breeding Cooldown System           | **Low**  | 1h   | Prevent immediate re-breeding after offspring       |
| Visual Feedback (Color, Animation) | **Low**  | 1h   | Ink color hints for traits, brief status animations |

#### Phase 5: Testing & Documentation

| Task                          | Priority   | Est. | Details                                 |
| ----------------------------- | ---------- | ---- | --------------------------------------- |
| Integration Tests (Full Loop) | **High**   | 2h   | End-to-end: move → breed → trade        |
| Gameplay Balance Adjustments  | **Medium** | 2h   | Tweak trait weights, resource costs     |
| User Guide (README)           | **Medium** | 1h   | How to play, controls, basic strategies |

### 📌 Blocked / Post-MVP (Deferred)

| Feature                                       | Reason                                        |
| --------------------------------------------- | --------------------------------------------- |
| Multiplayer Aspects                           | Requires networking layer, backend state sync |
| Seasonal Weather Effects                      | Needs world-state evolution system first      |
| Whale Evolution Stages (Juvenile/Adult/Elder) | Requires lifecycle state tracking             |
| Minigames at Waystations                      | Adds complexity beyond MVP                    |

---

## Next Steps

- [ ] **Season/Day Progression** (Phase 3) — Track turn-based seasons affecting environment
- [ ] **Wild Pod Evolution Logic** (Phase 3) — Apply environmental pressures to wild pods each season
- [ ] **Turn Cost for Movement** (Phase 4) — Consumes aether mist or time per move
- [ ] **Breeding Cooldown System** (Phase 4) — Prevent immediate re-breeding after offspring
- [ ] **Visual Feedback** (Phase 4) — Ink color hints for traits, brief status animations
- [ ] **Integration Tests (Full Loop)** (Phase 5) — End-to-end: move → breed → trade

## Future Scope

- **Multiplayer Aspects** — Async interaction with other nomads (message boards, trade posts)
- **Seasonal Cycles** — Weather patterns change breeding成功率
- **Whale Evolution Stages** — Juvenile, Adult, Elder (different capabilities)
- **Minigames** — Simple tasks at waystations (fishing, scanning, navigation puzzles)
