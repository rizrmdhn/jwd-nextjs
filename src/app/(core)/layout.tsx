import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import generateMetadata from "@/lib/generate-metadata";
import getCurrentSession from "@/server/auth/sessions";
import { HydrateClient } from "@/trpc/server";
import type { NavMainItem } from "@/types/sidebar.types";
import { FileText, HomeIcon, ShoppingCart, UserRound } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = generateMetadata({
  title: "Dashboard Atlit",
});

type DashboardAtlitLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardAtlitLayoutProps) {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/");
  }

  const menuItems: NavMainItem[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <HomeIcon />,
    },
    {
      title: "Products",
      url: "/products",
      icon: <ShoppingCart />,
    },
    {
      title: "Content Types",
      url: "/content-types",
      icon: <FileText />,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: <UserRound />,
    },
  ];

  return (
    <SidebarProvider
      defaultOpen={(await cookies()).get("sidebar_state")?.value === "true"}
    >
      <AppSidebar user={user} data={menuItems} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <main className="max-h-screen-with-header-md lg:max-h-screen-with-header-lg flex w-screen flex-1 flex-col gap-4 p-4 md:w-full lg:w-full lg:gap-6 lg:p-6">
          <HydrateClient>{children}</HydrateClient>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
