import { signUser } from '#lib/api-functions';
import { ApplyOptions } from '@sapphire/decorators';
import { Command, UserError } from '@sapphire/framework';
import { ChannelType, userMention } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'Register yourself for the tournament',
	runIn: ChannelType.GuildText,
	preconditions: ['ChannelFilter', 'MaxUsersFilter', 'AlreadyRegistered']
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
		await interaction.deferReply();

		const attachments = interaction.options.getAttachment('attachment', true);
		if (attachments.contentType !== 'image/jpeg' && attachments.contentType !== 'image/png') {
			throw new UserError({
				identifier: 'InvalidAttachmentType',
				message: 'Invalid attachment type provided, I only support JPEG and PNG images!'
			});
		}

		await signUser(interaction.user.displayName, interaction.user.id);

		return interaction.editReply({
			content: `${userMention(interaction.user.id)} has successfully registered in tournament, here is their team logo:`,
			files: [attachments]
		});
	}
}
