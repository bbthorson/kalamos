import type { Metadata } from "next";
import { CompendiumHeader } from "@/components/layout/header";
import { CompendiumFooter } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kalamos Compendium",
    template: "%s | Kalamos Compendium",
  },
  description:
    "Browse, compare, and explore CDC evidence-based interventions for HIV behavioral health. An open research tool from Kalamos Care.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <CompendiumHeader />
        <main className="flex-1">{children}</main>
        <CompendiumFooter />
      </body>
    </html>
  );
}
