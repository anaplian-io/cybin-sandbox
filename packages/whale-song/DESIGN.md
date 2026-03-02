# Whale Song - Design Document

## Overview

**Whale Song** is a terminal-based space trading and whale simulation game inspired by classic games like _Taipan!_ and _Port Royale_. Players command a sentient whale (symbolized by 🐳) in an expansive ocean world, trading goods, breeding whales with unique traits, navigating seasonal changes, and uncovering gossip from various factions.

The project is a complete rewrite in ESM using Vitest (instead of Jest) and Ink for the terminal UI, with a focus on clean architecture, high test coverage, and maintainable code.

---

## Requirements

### Core Gameplay Loop

1. **Navigation** - Move the player's whale through a 2D world grid
2. **Trading** - Buy/sell "aether mist" at waystations and breeding grounds
3. **Whale Breeding** - Combine traits from parent whales to create stronger offspring
4. **Seasonal Systems** - Environmental pressure changes with seasons (spring/summer/autumn/winter)
5. **Gossip System** - Procedurally generated rumors from different factions (merchant, explorer, scholar, hermit)

### Game Mechanics

- **World Generation**: 20×15 grid with islands, waystations, breeding grounds, storms
- **Whale Traits**: speed, capacity, resilience, thermotolerance, predatorDeterrence, efficiency, consumption
- **Aether Mist**: Currency and resource for movement/trading; produced by whale fleet
- **Seasons**: 4 seasons × ~20 turns each with environmental effects on breeding success
- **Factions**: Merchant (trade-focused), Explorer (discovery), Scholar (knowledge), Hermit (rare deals)

### Technical Requirements

- **Module System**: ESM only (`"type": "module"`)
- **Testing Framework**: Vitest with `happy-dom` environment
- **UI Library**: Ink (React for CLI)
- **CLI Framework**: Meow
- **Coverage Thresholds**: 100% on all source files (excluding CLI, types, data directories)
- **Build Tool**: TypeScript compiler (`tsc`) to `./dist` directory

---

## Architecture

### Directory Structure

