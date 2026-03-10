#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './views/app.js';

const cli = meow(
  `
	Usage
	  $ my-ink-cli

	Examples
	  $ my-ink-cli
`,
  {
    importMeta: import.meta,
    flags: {
      version: {},
    },
  },
);

if (cli.flags.version) {
  const Version = (await import('./views/version.js')).default;
  render(<Version />);
} else {
  render(<App />);
}
