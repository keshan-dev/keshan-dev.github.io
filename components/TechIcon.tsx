import type { SimpleIcon } from "simple-icons";

// Brand mark from simple-icons. "brand" uses the official colour, otherwise
// the mark follows the surrounding text colour.
export default function TechIcon({ icon, brand = false, className = "" }: { icon: SimpleIcon; brand?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d={icon.path} fill={brand ? `#${icon.hex}` : "currentColor"} />
    </svg>
  );
}
