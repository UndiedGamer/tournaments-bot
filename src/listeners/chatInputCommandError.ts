import { handleChatInputOrError } from '#lib/errorHelpers';
import { Events, Listener, type ChatInputCommandErrorPayload } from '@sapphire/framework';

export class ChatInputCommandError extends Listener<typeof Events.ChatInputCommandError> {
	public run(error: Error, payload: ChatInputCommandErrorPayload) {
		return handleChatInputOrError(error, payload);
	}
}
