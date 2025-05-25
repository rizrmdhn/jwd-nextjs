import React from "react";

import UploadAvatarForm from "@/components/upload-avatar-form";
import { api } from "@/trpc/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getCurrentSession from "@/server/auth/sessions";
import { env } from "@/env";

export default async function ProfilePage() {
  void api.auth.me.prefetch();

  const { user } = await getCurrentSession();

  return (
    <>
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex flex-col items-start gap-8 md:flex-row">
          <div className="flex w-full justify-center md:w-auto md:justify-start">
            <Avatar className="border-muted h-32 w-32 rounded-md">
              <AvatarImage
                src={user?.fotoUrl ? env.APP_URL + user.fotoUrl : undefined}
                alt="user picture"
              />
              <AvatarFallback className="rounded-md text-4xl">
                {user?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Informasi Pribadi</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <span className="text-muted-foreground font-medium">
                    Nama
                  </span>
                  <span className="font-semibold">
                    {user?.name || "User Name"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          <UploadAvatarForm />
        </div>
      </div>
    </>
  );
}
