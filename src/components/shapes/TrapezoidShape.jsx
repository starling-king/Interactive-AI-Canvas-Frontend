
export default function TrapezoidShape({ className = "w-full h-full text-slate-800" }) {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
            {/* Tapered top for classic system architecture "manual operation" blocks */}
            <polygon points="20,2 80,2 98,98 2,98" fill="currentColor" stroke="currentColor" strokeWidth="2" className="opacity-90" />
        </svg>
    );
}