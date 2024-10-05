import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamps } from "../drizzle/types";

export const userTable = sqliteTable("user", {
	...id,
	...timestamps,
	email: text("email").unique().notNull(),
});
