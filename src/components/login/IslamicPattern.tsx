export default function IslamicPattern() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 size-full opacity-[0.13]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="1" />
          <path d="M30 12 L48 30 L30 48 L12 30 Z" fill="none" stroke="white" strokeWidth="0.8" />
          <circle cx="30" cy="30" r="6"  fill="none" stroke="white" strokeWidth="0.7" />
          <circle cx="0"  cy="0"  r="4"  fill="none" stroke="white" strokeWidth="0.7" />
          <circle cx="60" cy="0"  r="4"  fill="none" stroke="white" strokeWidth="0.7" />
          <circle cx="0"  cy="60" r="4"  fill="none" stroke="white" strokeWidth="0.7" />
          <circle cx="60" cy="60" r="4"  fill="none" stroke="white" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo)" />
    </svg>
  )
}
