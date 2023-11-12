import type { Participants } from '#lib/typings';
import { FetchMediaContentTypes, FetchMethods, FetchResultTypes, fetch } from '@sapphire/fetch';
import { envParseString } from '@skyra/env-utilities';

const baseUrl = `https://api.challonge.com/v1/`;
const headers = new Headers({
	'Content-Type': FetchMediaContentTypes.JSON
});

export async function signUser(name: string, userId: string) {
	const url = new URL(`${baseUrl}tournaments/${envParseString('CHALLONGE_TOURNAMENT')}/participants.json`);
	url.searchParams.append('api_key', envParseString('CHALLONGE_KEY'));
	url.searchParams.append('participant[name]', name);
	url.searchParams.append('participant[misc]', userId);

	await fetch(
		url,
		{
			method: FetchMethods.Post,
			headers
		},
		FetchResultTypes.Result
	);
}

export async function getParticipants() {
	const url = new URL(`${baseUrl}tournaments/${envParseString('CHALLONGE_TOURNAMENT')}/participants.json`);
	url.searchParams.append('api_key', envParseString('CHALLONGE_KEY'));

	const data = await fetch<Participants[]>(
		url,
		{
			method: FetchMethods.Get,
			headers
		},
		FetchResultTypes.JSON
	);

	return data;
}
