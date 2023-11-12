import type { ChatInputCommandDeniedPayload, UserError } from '@sapphire/framework';

export function handleChatInputDenied(
	{ message: content }: UserError,

	{ interaction }: ChatInputCommandDeniedPayload
) {
	if (interaction.replied || interaction.deferred) {
		return interaction.editReply({
			content,
			allowedMentions: { users: [interaction.user.id], roles: [] }
		});
	}

	return interaction.reply({
		content,
		allowedMentions: { users: [interaction.user.id], roles: [] },
		ephemeral: true
	});
}
