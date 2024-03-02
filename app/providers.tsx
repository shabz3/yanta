"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { dark } from "@clerk/themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ClerkProvider>
          {children}
          <SpeedInsights />
        </ClerkProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
