import { seed } from "drizzle-seed";
import seedUsers from "./users";
import { db } from "@/server/db";
import { products } from "@/server/db/schema";

async function seeders() {
  await seedUsers();

  await seed(
    db,
    { products },
    {
      count: 15,
    },
  );
}

seeders()
  .then(() => {
    console.log("Seeding has been completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error while seeding:", err);
    process.exit(1);
  });
