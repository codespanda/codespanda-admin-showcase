import { useId } from "react";
import { cn } from "@/lib/utils";

/** Brand marks for the tech-stack chips. Unknown names render nothing. */
export function TechLogo({ name, className }: { name: string; className?: string }) {
  // Vite's gradients need ids that stay unique when the chips render more than once on a page.
  const uid = useId().replace(/:/g, "");
  const cls = cn("h-[18px] w-[18px] shrink-0", className);

  switch (name) {
    case "React":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
          <circle cx="12" cy="12" r="2.05" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)" />
        </svg>
      );
    case "Vite":
      return (
        <svg viewBox="0 0 32 32" className={cls} aria-hidden>
          <defs>
            <linearGradient id={`${uid}a`} x1="6" y1="32" x2="23.08" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#41D1FF" />
              <stop offset="1" stopColor="#BD34FE" />
            </linearGradient>
            <linearGradient id={`${uid}b`} x1="14.5" y1="30" x2="19" y2="2" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF3E00" />
              <stop offset="1" stopColor="#FF9000" />
            </linearGradient>
          </defs>
          <path d="M29.8 6.2L17.1 28.7c-.3.5-1 .5-1.3 0L2.2 6.2c-.3-.5 0-1.1.6-1.1h26.4c.6 0 .9.6.6 1.1z" fill={`url(#${uid}a)`} />
          <path d="M21.3 5.1L12 21.5 8.7 15.8l6.1-10.7h6.5z" fill={`url(#${uid}b)`} />
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 54 33" className={cls} aria-hidden>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 12.672 33.808 15.9 40.5 15.9c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C37.256 3.228 34.192 0 27 0zM13.5 15.9C6.3 15.9 1.8 19.5 0 26.7c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C16.744 28.572 19.808 31.8 26.5 31.8c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.756 19.128 20.692 15.9 13.5 15.9z"
            fill="#38BDF8"
          />
        </svg>
      );
    case "JavaScript":
      return (
        <svg viewBox="0 0 32 32" className={cls} aria-hidden>
          <rect width="32" height="32" rx="4" fill="#F7DF1E" />
          <path
            d="M9.5 25.3l2.3-1.4c.4.8.8 1.4 1.7 1.4.8 0 1.4-.3 1.4-1.7v-9h2.8v9.1c0 2.8-1.6 4-4 4-2.1 0-3.3-1.1-3.9-2.4h-.3zM19 25l2.3-1.4c.6 1 1.4 1.8 2.8 1.8 1.2 0 1.9-.6 1.9-1.4 0-1-.7-1.3-2-1.9l-.7-.3c-2-.8-3.3-1.9-3.3-4.1 0-2 1.5-3.5 3.9-3.5 1.7 0 2.9.6 3.8 2.1l-2.1 1.4c-.5-.8-1-1.2-1.8-1.2-.8 0-1.3.5-1.3 1.2 0 .8.5 1.1 1.7 1.7l.7.3c2.3 1 3.7 2 3.7 4.3 0 2.4-1.9 3.8-4.4 3.8-2.5 0-4-1.2-4.8-2.8h-.4z"
            fill="#000"
          />
        </svg>
      );
    case "TypeScript":
      return (
        <svg viewBox="0 0 32 32" className={cls} aria-hidden>
          <rect width="32" height="32" rx="4" fill="#3178C6" />
          <path
            d="M17.8 17.4v1.9c.3.2.7.3 1.1.4.4.1.8.1 1.3.1.4 0 .8 0 1.2-.1.4-.1.7-.2 1-.4.3-.2.5-.4.7-.7.2-.3.3-.7.3-1.1 0-.3 0-.6-.1-.8a1.8 1.8 0 00-.5-.6 3.4 3.4 0 00-.8-.5l-1.1-.5c-.3-.1-.5-.2-.7-.4a1 1 0 01-.3-.3.7.7 0 010-.4c0-.1 0-.3.1-.4l.3-.3.5-.1h.6l.5.1.5.2.4.3v-1.8l-.9-.2h-1c-.4 0-.8 0-1.2.1l-1 .4c-.3.2-.5.4-.7.7-.2.3-.2.6-.2 1 0 .5.1.9.4 1.3.3.3.7.6 1.3.9l1.1.5.6.4.2.3v.4l-.2.4-.3.2-.5.1a2.9 2.9 0 01-1.3-.2 3 3 0 01-1-.6zM13 13.2h3v-1.7H7v1.7h3v8.8h3v-8.8z"
            fill="#fff"
          />
        </svg>
      );
    case "Next.js":
      // The Next.js "N" mark: a dark disc with the N drawn as strokes.
      return (
        <svg viewBox="0 0 32 32" className={cls} aria-hidden>
          <circle cx="16" cy="16" r="15.25" fill="#000" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" />
          <path d="M11 22V10l11 14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M21 10v8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </svg>
      );
    default:
      return null;
  }
}
