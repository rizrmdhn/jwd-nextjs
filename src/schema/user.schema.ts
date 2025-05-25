import { z } from "zod";
import { zfd } from "zod-form-data";

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
};

export default userSchema;
