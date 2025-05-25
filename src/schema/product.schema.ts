import { z } from "zod";
import { zfd } from "zod-form-data";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import type { Products } from "@/types/products.types";
import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";

export const getProductSearchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Products>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  produk: parseAsString.withDefault(""),
  kategori: parseAsString.withDefault(""),
  createdAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
};

export const getProductSearchParamsCache = createSearchParamsCache(
  getProductSearchParams,
);

export type GetProductsSchema = Awaited<
  ReturnType<typeof getProductSearchParamsCache.parse>
>;

const getProductsSchema = z.object({
  page: z.number().default(1),
  perPage: z.number().default(10),
  sort: z
    .array(
      z.object({
        id: z.enum([
          "id",
          "produk",
          "kategori",
          "price",
          "description",
          "foto",
          "fotoUrl",
          "createdAt",
          "updatedAt",
        ]),
        desc: z.boolean(),
      }),
    )
    .default([{ id: "createdAt", desc: true }]),
  produk: z.string().default(""),
  kategori: z.string().default(""),
  createdAt: z.array(z.coerce.number()).default([]),
  filters: z.array(z.object({})).default([]),
  joinOperator: z.enum(["and", "or"]).default("and"),
});

const createProductSchema = z.object({
  kategori: z
    .string()
    .min(1, "Kategori dibutuhkan")
    .max(256, "Kategori terlalu panjang"),
  produk: z
    .string()
    .min(1, "Nama produk dibutuhkan")
    .max(256, "Nama produk terlalu panjang"),
  price: z
    .string()
    .min(1, "Harga produk dibutuhkan")
    .regex(/^[0-9]+$/, {
      message: "Harga harus berupa angka",
    }),
  description: z
    .string()
    .min(1, "Deskripsi produk dibutuhkan")
    .max(1000, "Deskripsi produk terlalu panjang"),
  file: z.optional(
    z
      .custom<File>()
      .refine((file): file is File => file instanceof File, {
        message: "File harus berupa file",
      })
      .refine(
        (file) => {
          const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
          const isValidType = allowedTypes.includes(file.type);
          const isValidSize = file.size <= 2 * 1024 * 1024; // 2MB
          return isValidType && isValidSize;
        },
        {
          message: "File harus berupa gambar dengan ukuran maksimal 2MB",
        },
      ),
  ),
});

const createFormDataProductsSchema = zfd.formData({
  kategori: z
    .string()
    .min(1, "Kategori dibutuhkan")
    .max(256, "Kategori terlalu panjang"),
  produk: z
    .string()
    .min(1, "Nama produk dibutuhkan")
    .max(256, "Nama produk terlalu panjang"),
  price: z
    .string()
    .min(1, "Harga produk dibutuhkan")
    .regex(/^[0-9]+$/, {
      message: "Harga harus berupa angka",
    }),
  description: z
    .string()
    .min(1, "Deskripsi produk dibutuhkan")
    .max(1000, "Deskripsi produk terlalu panjang"),
  file: zfd.file().refine(
    (file) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const isValidType = allowedTypes.includes(file.type);
      const isValidSize = file.size <= 2 * 1024 * 1024; // 2MB
      return isValidType && isValidSize;
    },
    {
      message: "File harus berupa gambar dengan ukuran maksimal 2MB",
    },
  ),
});

const updateProductSchema = z.object({
  id: z.string().min(1, "ID produk dibutuhkan"),
  kategori: z
    .string()
    .min(1, "Kategori dibutuhkan")
    .max(256, "Kategori terlalu panjang"),
  produk: z
    .string()
    .min(1, "Nama produk dibutuhkan")
    .max(256, "Nama produk terlalu panjang"),
  price: z
    .string()
    .min(1, "Harga produk dibutuhkan")
    .regex(/^[0-9]+$/, {
      message: "Harga harus berupa angka",
    }),
  description: z
    .string()
    .min(1, "Deskripsi produk dibutuhkan")
    .max(1000, "Deskripsi produk terlalu panjang"),
  file: z.optional(
    z
      .custom<File>()
      .refine((file): file is File => file instanceof File, {
        message: "File harus berupa file",
      })
      .refine(
        (file) => {
          const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
          const isValidType = allowedTypes.includes(file.type);
          const isValidSize = file.size <= 2 * 1024 * 1024; // 2MB
          return isValidType && isValidSize;
        },
        {
          message: "File harus berupa gambar dengan ukuran maksimal 2MB",
        },
      ),
  ),
});

const updateFormDataProductsSchema = zfd.formData({
  id: z.string().min(1, "ID produk dibutuhkan"),
  kategori: z
    .string()
    .min(1, "Kategori dibutuhkan")
    .max(256, "Kategori terlalu panjang"),
  produk: z
    .string()
    .min(1, "Nama produk dibutuhkan")
    .max(256, "Nama produk terlalu panjang"),
  price: z
    .string()
    .min(1, "Harga produk dibutuhkan")
    .regex(/^[0-9]+$/, {
      message: "Harga harus berupa angka",
    }),
  description: z
    .string()
    .min(1, "Deskripsi produk dibutuhkan")
    .max(1000, "Deskripsi produk terlalu panjang"),
  file: z.optional(
    zfd.file().refine(
      (file) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        const isValidType = allowedTypes.includes(file.type);
        const isValidSize = file.size <= 2 * 1024 * 1024; // 2MB
        return isValidType && isValidSize;
      },
      {
        message: "File harus berupa gambar dengan ukuran maksimal 2MB",
      },
    ),
  ),
});

const productSchema = {
  getProductsSchema,
  createProductSchema,
  createFormDataProductsSchema,
  updateProductSchema,
  updateFormDataProductsSchema,
};

export default productSchema;
