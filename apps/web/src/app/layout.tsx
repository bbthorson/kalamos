import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kalamos — Prescribe Pride",
    template: "%s | Kalamos",
  },
  description:
    "Integrated behavioral health for HIV care. Improve medication adherence with culturally competent, CDC-approved interventions — no hiring, no training, no scheduling.",
  openGraph: {
    title: "Kalamos — Prescribe Pride",
    description:
      "Integrated behavioral health for HIV care. Improve medication adherence with culturally competent interventions.",
    siteName: "Kalamos Care",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
