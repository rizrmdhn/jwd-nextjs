import { z } from "zod";
import { zfd } from "zod-form-data";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import type { UsersWithoutFoto } from "@/types/users.types";
import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";

export const getUserSearchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<UsersWithoutFoto>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  name: parseAsString.withDefault(""),
  username: parseAsString.withDefault(""),
  createdAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
};

export const getUserSearchParamsCache =
  createSearchParamsCache(getUserSearchParams);

export type GetUsersSchema = Awaited<
  ReturnType<typeof getUserSearchParamsCache.parse>
>;

const getUsersSchema = z.object({
  page: z.number().default(1),
  perPage: z.number().default(10),
  sort: z
    .array(
      z.object({
        id: z.enum(["id", "name", "username", "createdAt", "updatedAt"]),
        desc: z.boolean(),
      }),
    )
    .default([{ id: "createdAt", desc: true }]),
  name: z.string().default(""),
  username: z.string().default(""),
  createdAt: z.array(z.coerce.number()).default([]),
  filters: z.array(z.object({})).default([]),
  joinOperator: z.enum(["and", "or"]).default("and"),
});

const createUserSchema = z.object({
  username: z
    .string({
      required_error: "Username dibutuhkan",
      invalid_type_error: "Username harus berupa string",
    })
    .regex(/^[a-zA-Z]+$/, {
      message: "Username hanya boleh terdiri dari huruf",
    })
    .min(1, {
      message: "Username dibutuhkan",
    })
    .max(255, {
      message: "Username tidak boleh lebih dari 255 karakter",
    }),
  password: z
    .string({
      required_error: "Password dibutuhkan",
      invalid_type_error: "Password harus berupa string",
    })
    .min(8, {
      message: "Password harus terdiri dari minimal 8 karakter",
    })
    .max(255, {
      message: "Password tidak boleh lebih dari 255 karakter",
    }),
  name: z
    .string({
      message: "Nama dibutuhkan",
    })
    .min(1, {
      message: "Nama dibutuhkan",
    })
    .max(255, {
      message: "Nama tidak boleh lebih dari 255 karakter",
    }),
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

const updateUserFotoSchema = zfd
  .formData({
    userId: z.string({
      required_error: "User ID harus diisi",
      invalid_type_error: "User ID harus berupa string",
    }),
    foto: zfd.file(),
  })
  .refine((data) => {
    const { foto } = data;
    if (!foto) return false;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const isValidType = allowedTypes.includes(foto.type);
    const isValidSize = foto.size <= 2 * 1024 * 1024; // 2MB

    return isValidType && isValidSize;
  });

const userSchema = {
  createUserSchema,
  updateUserFotoSchema,
  getUsersSchema,
};

export default userSchema;