```
packages/whale-song/
├── src/
│   ├── cli.tsx              # Entry point with CLI argument parsing
│   ├── constants/           # Static configuration and singletons (no logic)
│   ├── data/                # Game data files (typed, no logic)
│   ├── services/            # Core game logic (SOLID OOP, injected deps)
│   ├── types/               # TypeScript interfaces and type definitions
│   └── views/               # Ink React components for rendering UI
├── dist/
│   ├── cli.js               # Bundle output (generated)
│   └── *.d.ts               # Type declarations (generated)
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

### Layered Architecture

#### 1. Services Layer (Core Logic)

- **SOLID Principle**: Every service accepts dependencies via constructor
- **No Optional Dependencies**: All collaborators required upfront
- **Pure Functions Where Possible**: State transitions are deterministic
- **Testable**: Services can be unit-tested with mocks

**Services Identified:**

- `GameService` - Main game state management, ship movement, breeding
- `BreedingService` - Trait inheritance calculations
- `SeasonService` - Season progression and environmental pressure
- `GossipService` - Rumor generation and faction management

#### 2. Data Layer

- Typed constants and configuration objects
- No business logic or computation
- Single source of truth for game rules

#### 3. View Layer (UI)

- Ink React components only
- No business logic allowed
- Presentational components that receive props from services

#### 4. Types Layer

- All TypeScript interfaces and type definitions
- Exported as barrel (`types/index.ts`) for convenience

---

## Phases & Implementation Order

### Phase 1: Foundation (Current)

**Goal**: Establish architecture and core types

#### Tasks

- [x] Set up workspace structure with required directories
- [x] Configure TypeScript (`tsconfig.json`) for ESM output
- [x] Configure Vitest with 100% coverage thresholds
- [ ] Create types module (`types/index.ts`, `types/game.ts`, etc.)
- [ ] Create data files for constants (seasons, traits, factions)
- [ ] Implement `BreedingService` with 100% test coverage
- [ ] Implement `SeasonService` with 100% test coverage

#### Acceptance Criteria

- All services have constructor injection
- No optional dependencies in service signatures
- Vitest runs with no errors, coverage at 100%

---

### Phase 2: Game State & Logic

**Goal**: Implement core game mechanics

#### Tasks

- [ ] Create `GameState` type in `types/game.ts`
- [ ] Implement `GameService` with full state management
  - Initialize world (islands, waystations, breeding grounds)
  - Move ship with turn cost calculation
  - Manage whale fleet and aether mist production
- [ ] Implement breeding logic with trait inheritance
- [ ] Add seasonal progression to game loop

#### Acceptance Criteria

- `GameService` has 100% test coverage
- All game state transitions are deterministic
- World generation is consistent and configurable

---

### Phase 3: UI Components

**Goal**: Build playable terminal interface

#### Tasks

- [ ] Create `App` component (main game view)
- [ ] Implement `MapDisplay` - viewport centered on player
- [ ] Implement `StatusDisplay` - show turn, position, whales, resources
- [ ] Implement `ControlsDisplay` - keyboard shortcuts
- [ ] Add menu components (breeding, waystation trading)
- [ ] Implement input handling (`useInput` hook)

#### Acceptance Criteria

- All `.tsx` files render without errors in Ink
- UI updates match game state changes
- Keyboard navigation works as designed

---

### Phase 4: Gossip & Expansion

**Goal**: Add narrative elements and expand world

#### Tasks

- [ ] Implement `GossipService` for rumor generation
- [ ] Add faction system (merchant, explorer, scholar, hermit)
- [ ] Create gossip templates and procedural generation
- [ ] Implement evolution log for whale population changes
- [ ] Add version command to CLI

#### Acceptance Criteria

- Gossip appears periodically in the UI
- Different factions have distinct messaging styles
- Evolution log tracks population changes

---

### Phase 5: Polish & Deployment

**Goal**: Ready for release

#### Tasks

- [ ] Add CLI flags (`--version`, `--help`)
- [ ] Create README with installation and usage docs
- [ ] Add changelog template
- [ ] Configure GitHub Actions CI/CD
- [ ] Publish to npm (private or public)

#### Acceptance Criteria

- `npm install -g @anaplian/whale-song` works
- CLI shows help with `--help`
- Version command works with `--version`

---

## User Stories (MVP Scope)

### As a Player, I Want To...

#### Navigation

- **US01**: Move my whale up/down/left/right on the grid
  - Given I'm at position (5,5)
  - When I press Up arrow
  - Then I move to (5,4) and a turn passes

- **US02**: View my surroundings in a 11×11 viewport
  - Given I'm at the center of the map
  - When the game renders
  - Then I see tiles within 5 spaces in each direction

#### Trading

- **US03**: Buy aether mist at waystations
  - Given I'm at a waystation
  - When I press Enter and select option 1
  - Then I can buy aether mist for 2 inventory units

- **US04**: Sell aether mist at waystations
  - Given I have excess aether mist
  - When I sell it
  - Then my inventory increases and aether mist decreases

#### Breeding

- **US05**: Breed whales at breeding grounds
  - Given I'm at a breeding ground
  - When I press Enter
  - Then the breeding menu opens with available wild pods

- **US06**: Select a mate and produce offspring
  - Given breeding menu is open
  - When I select option [1]-[9]
  - Then offspring inherits traits from both parents

#### Seasons

- **US07**: Experience seasonal changes
  - Given I've played through 20 turns
  - When the season advances
  - Then environmental pressure updates (spring→summer→autumn→winter)

#### Gossip

- **US08**: Receive rumors from factions
  - Given I've played for a while
  - When a random event occurs
  - Then I see a gossip entry from a specific faction

---

## Technical Decisions

### Why ESM?

- Modern JavaScript standard
- Better tree-shaking for bundling
- Native TypeScript support without transpilation

### Why Vitest over Jest?

- Faster test execution with V8 engine
- First-class ESM support (no special configuration)
- Compatible with React Testing Library
- Simpler 100% coverage enforcement

### Why Ink?

- React ecosystem for CLI development
- Flexbox-style layout system
- Active community and good documentation

### SOLID Dependency Injection Pattern

```typescript
// ❌ Avoid this (optional dependencies)
class GameService {
  constructor(private random: RandomGenerator = Math.random) {}
}

