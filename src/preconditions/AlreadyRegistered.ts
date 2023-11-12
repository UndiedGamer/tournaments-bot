import { getParticipants } from '#lib/api-functions';
import { Precondition } from '@sapphire/framework';
import { type ChatInputCommandInteraction } from 'discord.js';

export class UserPrecondition extends Precondition {
	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		const participants = await getParticipants();
		const participantForInteractionUser = participants.find((part) => part.participant.misc === interaction.user.id);

		if (participantForInteractionUser) {
			return this.error({
				message: 'You already registered for the tournament!'
			});
		}

		return this.ok();
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		AlreadyRegistered: never;
	}
}
