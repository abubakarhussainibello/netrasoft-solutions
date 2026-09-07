/**
 * Simplified marks for the stack we build on. Hand-drawn geometry rather than
 * vendor logo files — recognisable at 32px, no asset pipeline, no licence
 * question.
 */

type P = { className?: string };

export function ReactLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="2.6" fill="#61DAFB" />
      <g fill="none" stroke="#61DAFB" strokeWidth="1.5">
        <ellipse cx="16" cy="16" rx="12" ry="4.8" />
        <ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(120 16 16)" />
      </g>
    </svg>
  );
}

export function NextLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="13" fill="#111111" />
      <path d="M11 21.5V11h2l8.2 11" stroke="#fff" strokeWidth="1.9" fill="none" strokeLinecap="round" />
      <path d="M20.4 11v7.4" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function TsLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="2" y="2" width="28" height="28" rx="4" fill="#3178C6" />
      <path d="M9 14h9M13.5 14v9" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M26 15.4c-.9-.8-3.9-1.5-4.3.5-.3 1.8 4 1.5 4 3.9 0 2.2-3.3 2.6-4.7 1.2" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function NodeLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M16 2.6l12 6.9v13.8l-12 6.9-12-6.9V9.5z" fill="#539E43" />
      <path d="M20.5 19.4c0 2-1.7 3-4.4 3-2.4 0-4.3-.9-4.3-3.2h2.2c0 1 .8 1.4 2.1 1.4 1.4 0 2.1-.4 2.1-1.2 0-2.2-6.2-.4-6.2-4 0-1.9 1.6-3 4.1-3 2.6 0 4.1 1.1 4.2 3.1h-2.2c-.1-.9-.7-1.3-2-1.3-1.1 0-1.8.4-1.8 1.1 0 2 6.2.3 6.2 4.1Z" fill="#fff" />
    </svg>
  );
}

export function PythonLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M16 3c-4 0-5.5 1.4-5.5 3.6V10h6v1H8.4C5.9 11 4 12.6 4 16.4s1.7 5.4 4 5.4h2v-3.5c0-2.4 1.9-4.3 4.4-4.3h5.2c2 0 3.4-1.5 3.4-3.4V6.6C23 4.4 21 3 16 3Zm-3 2.1a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z" fill="#3B72A5" />
      <path d="M16 29c4 0 5.5-1.4 5.5-3.6V22h-6v-1h8.1c2.5 0 4.4-1.6 4.4-5.4s-1.7-5.4-4-5.4h-2v3.5c0 2.4-1.9 4.3-4.4 4.3h-5.2c-2 0-3.4 1.5-3.4 3.4v4.6C9 27.6 11 29 16 29Zm3-2.1a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z" fill="#F0C043" />
    </svg>
  );
}

export function GoLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="13" fill="#00ACD7" />
      <path d="M6 13h5M5 16.5h5" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="19" cy="16" r="5.6" fill="#fff" />
      <circle cx="17.6" cy="15" r="1.5" fill="#00ACD7" />
      <circle cx="21.4" cy="15" r="1.5" fill="#00ACD7" />
    </svg>
  );
}

export function LaravelLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M4 8.5 10 5l6 3.5-6 3.5z" fill="#FB503B" />
      <path d="M16 12 22 8.5 28 12l-6 3.5z" fill="#FB503B" opacity="0.8" />
      <path d="M10 19 16 15.5 22 19l-6 3.5z" fill="#FB503B" opacity="0.65" />
      <path d="M4 8.5v7l6 3.5v-7z" fill="#D33F2C" />
      <path d="M22 19v7l-6 3.5v-7z" fill="#D33F2C" opacity="0.7" />
    </svg>
  );
}

export function FlutterLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M18.8 2 6 14.8l4 4L26.8 2z" fill="#47C5FB" />
      <path d="M18.6 15.2 12 21.8l4.1 4.2 4-4 6.7-6.8z" fill="#47C5FB" />
      <path d="M16.1 26 20 22.1l4.1 4.1L20.2 30z" fill="#00569E" />
      <path d="M12 21.8l4-4 4 4-4 4z" fill="#00B5F8" />
    </svg>
  );
}

