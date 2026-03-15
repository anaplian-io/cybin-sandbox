#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './views/app.js';
import HelpDisplay from './views/help.js';

const cli = meow(
  `
	Usage
	  $ whale-song

	Examples
	  $ whale-song
	  $ whale-song --help
	  $ whale-song --version

	Controls
	  Arrows/WASD  Move whale
	  W            Toggle whale fleet status
	  Enter        Open context menu (breeding/trading)
	  ESC          Close menus or exit

	Options
	  --save       Save current game state (manual save)
	  --load       Load a saved game from slot (experimental)

	Website
	  <https://github.com/anaplian-io/cybin-sandbox>
`,
  {
    importMeta: import.meta,
    flags: {
      version: {},
      help: {},
      save: {
        type: 'string',
        description: 'Save game to specified slot ID',
      },
      load: {
        type: 'string',
        description: 'Load game from specified slot ID (experimental)',
      },
    },
  },
);

if (cli.flags.version) {
  const Version = (await import('./views/version.js')).default;
  render(<Version />);
} else if (cli.flags.help) {
  render(<HelpDisplay />);
} else if (cli.flags.save) {
  // Save mode - run briefly to get current state, then save
  console.log('Saving game is not yet implemented in CLI mode.');
} else if (cli.flags.load) {
  // Load mode - load from save and continue
  console.log('Loading game is not yet implemented in CLI mode.');
} else {
  render(<App />);
}
