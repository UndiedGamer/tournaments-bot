import { ApplyOptions } from '@sapphire/decorators';
import { Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { signUser } from '../lib/api-functions';

@ApplyOptions<Listener.Options>({
	event: 'messageCreate'
})
export class UserEvent extends Listener {
	// @ts-expect-error ...
	public async run(message: Message) {
		if (message.channel.isDMBased()) return;
		if (!message.guild) return;
		if (message.channel.id !== '1171732955736064060') return;
		if (!message.attachments.size) return message.delete();
		const mapped = message.attachments
			.map((attachment) => {
				// eslint-disable-next-line array-callback-return
				if (attachment.contentType !== 'image/jpeg' && attachment.contentType !== 'image/png') return;
				return attachment;
			})
			.filter((attachment) => attachment !== undefined);
		if (!mapped.length) return message.delete();
		await message.react('✅');
		await message.member?.createDM(true);
		const messages = await this.getMessages(message);
		if (!messages) return;
		const { size } = messages.filter((msg) => msg.author.id === message.author.id);
		if (size > 1) {
			await message.delete();
			return message.member?.dmChannel?.send('You already registered for the tournament!');
		}
		await signUser(message.member!.user.displayName);
		await message.member?.dmChannel?.send('You have successfully registered in tournament!');

		if (messages.size === 64) {
			await message.channel.send('Thank you everyone for registering! The tournament managers will get back to you soon with the fictures.');
			return message.channel.edit({
				permissionOverwrites: [
					{
						id: message.guild.roles.everyone.id,
						deny: ['SendMessages']
					}
				]
			});
		}
	}

	private async getMessages(message: Message) {
		if (message.channel.isDMBased()) return;
		const messages = await message.channel.messages.fetch({ limit: 100, cache: false });
		return messages;
	}
}
