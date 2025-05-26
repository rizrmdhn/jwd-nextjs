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
  ).refine((f) => ({
    products: {
      columns: {
        produk: f.valuesFromArray({
          values: [
            "iPhone 14",
            "iPhone 13",
            "iPhone 12",
            "Samsung S23",
            "Samsung S22",
            "Samsung A54",
            "ROG Phone 7",
            "ROG Phone 6",
            "ROG Phone 5",
            "Google Pixel 7",
            "Google Pixel 6",
            "OnePlus 11",
            "OnePlus 10",
            "Xiaomi 13",
            "Xiaomi 12",
            "Oppo Find X5",
            "Oppo Reno 8",
            "Vivo X90",
            "Vivo V25",
            "Realme GT Neo 3",
          ],
        }),
        kategori: f.valuesFromArray({
          values: [
            "Flagship iPhone",
            "Mid-range iPhone",
            "Budget iPhone",
            "Flagship Samsung",
            "Mid-range Samsung",
            "Budget Samsung",
            "Gaming Phone",
            "Premium Gaming",
            "Mid-range Gaming",
            "Google Flagship",
            "Google Mid-range",
            "OnePlus Flagship",
            "OnePlus Mid-range",
            "Xiaomi Flagship",
            "Xiaomi Mid-range",
            "Oppo Flagship",
            "Oppo Mid-range",
            "Vivo Flagship",
            "Vivo Mid-range",
            "Realme Gaming",
          ],
        }),
        price: f.int({ minValue: 0, maxValue: 100000 }),
        stok: f.int({ minValue: 0, maxValue: 50 }),
      },
    },
  }));
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
