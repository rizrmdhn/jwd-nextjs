import React from "react";
import getCurrentSession from "@/server/auth/sessions";
import CardSection from "./card-section";
import { api } from "@/trpc/server";

export default async function Dashboard() {
  const { user } = await getCurrentSession();

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 19) return "Selamat Sore";
    return "Selamat Malam";
  };

  void api.product.getCount.prefetch();

  return (
    <>
      <div className="w-full">
        <h1 className="mb-4 text-3xl">
          {getGreeting()}, {user?.name || "Name"}!
        </h1>
        <p className="text-muted-foreground">Selamat datang di dashboard.</p>
      </div>
      <CardSection />
    </>
  );
}
