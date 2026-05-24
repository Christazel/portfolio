import type { ReactNode } from "react";

type PortfolioPillProps = {
  children: ReactNode;
  strong?: boolean;
};

export default function PortfolioPill({ children, strong }: PortfolioPillProps) {
  return <span className={`pill ${strong ? "pill-strong" : ""}`}>{children}</span>;
}
