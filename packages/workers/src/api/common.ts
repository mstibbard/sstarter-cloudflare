import { z } from "@hono/zod-openapi";
import type { Context } from "hono";

export function zodHook(
	res: { success: true } | { success: false; error: z.ZodError },
	c: Context,
) {
	if (res.success) {
		return;
	}

	const error = {
		message: res.error.issues[0]?.message,
		path: res.error.issues[0]?.path,
	};
	return c.json({ data: null, error }, 400);
}

export function ReqBody<T extends z.ZodTypeAny>(schema: T) {
	return {
		body: {
			content: {
				"application/json": {
					schema,
				},
			},
		},
	};
}
export function ReqParams<T extends z.ZodRawShape>(params: T) {
	return {
		params: z.object(params),
	};
}

export function RespError(description: string) {
	return {
		content: {
			"application/json": {
				schema: z.object({
					data: z.null(),
					error: z.string(),
				}),
			},
		},
		description,
	};
}

export function RespSuccess<T extends z.ZodTypeAny>(
	description: string,
	schema: T,
) {
	return {
		content: {
			"application/json": {
				schema: z.object({
					data: schema,
					error: z.null(),
				}),
			},
		},
		description,
	};
}

export function errorBody(error: string) {
	return { data: null, error };
}

export function successBody<T>(data: T) {
	return { data, error: null };
}
