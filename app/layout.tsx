import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Open Ruimte Ontwerpers",
    template: "%s | Open Ruimte Ontwerpers",
  },
  description:
    "ORO is een ontwerp- en studiebureau uit Gent voor landschapsarchitectuur, stedenbouw en groene buitenruimte.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
