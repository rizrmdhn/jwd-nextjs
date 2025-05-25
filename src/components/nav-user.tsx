"use client";

import { ChevronsUpDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { type Users } from "@/types/users.types";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { api } from "@/trpc/react";
import { globalErrorToast, globalSuccessToast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { env } from "@/env";

export function NavUser({ user }: { user: Users }) {
  const { theme, setTheme } = useTheme();
  const { isMobile, state } = useSidebar();

  const router = useRouter();

  const { mutate, status } = api.auth.logout.useMutation({
    onSuccess: () => {
      globalSuccessToast("Logout berhasil");
      router.refresh();
    },
    onError: (error) => {
      globalErrorToast(error.message);
    },
  });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground overflow-visible"
            >
              <Suspense fallback={<Skeleton className="h-10 w-10" />}>
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    alt={user.name}
                    src={
                      user?.fotoUrl
                        ? env.NEXT_PUBLIC_APP_URL + user.fotoUrl
                        : ""
                    }
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Suspense>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.username}</span>
              </div>
              {(state === "expanded" || isMobile) && (
                <ChevronsUpDown className="ml-auto size-4" />
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={
                      user?.fotoUrl
                        ? env.NEXT_PUBLIC_APP_URL + user.fotoUrl
                        : ""
                    }
                    alt={user.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.username}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => mutate()}
              disabled={status === "pending"}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
