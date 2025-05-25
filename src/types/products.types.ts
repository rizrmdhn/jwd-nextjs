import type { InferSelectModel } from "drizzle-orm";
import type { products } from "@/server/db/schema";

export type Products = InferSelectModel<typeof products>;
