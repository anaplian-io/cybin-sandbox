# Whale Song - UI Mockups

This document contains visual mockups and layout concepts for the terminal interface.

---

## Overview

Whale Song is a terminal-based space trading and whale simulation game. The UI should feel like navigating a vast ocean grid while managing your fleet, resources, and faction relationships.

**Core Principles:**

- **Clean & organized**: Similar to sea-trader's ASCII art header + clear sections
- **Responsive layout**: Flexbox columns for left/right panes
- **Visual hierarchy**: Header → Status bar → Main view → Controls
- **Minimalist aesthetic**: Lean into the terminal medium rather than over-decorate

---

## Layout Structure

```
┌─────────────────────────────────────────────────────┐
│  Whale Song v0.1.0  🐳  _turn_   _aether mist_      │
├─────────────────────┬───────────────────────────────┤
│                     │                               │
│   MAP VIEW          │     STATUS PANEL              │
│   (11x11 viewport)  │                               │
│                     │  - Position: (5, 7)           │
│      ▲              │  - Turn: 42                   │
│   ┌─────┐           │  - Whales: 3                  │
│   │  🐳 │          │  - Aether: 150                │
│   └─────┘           │  - Season: Spring             │
│                     │                               │
└─────────────────────┴───────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Controls: Arrows move | W: Whales | Enter: Menu   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Gossip Log                                         │
│  ├─ Day 12:Explorer pod spotted migrating east     │
│  └─ Day 8: Aether prices trending upward           │
└─────────────────────────────────────────────────────┘
```

---

## Mockup 1: Map-Centered Layout

This is the primary view when playing the game. The map takes up most of the screen with a side status panel.

```
╔══════════════════════════════════════════════════════════════════╗
║ 🐳 Whale Song v0.1.0   Turn: 42   Aether: 150   Season: Spring ║
╠═══════════════════════════════╤══════════════════════════════════╣
║                               │ Position: (5, 7)               ║
║   . . . . . . . . . . .       │ Turn: 42                       ║
║   . . . . . . . . . . .       │ Whales: 3                      ║
║   . . . . 🐳 . . . . . .      │ Aether: 150                    ║
║   . . . . . . . . . . .       │ Season: Spring (Turn 12/20)    ║
║   . . . . . . . . . . .       │                                ║
║   ⛓️ . . . . . . . . . .      │ whales:                        ║
║   ⛓️ . . . . . . . . . .      │   🐳 Captain Whalen (Gen 1)    ║
║   . . . . . . . . . . .       │   🐳 Blue Horizon (Gen 2)      ║
║   . . . . . . . . . . .       │   🐳 Storm Chaser (Gen 1)      ║
║   . . . . . . . . . . .       │                                ║
╚═══════════════════════════════╧══════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════╗
║ Controls: Arrows move | W: Whales | Enter: Menu                  ║
╚══════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════╗
║ Gossip Log (Latest 5)                                            ║
╠──────────────────────────────────────────────────────────────────╣
║ Day 12: Explorer pod spotted migrating eastward                  ║
║ Day 8: Aether mist prices trending upward this season            ║
║ Day 3: Scholars report unusual whale migration patterns          ║
╚══════════════════════════════════════════════════════════════════╝
```

**Key Features:**

- ASCII-style map with emoji for features (鲸, ⛓️ islands)
- Top bar shows game stats
- Left pane is the map view (11x11 centered on player)
- Right pane shows detailed status
- Bottom sections for controls and gossip log

---

## Mockup 2: Menu System (Breeding)

When near a breeding ground, pressing Enter opens the breeding menu:

```
╔══════════════════════════════════════════════════════════════════╗
║ [Breeding Ground: Whispering Shoals]                             ║
╠══════════════════════════════════════════════════════════════════╣
║ Available Wild Pods:                                             ║
║                                                                  ║
║  [1] 🐳 Ocean Whisper                                           ║
║      Speed: ⭐⭐⭐⭐☆  Capacity: ⭐⭐⭐☆☆                           ║
║      Resilience: ⭐⭐⭐⭐☆  Thermotolerance: ⭐⭐☆☆☆                ║
║                                                                  ║
║  [2] 🐳 Storm Runner                                            ║
║      Speed: ⭐⭐⭐⭐⭐  Capacity: ⭐⭐☆☆☆                           ║
║      Resilience: ⭐⭐⭐☆☆  Thermotolerance: ⭐⭐⭐⭐☆                ║
║                                                                  ║
║  [3] 🐳 Deep Dreamer                                            ║
║      Speed: ⭐⭐☆☆☆  Capacity: ⭐⭐⭐⭐⭐                           ║
║      Resilience: ⭐⭐⭐⭐☆  Thermotolerance: ⭐⭐⭐☆☆                ║
║                                                                  ║
║ Press number to select, ESC to cancel                            ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Mockup 3: Menu System (Waystation Trading)

At a waystation, pressing Enter opens the trading menu:

```
╔══════════════════════════════════════════════════════════════════╗
║ [Waystation: Circuit Waystation]                                 ║
╠══════════════════════════════════════════════════════════════════╣
║ Current Market Prices:                                           ║
║   Aether Mist: 2 units per credit                                ║
║                                                                  ║
║ Your Inventory:                                                  ║
║   Aether Mist: 50 units                                          ║
║                                                                  ║
║ Options:                                                         ║
║   [1] Buy 10 aether mist (cost: 20 units)                       ║
║   [2] Sell 10 aether mist (gain: 10 units)                      ║
║   [3] View full inventory                                         ║
║                                                                  ║
║ Press number to select, ESC to cancel                            ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Mockup 4: Whale Status Panel

