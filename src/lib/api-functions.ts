import { fetch } from '@sapphire/fetch';
import type { Show, Index } from './typings';

const baseUrl = `https://api.challonge.com/v1/`;

export async function getTournament(tournamentId: number) {
	const data = await fetch<Show>(`${baseUrl}tournaments/${tournamentId}.json?api_key=${process.env.CHALLONGE_KEY}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
	return data;
}

export async function getAll() {
	const data = await fetch<Index>(`${baseUrl}tournaments.json?api_key=${process.env.CHALLONGE_KEY}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
	return data;
}

export async function signUser(name: string) {
	await fetch(`${baseUrl}tournaments/13697686/participants.json?api_key=${process.env.CHALLONGE_KEY}&participant[name]=${name}`, {
		method: 'POST'
	});
}
