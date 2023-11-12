import { Precondition } from '@sapphire/framework';
import { envParseString } from '@skyra/env-utilities';
import { channelMention, type ChatInputCommandInteraction } from 'discord.js';

export class UserPrecondition extends Precondition {
	public override chatInputRun(interaction: ChatInputCommandInteraction) {
		if (interaction.channelId === envParseString('CHANNEL_FILTER')) return this.ok();
		return this.error({
			message: `This command can only be used in ${channelMention(envParseString('CHANNEL_FILTER'))}!`
		});
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		ChannelFilter: never;
	}
}