Pressing 'W' shows detailed whale information:

```
╔══════════════════════════════════════════════════════════════════╗
║ Your Whale Fleet                                                 ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║ 🐳 Captain Whalen (Gen 1)                                        ║
║    Speed: ⭐⭐⭐⭐☆      Capacity: ⭐⭐⭐⭐☆                          ║
║    Resilience: ⭐⭐⭐⭐⭐  Thermotolerance: ⭐⭐⭐☆☆                   ║
║    Predator Deterrence: ⭐⭐⭐☆☆   Efficiency: ⭐⭐⭐⭐⭐               ║
║    Consumption: ⭐⭐☆☆☆                                           ║
║    Current Location: (5, 7)                                      ║
║                                                                  ║
║ 🐳 Blue Horizon (Gen 2)                                          ║
║    Speed: ⭐⭐⭐⭐⭐      Capacity: ⭐⭐⭐⭐☆                          ║
║    Resilience: ⭐⭐⭐⭐⭐  Thermotolerance: ⭐⭐⭐⭐☆                   ║
║    Predator Deterrence: ⭐⭐⭐⭐☆   Efficiency: ⭐⭐⭐⭐⭐               ║
║    Consumption: ⭐⭐☆☆☆                                           ║
║    Current Location: (5, 7)                                      ║
║                                                                  ║
║ [Press ESC to close]                                             ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Color Palette

| Element          | Color                                  |
| ---------------- | -------------------------------------- |
| Player whale     | 🐳 (default, or cyan)                  |
| Islands          | ⛓️ (gray/brown)                        |
| Waystations      | 🏢 (yellow/orange)                     |
| Breeding grounds | 🌱 (green)                             |
| Storms           | ⚡ (red/magenta)                       |
| Map background   | dots (`.`) in dim gray                 |
| Header bar       | Cyan text on dark background           |
| Menus            | White text with box drawing characters |
| Stats bar        | Green/yellow accents                   |

---

## Typography & ASCII Art Header

Similar to sea-trader, we could use a generated ASCII art header:

```
   ▄███████▄     ▄████████    ▄████████  ▄█  ████████▄   ▄██████▄
  ███    ███   ███    ███   ███    ███ ██  ██ ▀███▀ ███  ▀███
  ███    ███   ███    ███   ███    ███ ██  ██  ▀█▀  ███    ███
  ███    ███   ███    ███  ▄███▄▄▄▄██▀ ██  ██   █    ███    ███
████    ███ ▀███████████ ▀▀███▄▄   ██ ██  ██   █    ███    ███
▀█████████▀   ███    ███ ▀███████▄ ██ ██  ██   █    ███    ███
  ███         ███    ███   ▀███████ ██ ██  ██   █    ███    ███
  ███         ███    █▀    ▀█▄    ██ ██  ▄████▀   ▄████▀  ▄███▀
 ▄████▄      ▄████████     ▀██████▀   ▀█            ▀          ▀
```

Or a simpler whale-themed version:

```
       .   .   .
    .  | | | |  .
   <   | | | |   >
      '   |   '
         '
        ( )
       (   )
      (     )
     (       )
    (         )
   ( Whale Song )
  (    v0.1     )
```

---

## Implementation Notes

### Ink Components to Use

- `<Box>` for layout containers with `borderStyle`, `paddingX`, `flexDirection`
- `<Text>` for all text output with color attributes
- `<Table>` for displaying lists of whales/prices
- `<Static>` for scrolling gossip log (last 5 items)
- `<Color>` if needed for color (though Ink 3 has native support)

### Input Handling

- Arrow keys: Movement
- `W`: Toggle whale status panel
- `Enter`: Open context menu (breeding/trading)
- `ESC`: Close menus

### Responsive Layout

- Map area: Left 70% of screen, fixed aspect ratio (11x11 grid)
- Status panel: Right 30%, scrolls if needed
- Gossip log: Fixed bottom area, auto-scrolls

---

##参考资料

1. **sea-trader** - Clean ASCII art header + map layout
2. **Ink documentation** - Flexbox layout patterns with `<Box>`
3. **Terminal UI best practices**:
   - Keep it clean, not flashy
   - Use colors sparingly for hierarchy
   - ASCII art for branding (not gameplay)
   - menus should be discoverable via controls display

---

_Document version: 1.0  
Last updated: 2026-03-06_
