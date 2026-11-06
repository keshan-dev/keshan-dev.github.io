// Logo: four cells, one of them isolated in the signal colour.
export default function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="1" y="1" width="13" height="13" rx="3" fill="currentColor" />
      <rect x="18" y="1" width="13" height="13" rx="3" fill="currentColor" />
      <rect x="1" y="18" width="13" height="13" rx="3" fill="currentColor" />
      <rect x="19.5" y="19.5" width="11" height="11" rx="2.5" fill="var(--color-signal)" />
    </svg>
  );
}
