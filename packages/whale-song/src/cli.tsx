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

	Website
	  <https://github.com/anaplian-io/cybin-sandbox>
`,
  {
    importMeta: import.meta,
    flags: {
      version: {},
      help: {},
    },
  },
);

if (cli.flags.version) {
  const Version = (await import('./views/version.js')).default;
  render(<Version />);
} else if (cli.flags.help) {
  render(<HelpDisplay />);
} else {
  render(<App />);
}
