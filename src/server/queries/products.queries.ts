import { filterColumns } from "@/lib/filter-column";
import type { GetProductsSchema } from "@/schema/product.schema";
import { and, asc, count, desc, eq, gte, ilike, lte } from "drizzle-orm";
import { products } from "../db/schema";
import { db, type DBType } from "../db";
import type { z } from "zod";
import type productSchema from "@/schema/product.schema";
import { TRPCError } from "@trpc/server";
import { deleteFile } from "../storage/delete-file";

const productsQueries = {
  async getAllProducts(input: GetProductsSchema) {
    try {
      const offset = (input.page - 1) * input.perPage;
      const advancedTable = input.filters && input.filters.length > 0;

      const where = advancedTable
        ? filterColumns({
            table: products,
            filters: input.filters,
            joinOperator: "and",
          })
        : and(
            input.kategori
              ? ilike(products.kategori, `%${input.kategori}%`)
              : undefined,
            input.produk
              ? ilike(products.produk, `%${input.produk}%`)
              : undefined,
            input.createdAt.length > 0
              ? and(
                  input.createdAt[0]
                    ? gte(
                        products.createdAt,
                        (() => {
                          const date = new Date(input.createdAt[0]);
                          date.setHours(0, 0, 0, 0);
                          return date;
                        })(),
                      )
                    : undefined,
                  input.createdAt[1]
                    ? lte(
                        products.createdAt,
                        (() => {
                          const date = new Date(input.createdAt[1]);
                          date.setHours(23, 59, 59, 999);
                          return date;
                        })(),
                      )
                    : undefined,
                )
              : undefined,
          );

      const orderBy =
        input.sort.length > 0
          ? input.sort.map((item) =>
              item.desc ? desc(products[item.id]) : asc(products[item.id]),
            )
          : [asc(products.createdAt)];

      const { data, total } = await db.transaction(async (tx) => {
        const data = await tx
          .select()
          .from(products)
          .limit(input.perPage)
          .offset(offset)
          .where(where)
          .orderBy(...orderBy);

        const total = await tx
          .select({
            count: count(),
          })
          .from(products)
          .where(where)
          .execute()
          .then((res) => res[0]?.count ?? 0);

        return {
          data,
          total,
        };
      });

      const pageCount = Math.ceil(total / input.perPage);
      return { data, pageCount };
    } catch {
      return { data: [], pageCount: 0 };
    }
  },

  async getProductById(id: string) {
    const product = await db.query.products.findFirst({
      where: (products, { eq }) => eq(products.id, id),
    });

    if (!product) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Product with id ${id} not found`,
      });
    }

    return product;
  },

  async createProduct(
    data: z.infer<typeof productSchema.createProductSchema>,
    foto: string,
    fotoUrl: string,
    transaction: DBType,
  ) {
    const [product] = await transaction
      .insert(products)
      .values({
        produk: data.produk,
        kategori: data.kategori,
        price: data.price,
        description: data.description,
        foto,
        fotoUrl,
      })
      .returning();

    if (!product) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create product",
      });
    }

    return product;
  },

  async updateProduct(
    data: z.infer<typeof productSchema.updateProductSchema>,
    foto: string | null,
    fotoUrl: string | null,
    transaction: DBType,
  ) {
    const isExist = await this.getProductById(data.id);

    if (!isExist) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Product with id ${data.id} not found`,
      });
    }

    const [product] = await transaction
      .update(products)
      .set({
        produk: data.produk,
        kategori: data.kategori,
        price: data.price,
        description: data.description,
        foto: foto ?? undefined,
        fotoUrl: fotoUrl ?? undefined,
      })
      .where(eq(products.id, data.id))
      .returning();

    if (foto && fotoUrl) {
      // check if has foto profile before
      if (isExist.foto) {
        // Delete the old foto
        await deleteFile("products", isExist.foto);
      }

      await transaction
        .update(products)
        .set({ foto, fotoUrl })
        .where(eq(products.id, data.id));
    }

    if (!product) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update product",
      });
    }

    return product;
  },

  async deleteProduct(id: string) {
    const product = await this.getProductById(id);

    if (!product) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Product with id ${id} not found`,
      });
    }

    // Delete the foto if exists
    if (product.foto) {
      await deleteFile("products", product.foto);
    }

    const [result] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    if (!result) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete product",
      });
    }

    return result;
  },
};

export default productsQueries;
