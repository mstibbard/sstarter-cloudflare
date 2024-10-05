import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
	dbCredentials: {
		accountId: Resource.DBData.accountID,
		databaseId: Resource.DBData.id,
		token: Resource.CloudflareD1ApiToken.value,
	},
	dialect: "sqlite",
	driver: "d1-http",
	introspect: {
		casing: "preserve",
	},
	migrations: {
		prefix: "index",
	},
	out: "./migrations",
	schema: "./src/**/*.sql.ts",
	strict: true,
	verbose: true,
});
