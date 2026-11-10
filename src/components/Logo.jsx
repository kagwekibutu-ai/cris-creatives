export default function Logo({ size = 36, withWordmark = true }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="logo-accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dceaf6" />
            <stop offset=".5" stopColor="#4a7fa7" />
            <stop offset="1" stopColor="#1a3d63" />
          </linearGradient>
          <linearGradient id="logo-chrome" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#dfe3ea" />
            <stop offset="1" stopColor="#8e95a3" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="#0a1931" stroke="#1a3d63" />
        <circle
          cx="27"
          cy="32"
          r="14"
          fill="none"
          stroke="url(#logo-accent)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="66 22"
          transform="rotate(40 27 32)"
        />
        <circle
          cx="39"
          cy="32"
          r="14"
          fill="none"
          stroke="url(#logo-chrome)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="66 22"
          transform="rotate(220 39 32)"
        />
      </svg>
      {withWordmark && (
        <span className="font-display text-lg leading-none tracking-wide uppercase">
          <span className="text-cream">Cris</span>{" "}
          <span className="accent-text">Creatives</span>
        </span>
      )}
    </span>
  );
}