export function PostgresLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M16 3c6.6 0 11 3.2 11 8.2 0 6.4-2.3 14.5-5.2 16.4-1.5 1-2.9-.4-3.5-1.6-.6.2-1.5.3-2.3.3s-1.7-.1-2.3-.3c-.6 1.2-2 2.6-3.5 1.6C7.3 25.7 5 17.6 5 11.2 5 6.2 9.4 3 16 3Z" fill="#336791" />
      <g fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round">
        <path d="M12.2 11.4c0 4.4.4 8.6 1.4 11" />
        <path d="M19.6 11.2c-.4 3.8-.3 8 .5 10.6" />
        <path d="M10 10.6c1.6-.6 3.4-.8 5-.6M17.6 10.2c1.6-.3 3.2-.2 4.4.3" />
      </g>
    </svg>
  );
}

export function MongoLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M16 2c3.4 4.6 7 8 7 13.4 0 5-3.2 8.6-6.2 10.2L16 30l-.8-4.4C12.2 24 9 20.4 9 15.4 9 10 12.6 6.6 16 2Z" fill="#4FAA41" />
      <path d="M16 2v28l-.8-4.4C12.2 24 9 20.4 9 15.4 9 10 12.6 6.6 16 2Z" fill="#3F9037" />
    </svg>
  );
}

export function RedisLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <g fill="#D82C20">
        <path d="M16 4 29 9.5 16 15 3 9.5z" />
        <path d="M3 13.2 16 18.7l13-5.5v3.4L16 22.1 3 16.6z" opacity="0.75" />
        <path d="M3 19.8 16 25.3l13-5.5v3.4L16 28.7 3 23.2z" opacity="0.5" />
      </g>
    </svg>
  );
}

export function GraphqlLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <g stroke="#E535AB" strokeWidth="1.4" fill="none">
        <path d="M16 4 27 10.3v12.4L16 29 5 22.7V10.3z" />
        <path d="M6 22 16 5l10 17z" />
      </g>
      <g fill="#E535AB">
        <circle cx="16" cy="4.4" r="2.4" />
        <circle cx="27" cy="10.6" r="2.4" />
        <circle cx="27" cy="22.4" r="2.4" />
        <circle cx="16" cy="28.6" r="2.4" />
        <circle cx="5" cy="22.4" r="2.4" />
        <circle cx="5" cy="10.6" r="2.4" />
      </g>
    </svg>
  );
}

export function DockerLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <g fill="#2396ED">
        <rect x="6" y="14" width="4" height="4" rx="0.5" />
        <rect x="11" y="14" width="4" height="4" rx="0.5" />
        <rect x="16" y="14" width="4" height="4" rx="0.5" />
        <rect x="11" y="9.5" width="4" height="4" rx="0.5" />
        <rect x="16" y="9.5" width="4" height="4" rx="0.5" />
        <rect x="16" y="5" width="4" height="4" rx="0.5" />
      </g>
      <path d="M4 19h20c2.6 0 4.3-1 5.2-2.4-1.3-.8-2.7-.6-3.4-.2-.4-2-1.8-3-2.6-3.3-.7 1.2-.7 2.9-.2 3.6H4c-.6 2.6.4 6.7 4.3 8.5 3.6 1.7 9.6 1.6 13.4-1.6 2-1.7 3.3-4 3.9-6" fill="#2396ED" />
    </svg>
  );
}

export function KubernetesLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M16 2.6 28 8.4l-3 13.4L16 29.4 7 21.8 4 8.4z" fill="#326CE5" />
      <g fill="#fff">
        <circle cx="16" cy="16" r="3.4" />
        <path d="M16 5.6l1 4.2h-2zM24.8 11.5l-3.4 2.7-.9-1.8zM23.3 22.7l-4-1.6 1.3-1.5zM8.7 22.7l2.7-3.1 1.3 1.5zM7.2 11.5l4.3.9-.9 1.8z" />
      </g>
    </svg>
  );
}

