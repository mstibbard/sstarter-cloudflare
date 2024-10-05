import { eq } from "drizzle-orm";
import { db } from "../drizzle";
import { createID } from "../util/id";
import { userTable } from "./user.sql";

export namespace User {
	export const create = async (email: string) => {
		const id = createID("user");
		const result = await db()
			.insert(userTable)
			.values({ id, email })
			.returning();
		return result;
	};

	export const fromID = async (id: string) => {
		const result = await db()
			.select()
			.from(userTable)
			.where(eq(userTable.id, id));

		return result;
	};
}
