CREATE TABLE IF NOT EXISTS "book_authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "book_books" ADD COLUMN "author_id" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book_books" ADD CONSTRAINT "book_books_author_id_book_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "book_authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
