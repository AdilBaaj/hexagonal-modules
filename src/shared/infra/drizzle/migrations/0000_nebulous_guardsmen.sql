CREATE TABLE IF NOT EXISTS "book_books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"content" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
