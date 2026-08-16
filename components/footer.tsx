import Link from "next/link";

const navColumn = [
  { href: "/story", label: "Story" },
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
];

const receiptsColumn = [
  { href: "/products", label: "Lab certificates" },
  { href: "/products", label: "Research index" },
  { href: "/story", label: "How we test" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl italic leading-tight tracking-tight text-fg">
            complere
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-muted">
            Third-party tested every batch. Only the bioavailable forms. Every claim linked to peer-reviewed research.
          </p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
            Site
          </p>
          <ul className="mt-5 space-y-3 text-sm text-fg-muted">
            {navColumn.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
            Receipts
          </p>
          <ul className="mt-5 space-y-3 text-sm text-fg-muted">
            {receiptsColumn.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-6 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle md:flex-row md:items-center">
          <span>© {year} complere. demo site.</span>
          <span>independently tested · cited · bioavailable</span>
        </div>
      </div>
    </footer>
  );
}
