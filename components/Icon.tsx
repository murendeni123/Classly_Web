import type { IconName } from '@/content/site-content';

type Props = { name: IconName; className?: string };

// Single inline SVG set (stroke-based, 24x24) so we ship zero icon dependencies.
const paths: Record<IconName, React.ReactNode> = {
  shield: <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" />,
  badge: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13l-1 7 4-2 4 2-1-7" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),
  chat: <path d="M4 5h16v11H8l-4 4V5z" />,
  chart: <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-7" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  bell: <path d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6M10 21h4" />,
  flag: <path d="M5 21V4h12l-2 4 2 4H5" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 118 0v3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0112 0M16 6a3 3 0 010 6M18 20a6 6 0 00-3-5" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3h6v1M9 11h6M9 15h6" />
    </>
  ),
  sparkles: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />,
  graduation: <path d="M3 9l9-4 9 4-9 4-9-4zM7 11v5c0 1 2 3 5 3s5-2 5-3v-5" />,
};

export function Icon({ name, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
