import { alreadyRegisteredUsers } from '#lib/already-registered-users-storage';
import { signUser } from '#lib/api-functions';
import { ApplyOptions } from '@sapphire/decorators';
import { Command, UserError } from '@sapphire/framework';
import { ChannelType } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'Register yourself for the tournament',
	runIn: ChannelType.GuildText,
	preconditions: ['MaxUsersFilter', 'ChannelFilter']
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder //
				.setName(this.name)
				.setDescription(this.description)
				.addAttachmentOption((builder) =>
					builder //
						.setName('attachment')
						.setDescription('The attachment to register with')
						.setRequired(true)
				)
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		await interaction.deferReply({ ephemeral: true });

		const attachments = interaction.options.getAttachment('attachment', true);
		if (attachments.contentType !== 'image/jpeg' && attachments.contentType !== 'image/png') {
			throw new UserError({
				identifier: 'InvalidAttachmentType',
				message: 'Invalid attachment type provided, I only support JPEG and PNG images!'
			});
		}

		if (alreadyRegisteredUsers.has(interaction.user.id)) {
			throw new UserError({
				identifier: 'AlreadyRegistered',
				message: 'You already registered for the tournament!'
			});
		}

		await signUser(interaction.user.displayName);

		return interaction.editReply({
			content: 'You have successfully registered in tournament!'
		});
	}
}
