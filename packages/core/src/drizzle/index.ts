import { drizzle } from "drizzle-orm/d1";
import { Resource } from "sst";

export function db() {
	return drizzle(Resource.DB);
}
