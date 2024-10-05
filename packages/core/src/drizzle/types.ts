import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

export const id = {
	get id() {
		return text("id").primaryKey().notNull();
	},
};

export const timestamps = {
	time_created: integer("time_created")
		.notNull()
		.default(sql`(cast(strftime('%s','now') as int))`),
	time_updated: integer("time_updated")
		.notNull()
		.default(sql`(cast(strftime('%s','now') as int))`),
};
