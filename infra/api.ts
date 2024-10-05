import { db, dbData } from "./database";
import { secret } from "./secret";

export const api = new sst.cloudflare.Worker("OpenApi", {
	handler: "./packages/workers/src/api/index",
	link: [db, dbData, secret.CloudflareD1ApiToken],
	url: true,
});

export const outputs = {
	openapi: api.url,
};
