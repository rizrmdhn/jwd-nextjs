/* eslint-disable @next/next/no-img-element */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { LoaderCircle } from "lucide-react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { globalErrorToast, globalSuccessToast } from "@/lib/toast";
import productSchema from "@/schema/product.schema";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";

interface UpdateProductFormProps {
  id: string;
}

export default function UpdateProductForm({ id }: UpdateProductFormProps) {
  const utils = api.useUtils();
  const router = useRouter();

  const [product] = api.product.getById.useSuspenseQuery({
    id,
  });

  const { mutate, status } = api.product.update.useMutation({
    onSuccess: async () => {
      globalSuccessToast("Berhasil memperbarui produk");

      await utils.product.paginate.invalidate();

      router.back();
    },
    onError: (error) => {
      globalErrorToast(error.message);
    },
  });

  const form = useForm<z.infer<typeof productSchema.updateProductSchema>>({
    resolver: zodResolver(productSchema.updateProductSchema),
    defaultValues: {
      id: product.id,
      produk: product.produk,
      kategori: product.kategori,
      price: product.price,
      description: product.description,
    },
  });

  function onSubmit(data: z.infer<typeof productSchema.updateProductSchema>) {
    const formData = new FormData();

    formData.append("id", data.id);
    formData.append("produk", data.produk);
    formData.append("kategori", data.kategori);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    if (data.file) formData.append("file", data.file);

    mutate(formData);
  }

  return (
    <ScrollArea className="flex w-full flex-col items-center justify-center overflow-y-auto">
      <div className="flex flex-col items-center justify-center p-0 pt-4 pb-4 lg:p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="kategori"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormControl>
                    <Input placeholder={"Masukkan kategori"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="produk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produk</FormLabel>
                  <FormControl>
                    <Input placeholder={"Masukkan produk"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={"Masukkan harga"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea placeholder={"Masukkan deskripsi"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload File</FormLabel>
                  {product.fotoUrl && (
                    <div className="mb-4">
                      <p className="text-muted-foreground mb-2 text-sm">
                        Current Image:
                      </p>
                      <img
                        src={env.NEXT_PUBLIC_APP_URL + product.fotoUrl}
                        alt="Current product"
                        className="h-auto max-w-[200px] rounded-md"
                      />
                    </div>
                  )}
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-4"
              disabled={status === "pending"}
            >
              {status === "pending" ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Simpan Perubahan
            </Button>
          </form>
        </Form>
      </div>
      <Scrollbar orientation="vertical" />
    </ScrollArea>
  );
}
