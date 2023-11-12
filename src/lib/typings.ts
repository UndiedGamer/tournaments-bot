export type Show = Base;
export type Index = Base[];

export interface Base {
	tournament: Tournament;
}

export interface Participants {
	participant: Participant;
}

export interface Tournament {
	accept_attachments: boolean;
	allow_participant_match_reporting: boolean;
	anonymous_voting: boolean;
	category: null;
	check_in_duration: null;
	completed_at: null;
	created_at: string;
	created_by_api: boolean;
	credit_capped: boolean;
	description: string;
	game_id: number;
	group_stages_enabled: boolean;
	hide_forum: boolean;
	hide_seeds: boolean;
	hold_third_place_match: boolean;
	id: number;
	max_predictions_per_user: number;
	name: string;
	notify_users_when_matches_open: boolean;
	notify_users_when_the_tournament_ends: boolean;
	open_signup: boolean;
	participants_count: number;
	prediction_method: number;
	predictions_opened_at: null;
	private: boolean;
	progress_meter: number;
	pts_for_bye: string;
	pts_for_game_tie: string;
	pts_for_game_win: string;
	pts_for_match_tie: string;
	pts_for_match_win: string;
	quick_advance: boolean;
	ranked_by: string;
	require_score_agreement: boolean;
	rr_pts_for_game_tie: string;
	rr_pts_for_game_win: string;
	rr_pts_for_match_tie: string;
	rr_pts_for_match_win: string;
	sequential_pairings: boolean;
	show_rounds: boolean;
	signup_cap: null;
	start_at: null;
	started_at: string;
	started_checking_in_at: null;
	state: string;
	swiss_rounds: number;
	teams: boolean;
	tie_breaks: string[];
	tournament_type: string;
	updated_at: string;
	url: string;
	description_source: string;
	subdomain: null;
	full_challonge_url: string;
	live_image_url: string;
	sign_up_url: null;
	review_before_finalizing: boolean;
	accepting_predictions: boolean;
	participants_locked: boolean;
	game_name: string;
	participants_swappable: boolean;
	team_convertable: boolean;
	group_stages_were_started: boolean;
}

export interface Participant {
	active: boolean;
	checked_in_at?: any;
	created_at: string;
	final_rank?: any;
	group_id?: any;
	icon?: any;
	id: number;
	invitation_id?: any;
	invite_email?: any;
	misc?: any;
	name: string;
	on_waiting_list: boolean;
	seed: number;
	tournament_id: number;
	updated_at: string;
	challonge_username?: any;
	challonge_email_address_verified?: any;
	removable: boolean;
	participatable_or_invitation_attached: boolean;
	confirm_remove: boolean;
	invitation_pending: boolean;
	display_name_with_invitation_email_address: string;
	email_hash?: any;
	username?: any;
	attached_participatable_portrait_url?: any;
	can_check_in: boolean;
	checked_in: boolean;
	reactivatable: boolean;
}
