import type { ReactNode } from "react";

// Site demo: os perfis apontam para as páginas iniciais das redes
export const socialLinks: { name: string; href: string; icon: ReactNode }[] = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />,
  },
];

export function SocialIcon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
