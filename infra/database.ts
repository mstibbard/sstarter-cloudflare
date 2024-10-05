// Ensure `@cloudflare/workers-types` is installed in each package where this is linked,
// otherwise the relevant Cloudflare Bindings are not generated.
export const db = new sst.cloudflare.D1("DB");

export const dbData = new sst.Linkable("DBData", {
	properties: {
		accountID: db.nodes.database.accountId,
		id: db.id,
	},
});
