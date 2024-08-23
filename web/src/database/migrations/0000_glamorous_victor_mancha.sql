CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"username" varchar(64) NOT NULL,
	"password_hash" varchar(256) NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "software_project" (
	"software_project_id" serial PRIMARY KEY NOT NULL,
	"owner_name" varchar(255) NOT NULL,
	"project_name" varchar(255) NOT NULL,
	"branch_name" varchar(255) NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"description" varchar(1023) NOT NULL,
	"html_url" varchar(1023) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "software_project_full_name_unique" UNIQUE("full_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "software_project_scan_commit" (
	"software_project_commit_id" serial PRIMARY KEY NOT NULL,
	"software_project_scan_id" integer NOT NULL,
	"commit_sha" varchar(63) NOT NULL,
	"commit_message" varchar(1023) NOT NULL,
	"author_name" varchar(63) NOT NULL,
	"commit_date" timestamp NOT NULL,
	"html_url" varchar(1023) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "software_project_scan" (
	"software_project_scan_id" serial PRIMARY KEY NOT NULL,
	"software_project_id" integer NOT NULL,
	"dispatched_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"aborted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "software_project_scan_tag" (
	"software_project_scan_tag_id" serial PRIMARY KEY NOT NULL,
	"software_project_scan_id" integer NOT NULL,
	"tag" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "software_project_language" (
	"software_project_language_id" serial PRIMARY KEY NOT NULL,
	"software_project_scan_id" integer NOT NULL,
	"language_name" varchar(255) NOT NULL,
	"num_lines" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "software_project_scan_contributor" (
	"software_project_contributor_id" serial PRIMARY KEY NOT NULL,
	"software_project_scan_id" integer NOT NULL,
	"login" varchar(63) NOT NULL,
	"htmlUrl" varchar(1023) NOT NULL,
	"avatar_url" varchar(1023) NOT NULL,
	"contributions" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "software_organization" (
	"software_organization_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(63) NOT NULL,
	"full_name" varchar(1023) NOT NULL,
	"htmlUrl" varchar(1023) NOT NULL,
	"avatar_url" varchar(1023) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "software_project_scan_commit" ADD CONSTRAINT "software_project_scan_commit_software_project_scan_id_software_project_scan_software_project_scan_id_fk" FOREIGN KEY ("software_project_scan_id") REFERENCES "public"."software_project_scan"("software_project_scan_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "software_project_scan" ADD CONSTRAINT "software_project_scan_software_project_id_software_project_software_project_id_fk" FOREIGN KEY ("software_project_id") REFERENCES "public"."software_project"("software_project_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "software_project_scan_tag" ADD CONSTRAINT "software_project_scan_tag_software_project_scan_id_software_project_scan_software_project_scan_id_fk" FOREIGN KEY ("software_project_scan_id") REFERENCES "public"."software_project_scan"("software_project_scan_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "software_project_language" ADD CONSTRAINT "software_project_language_software_project_scan_id_software_project_scan_software_project_scan_id_fk" FOREIGN KEY ("software_project_scan_id") REFERENCES "public"."software_project_scan"("software_project_scan_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "software_project_scan_contributor" ADD CONSTRAINT "software_project_scan_contributor_software_project_scan_id_software_project_scan_software_project_scan_id_fk" FOREIGN KEY ("software_project_scan_id") REFERENCES "public"."software_project_scan"("software_project_scan_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
