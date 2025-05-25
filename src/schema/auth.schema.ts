import { z } from "zod";

const loginSchema = z.object({
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
});

const authSchema = {
  loginSchema,
};

export default authSchema;
