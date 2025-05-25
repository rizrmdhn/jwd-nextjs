CREATE TABLE "jwd-nextjs_products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"kategori" varchar(256) NOT NULL,
	"produk" varchar(256) NOT NULL,
	"price" numeric NOT NULL,
	"description" text NOT NULL,
	"foto" text,
	"fotoUrl" text,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "jwd-nextjs_sessions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jwd-nextjs_users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"username" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"foto" text,
	"fotoUrl" text,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "jwd-nextjs_sessions" ADD CONSTRAINT "jwd-nextjs_sessions_userId_jwd-nextjs_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."jwd-nextjs_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "products_id_idx" ON "jwd-nextjs_products" USING btree ("id");--> statement-breakpoint
CREATE INDEX "session_id_idx" ON "jwd-nextjs_sessions" USING btree ("id");--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "jwd-nextjs_sessions" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "users_id_idx" ON "jwd-nextjs_users" USING btree ("id");--> statement-breakpoint
CREATE INDEX "users_username_idx" ON "jwd-nextjs_users" USING btree ("username");