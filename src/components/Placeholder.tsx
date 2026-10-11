/** Anything the owner still has to supply is rendered through this so it can never pass as real content. */
export function Placeholder({ title, children, className = "" }: { title: string; children?: React.ReactNode; className?: string }) {
  return (
    <div className={`placeholder p-7 ${className}`}>
      <p className="text-xs font-medium text-brass-ink">Placeholder: replace before launch</p>
      <p className="t-h3 mt-3">{title}</p>
      {children && <div className="muted mt-2 text-sm">{children}</div>}
    </div>
  );
}
