#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './views/app.js';
import Version from './views/version.js';

const cli = meow(
  `
	Usage
	  $ my-ink-cli

	Options
		--name  Your name

	Examples
	  $ my-ink-cli --name=Jane
	  Hello, Jane
`,
  {
    importMeta: import.meta,
    flags: {
      name: {
        type: 'string',
      },
      version: {},
    },
  },
);

if (cli.flags.version) {
  render(<Version />);
} else {
  render(<App name={cli.flags.name} />);
}
