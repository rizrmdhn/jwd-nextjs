// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `jwd-nextjs_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)],
);

export const users = createTable(
  "users",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$default(() => uuidv7()),
    name: d.varchar({ length: 256 }).notNull(),
    username: d.varchar({ length: 256 }).notNull(),
    password: d.varchar({ length: 256 }).notNull(),
    foto: d.text(),
    fotoUrl: d.text(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("users_id_idx").on(t.id),
    index("users_username_idx").on(t.username),
  ],
);

export const sessions = createTable(
  "sessions",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$default(() => uuidv7()),
    userId: d
      .uuid()
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    expiresAt: d
      .timestamp("expires_at", { withTimezone: true, mode: "string" })
      .notNull(),
    createdAt: d
      .timestamp({ withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (t) => {
    return [
      index("session_id_idx").on(t.id),
      index("user_id_idx").on(t.userId),
    ];
  },
);

export const products = createTable(
  "products",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$default(() => uuidv7()),
    kategori: d.varchar({ length: 256 }).notNull(),
    produk: d.varchar({ length: 256 }).notNull(),
    price: d.numeric().notNull(),
    description: d.text().notNull(),
    foto: d.text(),
    fotoUrl: d.text(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("products_id_idx").on(t.id)],
);
