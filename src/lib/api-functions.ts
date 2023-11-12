import type { Index, Show } from '#lib/typings';
import { FetchMediaContentTypes, FetchMethods, FetchResultTypes, fetch } from '@sapphire/fetch';
import { envParseString } from '@skyra/env-utilities';

const baseUrl = `https://api.challonge.com/v1/`;

export async function getTournament() {
	const url = new URL(`${baseUrl}tournaments/${envParseString('CHALLONGE_TOURNAMENT')}.json`);
	url.searchParams.append('api_key', envParseString('CHALLONGE_KEY'));

	const data = await fetch<Show>(
		url,
		{
			method: FetchMethods.Get,
			headers: {
				'Content-Type': FetchMediaContentTypes.JSON
			}
		},
		FetchResultTypes.JSON
	);

	return data;
}

export async function getAll() {
	const url = new URL(`${baseUrl}tournaments.json`);
	url.searchParams.append('api_key', envParseString('CHALLONGE_KEY'));

	const data = await fetch<Index>(
		url,
		{
			method: FetchMethods.Get,
			headers: {
				'Content-Type': FetchMediaContentTypes.JSON
			}
		},
		FetchResultTypes.JSON
	);

	return data;
}

export async function signUser(name: string) {
	const url = new URL(`${baseUrl}tournaments/${envParseString('CHALLONGE_TOURNAMENT')}/participants.json`);
	url.searchParams.append('api_key', envParseString('CHALLONGE_KEY'));
	url.searchParams.append('participant[name]', name);

	await fetch(
		url,
		{
			method: FetchMethods.Post,
			headers: {
				'Content-Type': FetchMediaContentTypes.JSON
			}
		},
		FetchResultTypes.Result
	);
}