export function AwsLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M9.4 14.6c0 .5.1.9.2 1.2l.5.9c.1.1.1.2.1.3l-.4.6c-.1.1-.2.1-.3.1s-.2 0-.3-.1a3 3 0 0 1-.7-1c-.7.9-1.7 1.3-2.8 1.3-.8 0-1.4-.2-1.9-.7s-.7-1-.7-1.8c0-.8.3-1.4.9-1.9.6-.5 1.4-.7 2.4-.7.4 0 .7 0 1.1.1l1.2.2v-.7c0-.7-.2-1.2-.5-1.5-.3-.3-.8-.4-1.6-.4-.3 0-.7 0-1.1.1l-1.1.4H4.1c-.2 0-.2-.1-.2-.3v-.5c0-.1 0-.2.1-.3l.2-.2c.4-.2.8-.3 1.3-.4a6 6 0 0 1 1.6-.2c1.2 0 2.1.3 2.7.8.6.6.8 1.4.8 2.5v3.2Zm-3.9 1.5c.3 0 .7-.1 1-.2.4-.1.7-.3 1-.7l.3-.6.1-.8v-.4a7 7 0 0 0-1.8-.2c-.6 0-1.1.1-1.4.4s-.5.6-.5 1.1c0 .4.1.8.4 1 .2.3.5.4.9.4Z" fill="#252F3E" />
      <path d="M13.6 18.9c-.2 0-.3 0-.4-.1l-.2-.3-2.3-7.5v-.4c0-.2.1-.2.2-.2h.9c.2 0 .3 0 .4.1l.2.3 1.6 6.4 1.5-6.4c0-.2.1-.3.2-.3l.4-.1h.7c.2 0 .3 0 .4.1l.2.3 1.5 6.5 1.7-6.5c0-.2.1-.3.2-.3l.4-.1h.8c.2 0 .2.1.2.2v.2l-.1.2-2.4 7.5c0 .2-.1.3-.2.3l-.4.1h-.8c-.2 0-.3 0-.4-.1l-.2-.4-1.5-6.2-1.5 6.2c0 .2-.1.3-.2.4l-.4.1h-.7Z" fill="#252F3E" />
      <path d="M3.2 23.7c4 3 9.9 4.6 15.3 4.6 3.6 0 7.6-.8 11.2-2.3.6-.3 1.1.3.5.8-3.1 2.3-7.7 3.6-11.6 3.6a21 21 0 0 1-15.7-6c-.4-.4 0-.9.3-.7Z" fill="#F90" />
      <path d="M25.5 21.9c-.5-.7.3-3.3 1.6-3.1.5.1.5.2.4.5-.5 1.2-1 2.9-.7 3.2.3.3 1.6-.6 2.6-1.2.3-.2.4 0 .3.3-.6 1-2 2.7-3 2.7-.4 0-.7-.2-1.2-.4Z" fill="#F90" />
    </svg>
  );
}

export function TailwindLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M16 8c-4 0-6.5 2-7.5 6 1.5-2 3.2-2.7 5.2-2.2 1.1.3 1.9 1.1 2.8 2 1.4 1.5 3.1 3.2 6.7 3.2 4 0 6.5-2 7.5-6-1.5 2-3.2 2.7-5.2 2.2-1.1-.3-1.9-1.1-2.8-2C21.3 9.7 19.6 8 16 8Z" fill="#38BDF8" transform="translate(-4 2)" />
      <path d="M9 16c-4 0-6.5 2-7.5 6 1.5-2 3.2-2.7 5.2-2.2 1.1.3 1.9 1.1 2.8 2 1.4 1.5 3.1 3.2 6.7 3.2 4 0 6.5-2 7.5-6-1.5 2-3.2 2.7-5.2 2.2-1.1-.3-1.9-1.1-2.8-2C14.3 17.7 12.6 16 9 16Z" fill="#38BDF8" transform="translate(-1 -3)" />
    </svg>
  );
}

export function FigmaLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M11.5 3h4.5v7h-4.5a3.5 3.5 0 0 1 0-7Z" fill="#F24E1E" />
      <path d="M16 3h4.5a3.5 3.5 0 0 1 0 7H16z" fill="#FF7262" />
      <path d="M16 10h4.5a3.5 3.5 0 0 1 0 7H16z" fill="#1ABCFE" />
      <path d="M11.5 10H16v7h-4.5a3.5 3.5 0 0 1 0-7Z" fill="#A259FF" />
      <path d="M11.5 17H16v3.5a3.5 3.5 0 1 1-4.5-3.5Z" fill="#0ACF83" />
    </svg>
  );
}

export function GitLogo({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="5" transform="rotate(45 16 16)" fill="#F1502F" />
      <g fill="#fff">
        <circle cx="16" cy="9.5" r="2.1" />
        <circle cx="16" cy="22" r="2.1" />
        <circle cx="21.6" cy="15.4" r="2.1" />
        <path d="M15.2 10h1.6v12h-1.6z" />
        <path d="M16.4 14.2h4v1.5h-4z" />
      </g>
    </svg>
  );
}
