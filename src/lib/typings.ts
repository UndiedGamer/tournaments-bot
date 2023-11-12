export interface Participants {
	participant: Participant;
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
