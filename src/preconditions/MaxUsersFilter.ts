import { getParticipants } from '#lib/api-functions';
import { Precondition } from '@sapphire/framework';
import { PermissionFlagsBits, type ChatInputCommandInteraction } from 'discord.js';

export class UserPrecondition extends Precondition {
	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		const participants = await getParticipants();

		if (participants.length >= 32) {
			// Lock the command to Administrators only
			await interaction.guild?.commands.cache.get(interaction.commandId)?.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

			return this.error({
				message: 'Thank you everyone for registering! The tournament managers will get back to you soon with the brackets.'
			});
		}

		return this.ok();
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		MaxUsersFilter: never;
	}
}
