# Whale Song

A terminal-based space trading and whale simulation game inspired by classic games like _Taipan!_ and _Port Royale_. Command a sentient whale 🐳 in an expansive ocean world, trading goods, breeding whales with unique traits, navigating seasonal changes, and uncovering gossip from various factions.

## Installation

```bash
npm install -g @anaplian/whale-song
```

**Requirements:** Node.js >= 22

## Quick Start

```bash
whale-song
```

Or run directly:

```bash
npx @anaplian/whale-song
```

## Controls

### Movement

- **WASD** or **Arrow Keys** — Move your whale up/down/left/right

### Menus

- **Enter at Waystation** — Open trading menu (buy/sell aether mist)
- **Enter at Breeding Ground** — Open breeding menu (select whales 1-9 to breed)
- **W** — Toggle whale fleet status display
- **ESC** — Close any open menu

## Gameplay

### Navigation

Move your whale across a 20×15 grid world containing:

- **Waystations** — Buy and sell aether mist
- **Breeding Grounds** — Find wild pods and breed whales
- **Islands** — Static landmarks
- **Storms** — Dangerous areas to avoid

### Trading

At waystations, you can buy or sell "aether mist":

- **Buy** — Purchase 10 units for credits
- **Sell** — Sell 5 units to replenish credits

### Whale Breeding

When you reach a breeding ground:

1. Press Enter to open the menu
2. Press number keys (1-9) to select a whale from your fleet
3. Press Enter to breed with another whale

Your whales will inherit traits like speed, capacity, resilience, thermotolerance, predator deterrence, efficiency, and consumption.

### Seasons

The world experiences four seasons, each lasting ~20 turns:

- **Spring** — Favorable for breeding
- **Summer** — Increased environmental pressure
- **Autumn** — Preparing for winter
- **Winter** — Harsh conditions

Seasons affect breeding success and environmental pressure on your fleet.

### Gossip

As you play, factions will share rumors:

- **Merchant** — Trade prices and market news
- **Explorer** — Discovery and new locations
- **Scholar** — Knowledge and whale biology
- **Hermit** — Rare deals and secret spots

### Evolution Log

Your whales will evolve over time. The evolution log tracks population changes and trait adaptations.

## Development

```bash
# Install dependencies
npm install

# Run tests with coverage
npm test

# Build for production
npm run build

# Start the game (development)
npm start

# Run version check
npm run test:smoke
```

## Project Structure

```
packages/whale-song/
├── src/
│   ├── services/     # Business logic (game, breeding, trade, gossip, evolution)
│   ├── types/        # TypeScript type definitions
│   ├── data/         # World configuration and templates
│   └── views/        # UI components (map, status, menu, gossip, evolution)
├── dist/             # Compiled JavaScript output
└── tests/            # Test files
```

## License

MIT
