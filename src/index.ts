import '#lib/setup';
import { LogLevel, SapphireClient } from '@sapphire/framework';
import { envParseString } from '@skyra/env-utilities';
import { GatewayIntentBits } from 'discord.js';

const client = new SapphireClient({
	logger: {
		level: envParseString('NODE_ENV') === 'production' ? LogLevel.Error : LogLevel.Debug
	},
	shards: 'auto',
	intents: [GatewayIntentBits.Guilds]
});

client.logger.info('Logging in');
void client.login(process.env.DISCORD_TOKEN);
