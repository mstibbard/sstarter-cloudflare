import { sql } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";

export const id = {
	get id() {
		return text("id").primaryKey().notNull();
	},
};

export const now = sql`current_timestamp`;

export const timestamps = {
	time_created: text("time_created").notNull().default(now),
	time_updated: text("time_updated").notNull().default(now),
};
