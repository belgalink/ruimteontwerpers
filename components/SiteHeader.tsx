"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/projecten", label: "Projecten" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="header-page">
      <Link href="/" className="logo" aria-label="Open Ruimte Ontwerpers — home">
        <span className="mark">oro</span>
        <span className="wordmark">open ruimte ontwerpers</span>
      </Link>
      <nav>
        <ul>
          {NAV.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={pathname.startsWith(href) ? "is-current" : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