// ✅ Do this (required dependencies)
class GameService {
  constructor(private readonly random: RandomGenerator) {}
}

// Tests instantiate with mocks explicitly
const service = new GameService(() => 0.5);
```

### Coverage Exclusions

The following are excluded from coverage thresholds:

- `src/cli.tsx` - CLI glue code, minimal logic
- `src/types/**` - Type definitions only
- `src/data/**` - Data files, no logic
- `dist/**` - Generated output

---

## Testing Strategy

### Unit Tests (Services)

- **Framework**: Vitest with globals enabled
- **Mock Strategy**: Constructor injection for test doubles
- **Coverage Target**: 100% lines, branches, functions, statements

### Integration Tests (Views)

- **Framework**: React Testing Library + Ink
- **Environment**: `happy-dom` (DOM-like testing environment)
- **Coverage Target**: 100% on components (excluding JSX complexity)

### Test Organization

```
src/
├── breeding.test.ts     # BreedingService tests
├── season.test.ts       # SeasonService tests
├── game.service.test.ts # GameService tests
└── gossip.test.ts       # GossipService tests (future)
```

---

## Known Challenges & Solutions

### Challenge: Ink + ESM Bundling

**Problem**: React DevTools causes runtime errors when bundled with esbuild

**Solution**:

- Use TypeScript compiler (`tsc`) instead of esbuild for now
- Skip DevTools by not setting `DEV=true` environment variable

### Challenge: 100% Coverage on JSX

**Problem**: Ink components use JSX which can't be easily unit-tested

**Solution**:

- Exclude `*.tsx` files from coverage thresholds
- Keep business logic in services (testable .ts files)
- Test views for rendering behavior only

### Challenge: Workspace Dependency Resolution

**Problem**: Lerna/npm workspaces hoist dependencies to root

**Solution**:

- Keep tooling packages at workspace root (Jest, ESLint, etc.)
- Game logic in `whale-song` package with its own dependencies
- Use explicit version pinning to avoid conflicts

---

## Success Metrics

- [ ] All services have 100% test coverage
- [ ] No runtime errors on `npm start`
- [ ] CLI help shows proper usage with `--help`
- [ ] Version displays correctly with `--version`
- [ ] Game loop runs without crashes for 50+ turns
- [ ] All user stories from MVP scope implemented

---

## Next Steps (Immediate)

1. **Create type definitions** in `src/types/`:
   - `types/game.ts` (GameState, Position, Whale, etc.)
   - `types/season.ts` (SeasonState, SeasonConfig)
   - `types/gossip.ts` (Gossip, Faction)

2. **Create data files** in `src/data/`:
   - `data/constants.ts` (default values, configs)
   - `data/world.ts` (map layouts, locations)

3. **Implement services** in `src/services/`:
   - `breeding.ts` (already has tests, finalize)
   - `season.ts` (already has tests, finalize)
   - `gossip.ts` (new)
   - `game.service.ts` (migrate from space-trader)

4. **Build views** in `src/views/`:
   - `app.tsx` (main component)
   - `map.tsx` (viewport rendering)
   - `menu.tsx` (breeding/trade menus)

5. **Hook up CLI** in `cli.tsx`:
   - Wire services to game loop
   - Connect input handling to service calls
   - Render views with current state

---

_Document version: 1.0_
_Last updated: Sun Mar 01 2026_
