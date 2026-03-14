# Services

All game logic should be abstracted as much as possible from rendering and exist in this directory or its
subdirectories. Files should be short, explicit, and follow SOLID design principles. They must also be object-oriented
classes. All dependencies should be injected through the constructors as props.
No dependencies should be optional unless truly necessary.

## Current Services

| Service                | Purpose                                                   |
| ---------------------- | --------------------------------------------------------- |
| `game.service.ts`      | Core game state management and world initialization       |
| `breeding.service.ts`  | Whale breeding logic and trait combinations               |
| `season.service.ts`    | Season tracking, progression, and environmental pressures |
| `gossip.service.ts`    | Faction gossip generation and log management              |
| `evolution.service.ts` | Whale evolution event generation and log management       |

## Design Patterns

- **No side effects**: Services return new state objects rather than mutating
- **Pure functions**: All service methods are deterministic except when randomness is intended (e.g., gossip/evolution templates)
- **Testable**: Each function has corresponding tests with 100% coverage

## Testing

Run all service tests with `npm run test -- src/services/`
