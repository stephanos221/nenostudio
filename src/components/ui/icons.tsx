import type { ReactNode } from "react";

function FeatherIcon({ name, children }: { name: string; children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-${name}`}
    >
      {children}
    </svg>
  );
}

/** Small diagonal arrow used in menu rows. */
export function MenuArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 13 13 5M6.5 5H13v6.5" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <FeatherIcon name="plus">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </FeatherIcon>
  );
}

export function ArrowUpRightIcon() {
  return (
    <FeatherIcon name="arrow-up-right">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </FeatherIcon>
  );
}

export function CornerUpLeftIcon() {
  return (
    <FeatherIcon name="corner-up-left">
      <polyline points="9 14 4 9 9 4" />
      <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
    </FeatherIcon>
  );
}

export function ExternalLinkIcon() {
  return (
    <FeatherIcon name="external-link">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </FeatherIcon>
  );
}
