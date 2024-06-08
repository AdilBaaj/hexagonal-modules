CREATE TABLE IF NOT EXISTS "author_authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"birth_date" timestamp NOT NULL,
	"email" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
