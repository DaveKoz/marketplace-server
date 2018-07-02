import { Event, EventData } from "../index";
import { Common } from "./common";

/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Phase 1 - stellar account creation succeeded
 */
export interface StellarAccountCreationSucceeded extends EventData {
	event_name: "stellar_account_creation_succeeded";
	event_type: "log";
	common: Common;
}

export function create(user_id: string): Event<StellarAccountCreationSucceeded> {
	return new Event<StellarAccountCreationSucceeded>({
		event_name: "stellar_account_creation_succeeded",
		event_type: "log",
		common: Event.common(user_id)
	});
}