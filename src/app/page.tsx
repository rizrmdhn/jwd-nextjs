import getCurrentSession from "@/server/auth/sessions";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await getCurrentSession();

  if (!user) redirect("/sign-in");

  return redirect("/dashboard");
}
