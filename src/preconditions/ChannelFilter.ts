import { Precondition } from '@sapphire/framework';
import type { ChatInputCommandInteraction } from 'discord.js';

export class UserPrecondition extends Precondition {
	public override chatInputRun(interaction: ChatInputCommandInteraction) {
		if (interaction.channelId === '1172531531902877698') return this.ok();
		return this.error({
			message: 'This command can only be used in <#1172531531902877698>!'
		});
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		ChannelFilter: never;
	}
}
