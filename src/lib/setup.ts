// Unless explicitly defined, set NODE_ENV as development:
process.env.NODE_ENV ??= 'development';

import { ApplicationCommandRegistries, RegisterBehavior } from '@sapphire/framework';
import '@sapphire/plugin-logger/register';
import { setup } from '@skyra/env-utilities';
import * as colorette from 'colorette';
import { inspect } from 'node:util';

declare module '@skyra/env-utilities' {
	interface Env {
		CHALLONGE_TOURNAMENT: string;
		CHALLONGE_KEY: string;
		CHANNEL_FILTER: string;
	}
}

// Set default behavior to bulk overwrite
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);

// Read env var
setup();

// Set default inspection depth
inspect.defaultOptions.depth = 1;

// Enable colorette
colorette.createColors({ useColor: true });
