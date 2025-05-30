"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import authSchema from "@/schema/auth.schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { globalErrorToast, globalSuccessToast } from "@/lib/toast";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const utils = api.useUtils();

  const [type, setType] = useState<"text" | "password">("password");

  const router = useRouter();

  const { mutate, status } = api.auth.login.useMutation({
    onSuccess: async () => {
      globalSuccessToast("Login berhasil");

      await utils.auth.me.invalidate();

      router.push("/dashboard");
    },
    onError: (error) => {
      globalErrorToast(error.message);
    },
  });

  const form = useForm<z.infer<typeof authSchema.loginSchema>>({
    resolver: zodResolver(authSchema.loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function handleSubmit(data: z.infer<typeof authSchema.loginSchema>) {
    mutate(data);
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-start text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="ml-1 font-bold">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Masukkan username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="ml-1 font-bold">Password</FormLabel>
                  <FormControl className="relative">
                    <div>
                      <Input
                        placeholder="Masukkan password"
                        type={type}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant={"ghost"}
                        className="absolute top-0 right-2 p-0 hover:bg-transparent"
                        onClick={() => {
                          setType((prev) =>
                            prev === "password" ? "text" : "password",
                          );
                        }}
                      >
                        {type === "password" ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={status === "pending"}
            >
              {status === "pending" ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
