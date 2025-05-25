import { z } from "zod/v4";
import { hash } from "@node-rs/argon2";
import { users } from "../../server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { db } from "@/server/db";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const insertUsersSchema = createInsertSchema(users, {
  username: z.string(),
  password: z.string(),
});

export type UsersToBeInserted = z.infer<typeof insertUsersSchema>;

const generateUsers = async (): Promise<UsersToBeInserted[]> => {
  const rows: UsersToBeInserted[] = [];

  const password = "test12345";

  rows.push({
    username: "admin",
    name: "Admin",
    password: await hash(password),
  });

  return rows;
};

async function seedUsers() {
  const usersToBeInserted = await generateUsers();

  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(users).execute();

  await db.insert(users).values(usersToBeInserted).execute();
}

export default seedUsers;
