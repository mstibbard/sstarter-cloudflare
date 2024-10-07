CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`time_created` text DEFAULT current_timestamp NOT NULL,
	`time_updated` text DEFAULT current_timestamp NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);