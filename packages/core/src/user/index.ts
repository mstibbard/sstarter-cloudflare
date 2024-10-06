import { extendZodWithOpenApi } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../drizzle";
import { fn } from "../util/fn";
import { createID, prefixedUlid } from "../util/id";
import { userTable } from "./user.sql";

extendZodWithOpenApi(z);

export namespace User {
	export const Info = z.object({
		id: prefixedUlid("user"),
		email: z.string().email().openapi({ example: "john@acme.com" }),
	});
	export type Info = z.infer<typeof Info>;

	export const create = fn(Info.pick({ email: true }), async (input) => {
		const id = createID("user");
		const result = await db()
			.insert(userTable)
			.values({ id, email: input.email })
			.returning()
			.then((rows) => rows.map(serialize).at(0));
		return result;
	});

	export const update = fn(
		Info.pick({ id: true, email: true }),
		async (input) => {
			const result = await db()
				.update(userTable)
				.set({ email: input.email, time_updated: Date.now() })
				.where(eq(userTable.id, input.id))
				.returning()
				.then((rows) => rows.map(serialize).at(0));
			return result;
		},
	);

	export const fromID = fn(Info.shape.id, async (id) => {
		const result = await db()
			.select()
			.from(userTable)
			.where(eq(userTable.id, id))
			.then((rows) => rows.map(serialize).at(0));

		return result;
	});

	function serialize(
		input: typeof userTable.$inferSelect,
	): z.infer<typeof Info> {
		return {
			id: input.id,
			email: input.email,
		};
	}
}
