import productSchema from "@/schema/product.schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import productsQueries from "@/server/queries/products.queries";
import type { ExtendedColumnFilter } from "@/types/data-table";
import {
  MAXIMUM_FILE_SIZE,
  MAXIMUM_FILE_SIZE_REACH_MESSAGE,
} from "@/lib/constants";
import { TRPCError } from "@trpc/server";
import { writeFileToDisk } from "@/server/storage/write-file-to-disk";
import { v7 as uuidv7 } from "uuid";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  paginate: protectedProcedure
    .input(productSchema.getProductsSchema)
    .query(async ({ input }) => {
      const { data, pageCount } = await productsQueries.getAllProducts({
        page: input.page,
        perPage: input.perPage,
        sort: input.sort,
        kategori: input.kategori,
        produk: input.produk,
        createdAt: input.createdAt,
        filters: input.filters as ExtendedColumnFilter<unknown>[],
        joinOperator: input.joinOperator,
      });

      return {
        data,
        pageCount,
      };
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const product = await productsQueries.getProductById(input.id);

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Produk tidak ditemukan",
        });
      }

      return product;
    }),

  getCount: protectedProcedure.query(async () => {
    const count = await productsQueries.countAllProducts();

    return count;
  }),

  create: protectedProcedure
    .input(productSchema.createFormDataProductsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.transaction(async (tx) => {
        if (input.file.size > MAXIMUM_FILE_SIZE) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: MAXIMUM_FILE_SIZE_REACH_MESSAGE,
          });
        }

        const uploadedFile = await writeFileToDisk(
          "products",
          input.file,
          input.file.type,
          `product-${uuidv7()}`,
        );

        await productsQueries.createProduct(
          input,
          uploadedFile.name,
          uploadedFile.url,
          tx,
        );
      });
    }),

  update: protectedProcedure
    .input(productSchema.updateFormDataProductsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.transaction(async (tx) => {
        if (input.file && input.file.size > MAXIMUM_FILE_SIZE) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: MAXIMUM_FILE_SIZE_REACH_MESSAGE,
          });
        }

        const uploadedFile = input.file
          ? await writeFileToDisk(
              "products",
              input.file,
              input.file.type,
              `product-${uuidv7()}`,
            )
          : null;

        await productsQueries.updateProduct(
          input,
          uploadedFile?.name ?? null,
          uploadedFile?.url ?? null,
          tx,
        );
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const result = await productsQueries.deleteProduct(input.id);

      return result;
    }),
});
