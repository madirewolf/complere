"use client";

import { useCountUp } from "@/lib/hooks/use-count-up";

interface CountUpProps {
  value: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const formatter = (decimals: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export function CountUp({
  value,
  decimals = 0,
  duration = 1400,
  suffix,
  prefix,
  className,
}: CountUpProps) {
  const { ref, value: current } = useCountUp(value, { duration, decimals });
  const fmt = formatter(decimals);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {fmt.format(current)}
      {suffix}
    </span>
  );
}
