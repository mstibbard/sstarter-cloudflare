import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { User } from "@sstarter-cloudflare/core/user";
import {
	ReqBody,
	ReqParams,
	RespError,
	RespSuccess,
	errorBody,
	successBody,
	zodHook,
} from "./common";

export namespace UserApi {
	export const UserSchema = z.object(User.Info.shape).openapi("User");

	const tags = ["User"];

	export const route = new OpenAPIHono({ defaultHook: zodHook })
		.openapi(
			createRoute({
				method: "post",
				path: "/",
				summary: "Create user",
				tags,
				request: { ...ReqBody(User.create.schema) },
				responses: {
					400: RespError("Invalid input"),
					200: RespSuccess("Returns new user", UserSchema),
				},
			}),
			async (c) => {
				const user = await User.create(c.req.valid("json"));
				if (!user) return c.json(errorBody("Invalid input"), 400);
				return c.json(successBody(user), 200);
			},
		)
		.openapi(
			createRoute({
				method: "get",
				path: "/{id}",
				summary: "Get user",
				tags,
				request: { ...ReqParams({ id: User.Info.shape.id }) },
				responses: {
					404: RespError("User not found"),
					200: RespSuccess("Returns user", UserSchema),
				},
			}),
			async (c) => {
				const user = await User.fromID(c.req.param("id"));
				if (!user) return c.json(errorBody("User not found"), 404);
				return c.json(successBody(user), 200);
			},
		)
		.openapi(
			createRoute({
				method: "put",
				path: "/{id}",
				summary: "Update user",
				tags,
				request: {
					...ReqParams({ id: User.Info.shape.id }),
					...ReqBody(User.update.schema),
				},
				responses: {
					404: RespError("User not found"),
					200: RespSuccess("Returns updated user", UserSchema),
				},
			}),
			async (c) => {
				const user = await User.update(c.req.valid("json"));
				if (!user) return c.json(errorBody("User not found"), 404);
				return c.json(successBody(user), 200);
			},
		);
}
