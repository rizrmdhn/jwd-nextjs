import { relations } from "drizzle-orm/relations";
import { sessions, users } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  session: many(sessions),
}));
