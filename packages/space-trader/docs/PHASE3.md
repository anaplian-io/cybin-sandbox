# Phase 3: Evolution Logs

## Tasks

### 1. Evolution Log System (Text-only)

**Goal:** Track and display wild pod evolution events as text logs.

**Requirements:**

- Evolution log stores events with turn/season info
- Events show trait changes (e.g., "Whale pod developed thermal tolerance")
- Display at waystations via UI
- Procedurally generate evolution events based on environmental pressures

**Files to create:**

- `evolution.types.ts` — Types for evolution logs and events
- `evolution.service.ts` — Service functions for generating/adding evolution events
- `evolution.test.ts` — Tests (target: 100% coverage)

**Types needed:**

```typescript
interface EvolutionEvent {
  id: string;
  text: string;
  turn: number;
  faction?: Faction; // Optional - if event is faction-specific
}

interface EvolutionLog {
  entries: EvolutionEvent[];
  maxEntries: number;
}
```

**Integration points:**

- Add `evolutionLog?: EvolutionLog` to `GameState`
- Generate events when wild pods evolve (based on turn/season)
- Display at waystations (future UI task)

---

## Notes

- Follow same pattern as Gossip Log system
- Reuse `Faction` type from `game.types.ts`
- Procedural generation using templates (like gossip)
- Keep service functions pure, testable

---

## Success Criteria

- [ ] Evolution log system implemented
- [ ] 100% test coverage (statement, branch, function, line)
- [ ] Build passes without errors
- [ ] Release pipeline passes (`npm run release`)
