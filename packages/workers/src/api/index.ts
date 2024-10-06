import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { errorBody, zodHook } from "./common";
import { UserApi } from "./user";

const app = new OpenAPIHono({ defaultHook: zodHook });

const routes = app
	.get("/", swaggerUI({ url: "/doc" }))
	.route("/user", UserApi.route)
	.onError((error, c) => {
		console.error(error);
		return c.json(errorBody("Internal server error"), 500);
	});

app.doc("/doc", () => ({
	openapi: "3.0.0",
	info: {
		title: "SSTarter Cloudflare API",
		version: "0.0.1",
	},
}));

export type Routes = typeof routes;
export default app;
