# Views

Use this folder to hold TSX files. TSX files should be strictly in functional style. Create subdirectories as needed.

## Current Views

| View            | Purpose                                                          |
| --------------- | ---------------------------------------------------------------- |
| `app.tsx`       | Main game container with input handling and modal menus          |
| `map.tsx`       | Renders the game world grid and whale positions                  |
| `status.tsx`    | Displays ship status, aether mist balance, and whale fleet count |
| `controls.tsx`  | Shows available controls (movement, menus)                       |
| `menu.tsx`      | Reusable menu component for breeding and waystation interactions |
| `gossip.tsx`    | Shows latest 5 gossip entries from factions (cyan border)        |
| `evolution.tsx` | Shows latest 5 evolution events (yellow border)                  |
| `help.tsx`      | Displays help text and control instructions                      |

## Gossip & Evolution Systems

Both systems follow the same pattern:

- Service layer (`gossip.service.ts`, `evolution.service.ts`) handles log management and template-based generation
- Display components show the most recent 5 entries in a scrollable log
- Gossip appears every 5 turns via dynamic import; evolution logs track whale population changes

## Testing

Each view has corresponding test files. Run tests with `npm run test`.
