"use client";

import * as Popover from "@radix-ui/react-popover";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { citations } from "@/lib/data/citations";
import { cn } from "@/lib/utils/cn";

interface CitationProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function Citation({ id, children, className }: CitationProps) {
  const [open, setOpen] = useState(false);
  const data = citations[id];

  if (!data) {
    return <span className={className}>{children}</span>;
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            "group inline cursor-help border-0 bg-transparent p-0 text-left underline decoration-accent decoration-dotted decoration-[1.5px] underline-offset-[3px] transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none",
            className
          )}
        >
          {children}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <AnimatePresence>
          {open && (
            <Popover.Content
              side="top"
              sideOffset={8}
              align="center"
              className="z-50"
              asChild
              forceMount
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 4 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="hairline w-[min(420px,calc(100vw-2rem))] origin-bottom border-border-strong bg-bg-elevated p-5 shadow-sm"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                  {data.journal} · {data.year}
                </p>
                <p className="mt-2 font-serif text-base italic leading-snug text-fg">
                  {data.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">
                  {data.authors}
                </p>
                {data.summary && (
                  <p className="mt-3 border-t border-border pt-3 text-xs leading-relaxed text-fg-muted">
                    {data.summary}
                  </p>
                )}
                {data.url && (
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent transition-opacity hover:opacity-80"
                  >
                    Read paper <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
                <Popover.Arrow className="fill-bg-elevated stroke-border-strong" width={12} height={6} />
              </motion.div>
            </Popover.Content>
          )}
        </AnimatePresence>
      </Popover.Portal>
    </Popover.Root>
  );
}
