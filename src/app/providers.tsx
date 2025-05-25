import ThemeProvider from "@/providers/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <NuqsAdapter>{children}</NuqsAdapter>
    </ThemeProvider>
  );
}
