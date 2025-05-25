import generateMetadata from "@/lib/generate-metadata";
import LoginForm from "./login-form";
import getCurrentSession from "@/server/auth/sessions";
import { redirect } from "next/navigation";

export const metadata = generateMetadata({
  title: "Sign In",
});

export default async function Page() {
  const { user } = await getCurrentSession();

  if (user) redirect("/dashboard");

  return (
    <div className="bg-primary flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
