CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`time_created` integer DEFAULT (cast(strftime('%s','now') as int)) NOT NULL,
	`time_updated` integer DEFAULT (cast(strftime('%s','now') as int)) NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);